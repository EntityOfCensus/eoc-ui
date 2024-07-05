'use client'

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { useTable, usePagination } from 'react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Card,
  CardContent,
  Chip,
  IconButton
} from '@mui/material'
import { styled } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import withAuth from '@/hoc/withAuth'
import withPeer from '@/hoc/withPeer'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailSchema = yup.string().matches(emailRegex, 'Invalid email format')

const clientInfoSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  registeredOffice: yup.string().required('Registered Office is required'),
  uniqueRegistrationCode: yup
    .string()
    .length(10, 'Unique Registration Code must be exactly 10 characters')
    .matches(/^\d+$/, 'Unique Registration Code must be a number')
    .required('Unique Registration Code is required'),
  commercialRegisterNumber: yup
    .string()
    .matches(/^\d+$/, 'Commercial Register Number must be a number')
    .required('Commercial Register Number is required'),
  billingEmails: yup
    .mixed()
    .test('billingEmails', 'Billing Email(s) is required', value => value && value.length > 0)
    .test('billingEmails', 'Invalid email format', value => {
      if (typeof value === 'string') {
        return emailSchema.isValidSync(value)
      } else if (Array.isArray(value)) {
        return value.every(email => emailSchema.isValidSync(email))
      }
      return false
    })
    .test('billingEmails', 'You can enter up to 5 emails only', value => {
      if (Array.isArray(value)) {
        return value.length <= 5
      }
      return true
    })
})

const contactDetailsSchema = contactData =>
  yup.object().shape({
    contactPerson: yup
      .string()
      .required('Contact Person (Name and Surname) is required')
      .test(
        'uniqueContactPerson',
        'Contact Person must be unique',
        value => !contactData.some(contact => contact.contactPerson.toLowerCase() === value.toLowerCase())
      ),
    contactEmail: yup
      .string()
      .matches(emailRegex, 'Contact Email must be a valid email')
      .required('Contact Email is required')
      .test(
        'uniqueContactEmail',
        'Contact Email must be unique',
        value => !contactData.some(contact => contact.contactEmail.toLowerCase() === value.toLowerCase())
      ),
    contactPhone: yup
      .string()
      .matches(/^\d+$/, 'Contact Phone must be a number')
      .min(7, 'Contact Phone must be at least 7 digits')
      .max(15, 'Contact Phone must be at most 15 digits')
      .required('Contact Phone is required')
      .test(
        'uniqueContactPhone',
        'Contact Phone must be unique',
        value => !contactData.some(contact => contact.contactPhone === value)
      )
  })

const ClientContext = createContext()

const useClient = () => useContext(ClientContext)

const FormField = React.memo(({ name, control, label, errors, defaultValue, InputProps }) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        fullWidth
        error={!!errors[name]}
        helperText={errors[name] ? errors[name].message : ''}
        InputProps={InputProps}
      />
    )}
  />
))

const ChipContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '10px',
  gap: '5px'
})

const ClientBasicInfo = React.memo(() => {
  const { addClientBasicInfo, clientInfo } = useClient()
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(clientInfoSchema)
  })

  const [emailInput, setEmailInput] = useState('')
  const [emailChips, setEmailChips] = useState([])

  const handleEmailChange = event => {
    const inputValue = event.target.value
    const emails = inputValue
      .split(',')
      .map(email => email.trim())
      .filter(email => email)

    if (emails.length > 1) {
      const newEmails = emails.filter(email => emailSchema.isValidSync(email) && !emailChips.includes(email))
      if (newEmails.length > 0) {
        const updatedEmails = [...emailChips, ...newEmails]
        if (updatedEmails.length <= 5) {
          setEmailChips(updatedEmails)
          setValue('billingEmails', updatedEmails)
        } else {
          const validEmails = newEmails.slice(0, 5 - emailChips.length)
          setEmailChips([...emailChips, ...validEmails])
          setValue('billingEmails', [...emailChips, ...validEmails])
          setEmailInput('')
        }
      }
      setEmailInput('')
    } else if (inputValue.endsWith(',')) {
      const email = inputValue.slice(0, -1).trim()
      if (email && emailSchema.isValidSync(email) && !emailChips.includes(email)) {
        if (emailChips.length < 5) {
          setEmailChips([...emailChips, email])
          setValue('billingEmails', [...emailChips, email])
          setEmailInput('')
        } else {
          setEmailInput('')
        }
      } else if (emailChips.includes(email)) {
        setEmailInput(email)
      } else {
        setEmailInput('')
      }
    } else {
      setEmailInput(inputValue)
    }
  }

  const handleEmailBlur = () => {
    const email = emailInput.trim()
    if (email && emailSchema.isValidSync(email) && !emailChips.includes(email)) {
      if (emailChips.length < 5) {
        setEmailChips([...emailChips, email])
        setValue('billingEmails', [...emailChips, email])
        setEmailInput('')
      }
    }
  }

  const handleEmailDelete = emailToDelete => () => {
    setEmailChips(chips => chips.filter(email => email !== emailToDelete))
    setValue(
      'billingEmails',
      emailChips.filter(email => email !== emailToDelete)
    )
  }

  const onSubmit = data => {
    if (typeof data.billingEmails === 'string') {
      data.billingEmails = data.billingEmails
        .split(',')
        .map(email => email.trim())
        .filter(email => email)
    }
    addClientBasicInfo(data)
    reset()
    setEmailChips([])
    setEmailInput('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormField name='companyName' control={control} label='Company Name' errors={errors} defaultValue='' />
          </Grid>
          <Grid item xs={12}>
            <FormField
              name='registeredOffice'
              control={control}
              label='Registered Office'
              errors={errors}
              defaultValue=''
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              name='uniqueRegistrationCode'
              control={control}
              label='Unique Registration Code'
              errors={errors}
              defaultValue=''
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              name='commercialRegisterNumber'
              control={control}
              label='Commercial Register Number'
              errors={errors}
              defaultValue=''
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='billingEmails'
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <div>
                  <TextField
                    {...field}
                    label='Billing Email(s)'
                    fullWidth
                    error={!!errors.billingEmails}
                    helperText={
                      errors.billingEmails
                        ? errors.billingEmails.message
                        : 'Use a comma to separate emails, up to 5 emails.'
                    }
                    value={emailInput}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />
                  <ChipContainer>
                    {emailChips.map((email, index) => (
                      <Chip
                        key={index}
                        label={email.trim()}
                        onDelete={handleEmailDelete(email)}
                        deleteIcon={<CloseIcon />}
                      />
                    ))}
                  </ChipContainer>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      {clientInfo && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant='h6'>Client Information</Typography>
            <Typography>
              <strong>Company Name:</strong> {clientInfo.companyName}
            </Typography>
            <Typography>
              <strong>Registered Office:</strong> {clientInfo.registeredOffice}
            </Typography>
            <Typography>
              <strong>Unique Registration Code:</strong> {clientInfo.uniqueRegistrationCode}
            </Typography>
            <Typography>
              <strong>Commercial Register Number:</strong> {clientInfo.commercialRegisterNumber}
            </Typography>
            <Typography>
              <strong>Billing Emails:</strong>
            </Typography>
            <div style={{ marginTop: '10px' }}>
              {Array.isArray(clientInfo.billingEmails) ? (
                clientInfo.billingEmails.map((email, index) => (
                  <Chip key={index} label={email.trim()} style={{ marginRight: '5px', marginBottom: '5px' }} />
                ))
              ) : (
                <Typography>{clientInfo.billingEmails}</Typography>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
})

const ContactDetailsForm = React.memo(() => {
  const { addContactDetails, contactData } = useClient()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactDetailsSchema(contactData))
  })

  const onSubmit = data => {
    addContactDetails(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormField
            name='contactPerson'
            control={control}
            label='Contact Person (Name and Surname)'
            errors={errors}
            defaultValue=''
          />
        </Grid>
        <Grid item xs={12}>
          <FormField name='contactEmail' control={control} label='Contact Email' errors={errors} defaultValue='' />
        </Grid>
        <Grid item xs={12}>
          <FormField
            name='contactPhone'
            control={control}
            label='Contact Phone'
            errors={errors}
            defaultValue=''
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' style={{ color: 'gray' }}>
                  +
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
})

const ContactTable = React.memo(({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  )

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <TableRow key={headerIndex} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <TableCell key={columnIndex} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, pageIndex) => {
            prepareRow(row)
            return (
              <TableRow key={pageIndex} {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              colSpan={columns.length}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onPageChange={(event, newPage) => gotoPage(newPage)}
              onRowsPerPageChange={event => setPageSize(Number(event.target.value))}
              ActionsComponent={({ count, page, rowsPerPage, onPageChange }) => (
                <div style={{ flexShrink: 0, marginLeft: '2.5em' }}>
                  <IconButton onClick={() => onPageChange(null, 0)} disabled={page === 0}>
                    {'<<'}
                  </IconButton>
                  <IconButton onClick={() => onPageChange(null, page - 1)} disabled={page === 0}>
                    {'<'}
                  </IconButton>
                  <IconButton
                    onClick={() => onPageChange(null, page + 1)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  >
                    {'>'}
                  </IconButton>
                  <IconButton
                    onClick={() => onPageChange(null, Math.ceil(count / rowsPerPage) - 1)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  >
                    {'>>'}
                  </IconButton>
                </div>
              )}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
})

const FormValidation = () => {
  const [clientInfo, setClientInfo] = useState(null)
  const [contactData, setContactData] = useState([])

  const addClientBasicInfo = useCallback(data => {
    setClientInfo(data)
  }, [])

  const addContactDetails = useCallback(data => {
    setContactData(prevData => [...prevData, data])
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Contact Person',
        accessor: 'contactPerson'
      },
      {
        Header: 'Email',
        accessor: 'contactEmail'
      },
      {
        Header: 'Phone',
        accessor: 'contactPhone'
      }
    ],
    []
  )

  const contextValue = useMemo(
    () => ({
      clientInfo,
      addClientBasicInfo,
      contactData,
      addContactDetails
    }),
    [clientInfo, contactData, addClientBasicInfo, addContactDetails]
  )

  return (
    <ClientContext.Provider value={contextValue}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4'>Client Profile</Typography>
        </Grid>
        <Grid item xs={12}>
          <ClientBasicInfo />
        </Grid>
        <Grid item xs={12}>
          <ContactDetailsForm />
        </Grid>
        <Grid item xs={12}>
          <ContactTable columns={columns} data={contactData} />
        </Grid>
      </Grid>
    </ClientContext.Provider>
  )
}

export default withAuth(withPeer(FormValidation))
