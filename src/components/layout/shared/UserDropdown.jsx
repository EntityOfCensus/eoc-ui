'use client'

// React Imports
import {useEffect, useRef, useState} from 'react'

// Next Imports
import {useRouter} from 'next/navigation'

// MUI Imports
import {styled} from '@mui/material/styles'
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

// Hook Imports
import {useSettings} from '@core/hooks/useSettings'
import {disconnect} from "@othent/kms";
import {jwtDecode} from "jwt-decode";

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [token, setToken] = useState(localStorage.getItem('id_token'))

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const router = useRouter()
  const {settings} = useSettings()

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
    setToken(localStorage.getItem("id_token"))
  }, [])

  useEffect(() => {
    try {
      const {name, picture, email} = jwtDecode(localStorage.getItem("id_token"))
      setImageUrl(picture)
      setUsername(name)
      setEmail(email)
    } catch (e) {
      console.log(e)
    }
  }, token)


  const handleUserLogout = async () => {
    localStorage.setItem('id_token', '')
    await disconnect()
  }


  const handleUserDelete = () => {
    alert('Mock for user delete')
  }

  function handleUserProfile() {
    router.push('/profile')
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen}/>}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt={username}
          src={imageUrl}
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({TransitionProps, placement}) => (
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
                    <Avatar alt={username} src={imageUrl}/>
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {username}
                      </Typography>
                      <Typography variant='caption'>{email}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1'/>
                  <MenuItem className='mli-2 gap-3' onClick={handleUserProfile}>
                    <i className='tabler-user text-[22px]'/>
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <MenuItem className='mli-2 gap-3' onClick={handleUserDelete}>
                    <i className='tabler-settings text-[22px]'/>
                    <Typography color='text.primary'>Delete Profile</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout'/>}
                      onClick={handleUserLogout}
                      sx={{'& .MuiButton-endIcon': {marginInlineStart: 1.5}}}
                    >
                      Logout
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

export default UserDropdown
