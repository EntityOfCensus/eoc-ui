'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { RespondentBasicDataApi, RespondentBasicDataApiClient } from '../../../@bff/respondent-basic-info-api'
import { dryrun, message, createDataItemSigner, result } from "@permaweb/aoconnect";

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import { disconnect } from '@othent/kms'
import { jwtDecode } from 'jwt-decode'
import { PermissionType } from 'arconnect'

const permissions = ['ACCESS_ADDRESS', 'SIGNATURE', 'SIGN_TRANSACTION', 'DISPATCH']

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const BadgeContentDisconnectedSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-error-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})
const ArConnectBox = () => {
  // States
  const [isConnected, setIsConnected] = useState(false)
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [token, setToken] = useState(localStorage.getItem('id_token'))

  const checkConnected = async () => {
    console.log('Fetching address...')
    try {
      // Check if ArConnect is available
      if (window.arweaveWallet) {
        try {
          // Try to get permissions without prompting the user again if they're already connected
          const currentPermissions = await window.arweaveWallet.getPermissions()
          if (currentPermissions.includes('ACCESS_ADDRESS')) {
            const address = await window.arweaveWallet.getActiveAddress()
            console.log('Connected: ', address)
            setAddress(address)
            setIsConnected(true)
          } else {
            console.log('Not connected.')
            setIsConnected(false)
          }
        } catch (error) {
          console.error('Error connecting to ArConnect:', error)
          setIsConnected(false)
        }
      } else {
        console.log('ArConnect not installed.')
        setIsConnected(false)
      }
    } catch (error) {
      console.error('Failed to fetch address:', error)
      setIsConnected(false)
    }
  }

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()

  const [respondentBasicDataApi, setRespondentBasicDataApi] = useState(
    new RespondentBasicDataApi(RespondentBasicDataApiClient.instance)
  )

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    checkConnected()
  }, [])

  useEffect(() => {
    const fetchBalance = async () => {
        const messageResponse = await dryrun({
          process: 'taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8',
          tags: [
              { name: 'Action', value: 'Balance' },
              { name: 'Recipient', value: address },
          ],
      });
      const balanceTag = messageResponse.Messages[0].Tags.find((tag) => tag.name === 'Balance');
      const balance = balanceTag ? parseFloat((balanceTag.value / 1000).toFixed(4)) : 0;
      setBalance(balance + ' AR');
    }
    if(address && address.length > 0) {
      fetchBalance();
    }
}, [address])

  const handleDisconnect = async () => {
    setIsConnected(false)
    setAddress('')
    await window.arweaveWallet.disconnect()
  }

  const handleConnect = async () => {
    const { walletAddress } = jwtDecode(localStorage.getItem('id_token'));
    if(walletAddress) {
      await window.arweaveWallet.connect(
        permissions,
        {
            name: walletAddress,
            logo: "4eTBOaxZSSyGbpKlHyilxNKhXbocuZdiMBYIORjS4f0"
        }
      )
      try {
        const address = await window.arweaveWallet.getActiveAddress();
        setIsConnected(true);
        setAddress(address);
      } catch(error) {
          console.error(error)
      }
    }
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={
          (isConnected && <BadgeContentSpan onClick={handleDropdownOpen} />) ||
          (!isConnected && <BadgeContentDisconnectedSpan onClick={handleConnect} />)
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={address}
          src={'/images/avatars/logo.png'}
          onClick={isConnected ? handleDropdownOpen : handleConnect}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open && isConnected}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar alt={address} />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {address}
                      </Typography>
                      <Typography variant='caption'>{balance}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout' />}
                      onClick={handleDisconnect}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Disconnect
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default ArConnectBox
