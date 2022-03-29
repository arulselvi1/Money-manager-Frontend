import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

export function EditData() {
  const { id } = useParams()
  console.log(id)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://bindharan.herokuapp.com/transactions/${id}`, {
      method: 'GET',
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((pls) => setData(pls))
      .catch((err) => console.log(err))
  }, [id])
  console.log(data)

  return (
    <div>
      {data ? (
        <Update data={data} />
      ) : (
        <h2 className="edit-loadmsg">
          {' '}
          Loading... <CircularProgress />
        </h2>
      )}{' '}
    </div>
  )
}

function Update({ data }) {
  const [income, setIncome] = useState(data.income)
  console.log(income)
  const [expense, setExpense] = useState(data.expense)
  const [desc, setDesc] = useState(data.desc)
  const [type, setType] = useState(data.type)
  const history = useHistory()

  return (
    <div className="text">
      <h1> Edit your Income and Expense</h1>

      <TextField
        className="input"
        label="Income"
        variant="outlined"
        margin="dense"
        value={income}
        onChange={(event) => setIncome(event.target.value)}
      />
      <TextField
        className="input"
        label="Expense"
        variant="outlined"
        margin="dense"
        value={expense}
        onChange={(event) => setExpense(event.target.value)}
      />
      <TextField
        className="input"
        label="Description"
        variant="outlined"
        margin="dense"
        value={desc}
        onChange={(event) => setDesc(event.target.value)}
      />
      <TextField
        className="input"
        label="Type"
        variant="outlined"
        margin="dense"
        value={type}
        onChange={(event) => setType(event.target.value)}
      />
      <Button
        variant="contained"
        className="input"
        onClick={() => {
          const updatedata = {
            income: income,
            expense: expense,
            desc: desc,
            type: type,
          }
          console.log(updatedata)
          fetch(`https://bindharan.herokuapp.com/transactions/${data._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedata),
            headers: {
              'content-type': 'application/json',
            },
          })
            .then(() => alert('Data Added Succesfully...'))
            .then(() => history.push('/weekly'))
        }}
        color="success"
      >
        Save
      </Button>
    </div>
  )
}
