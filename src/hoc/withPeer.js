'use client'
import { useEffect, useState } from 'react'
import { Peer } from 'peerjs'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const withPeer = WrappedComponent => {
  return props => {
    const [peer, setPeer] = useState()

    useEffect(() => {
      const checkPeerReady = async () => {
        const { walletAddress } = jwtDecode(localStorage.getItem('id_token'))
        if (!walletAddress) {
          return
        }

        try {
          const iceServers = (
            await axios.get(
              'https://vraf-relay.metered.live/api/v1/turn/credentials?apiKey=6f1b8d7414600ee701c3cc425bac73b8e5c9'
            )
          ).data
          const _peer = new Peer(walletAddress, {
            host: 'peerjs.vraf.ro',
            debug: 1,
            config: {
              iceServers: iceServers
            }
          })
          _peer.on('open', function (id) {
            console.log('My peer ID is: ' + id)
          })
          _peer.on('connection', function (connection) {
            connection.on('data', function (data) {
              console.log('data sent', data)
              connection.send('Hi!')
            })
          })
          var _conn = _peer.connect('OqF4EnU9JrL4CXvbjWLgSXi_okpQnaA9mGPnPP2K1_c')
          _conn.on('open', function () {
            // Receive messages
            _conn.on('data', function (data) {
              console.log('data received', data)
            })

            // Send messages
            _conn.send('Hello!')
          })
          setPeer(_peer)
        } catch (error) {
          console.error(error)
        }
      }
      if (!peer) {
        checkPeerReady()
      } else {
      }
    }, [peer])

    const onReceivePeerConnectionData = connection => {
      console.log('connection', connection)
      if (connection) {
        connection.on('data', onReceivePeerData)
        setPeerChannel(connection)
      }
    }
    const onReceivePeerData = data => {
      console.log('data', data)
      if (peerChannel) {
        peerChannel.send('Hello!')
      }
    }

    return <WrappedComponent {...props} peer={peer} />
  }
}

export default withPeer
