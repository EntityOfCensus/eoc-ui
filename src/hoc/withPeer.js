'use client'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const withPeer = WrappedComponent => {
  return props => {
    const [mounted, setMounted] = useState(false)
    const [lastSeenTimestamp, setLastSeenTimestamp] = useState(0)

    useEffect(() => {
      if (!mounted) {
        setMounted(true)
      }
    })

    useEffect(() => {
      if (mounted) {
        const initAsync = async () => {
          // const res = await axios.get(`http://edge-chat-demo.cloudflareworkers.com/api/room/#newmyroom`)
          // console.log('response: ', res.data)
          const { walletAddress } = jwtDecode(localStorage.getItem('id_token'))
          const socket = new WebSocket(
            'ws://localhost:8787/api/room/OqF4EnU9JrL4CXvbjWLgSXi_okpQnaA9mGPnPP2K1_c/websocket'
          )

          socket.onopen = () => {
            console.log('WebSocket connection established.')
            socket.send(JSON.stringify({ name: walletAddress }))
          }

          socket.onmessage = event => {
            const data = JSON.parse(event.data)
            if (data.error) {
              console.error(data.error)
            } else if (data.joined) {
              console.log('peer joined: ', data.joined)
            } else if (data.quit) {
              console.log('peer left: ', data.quit)
            } else if (data.ready) {
              // All pre-join messages have been delivered.
              console.log('data ready: ', data.ready)
              if (walletAddress == 'OqF4EnU9JrL4CXvbjWLgSXi_okpQnaA9mGPnPP2K1_c') {
                const message = {
                  message: 'Hi !',
                  timestamp: new Date().toISOString()
                }
                socket.send(JSON.stringify(message))
              } else {
                const message = {
                  message: 'Hello !',
                  timestamp: new Date().toISOString()
                }
                socket.send(JSON.stringify(message))
              }
            } else {
              // A regular chat message.
              if (data.timestamp > lastSeenTimestamp) {
                console.log('data from: ', data.name)
                console.log('data message: ', data.message)
                setLastSeenTimestamp(data.timestamp)
              }
            }
          }

          return () => {
            socket.close()
          }
        }
        initAsync()
      } else {
      }
    }, [mounted])

    return <WrappedComponent {...props} />
  }
}

export default withPeer
