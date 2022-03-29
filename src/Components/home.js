import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import {
  FormControl,
  Typography,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Box,
  Radio,
  RadioGroup,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useHistory } from 'react-router-dom'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export function Home() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (e) => {
    e.preventDefault()
    setOpen(false)
  }
  //Description State
  const [formData, setFormData] = useState({
    income: '',
    expense: '',
    type: '',
    desc: '',
  })
  const handleChangeText = (e) => {
    var time = new Date()
    console.log(time)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      time: Date.now(),
      date: time.toDateString().toString(),
    })
  }
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('https://bindharan.herokuapp.com/transactions', [
      {
        income: formData.income,
        expense: formData.expense,
        time: formData.time,
        date: formData.date,
        desc: formData.desc,
        type: formData.type,
      },
    ])
    setFormData({
      income: '',
      expense: '',
      desc: '',
      date: '',
      time: '',
      type: '',
    })
    alert('Data Added Succesfully...')
    history.push('/yearly')
  }
  return (
    <div>
      <div className="home">
        <h1 style={{ textAlign: 'left' }}>Welcome to Money Manager App</h1>
        <Button
          color="success"
          style={{ marginTop: '1rem' }}
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddCircleIcon />}
        >
          Add
        </Button>
      </div>
      <Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add Details
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{ mx: 3, mb: 1 }}
                    value="office"
                    name="type"
                    control={<Radio />}
                    label="Office"
                    onChange={handleChangeText}
                  />
                  <FormControlLabel
                    sx={{ mb: 1 }}
                    value="personal"
                    name="type"
                    control={<Radio />}
                    label="Personal"
                    onChange={handleChangeText}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Typography gutterBottom sx={{ px: 5, mb: 2 }}>
              <TextField
                name="income"
                value={formData.income}
                type="text"
                onChange={handleChangeText}
                label="Income Amount"
                required
                autoComplete="off"
              />
            </Typography>
            <Typography gutterBottom sx={{ px: 5, mb: 2 }}>
              <TextField
                name="expense"
                value={formData.expense}
                type="text"
                onChange={handleChangeText}
                label="Expenditure Amount"
                required
                autoComplete="off"
              />
            </Typography>

            <Typography gutterBottom sx={{ px: 5 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Description*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Description"
                  required
                  name="desc"
                  value={formData.desc}
                  onChange={handleChangeText}
                >
                  <MenuItem value="fuel">Fuel</MenuItem>
                  <MenuItem value="movie">Movie</MenuItem>
                  <MenuItem value="loan">Loan</MenuItem>
                  <MenuItem value="medical">Medical</MenuItem>
                  <MenuItem value="other">Other..</MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </DialogContent>
          <DialogActions>
            {formData.income !== '' &&
            formData.type !== '' &&
            formData.desc !== '' &&
            formData.expense !== '' ? (
              <Button
                sx={{ mb: 2 }}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </Button>
            ) : (
              <Button sx={{ mb: 0 }} variant="contained" disabled>
                Add
              </Button>
            )}
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </div>
  )
}
