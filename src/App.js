import React,{useState,useEffect} from 'react'
import {Button, InputLabel, Input, FormControl} from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'
import Todo from './Todo'
import Header from './Navbar'
import Footer from './Footer'

const App = () => {

  const [input,setInput] = useState('')
  const [todos, setTodos] = useState([''])

  useEffect( () => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id:doc.id,todo: doc.data().todo,time:doc.data().timestamp})))
    })
  },[])

  const addTodo = (event) => {
    event.preventDefault()
    db.collection('todos').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
  
    <div className="App">
      <Header/>
      <center>
        <h2 className='mt-5'>Todo App</h2>
        <form noValidate autoComplete="off">

          <FormControl style={{ marginBottom:4,marginRight:5 }}>
            <InputLabel htmlFor="my-input">Write a Todo</InputLabel>
            <Input value={input}  className='mr-2' style={{ width:500 }} onChange={event => {
              setInput(event.target.value)
            }}/>
          </FormControl>

            <Button type="submit"  variant="contained" disabled={input.length === 0 || input.length > 50} style={{ marginTop:14, }} color="primary" onClick={addTodo}>
              Add Todo
            </Button> 
        </form>

        <ul className='list-group' style={{ width:570,marginTop:10 }}>
          {todos.map( todo => (
            <Todo todo={todo}/>
          ))}
        </ul>

          
      <footer>
            <Footer/>
      </footer>

      </center>

    </div>
  )
}

export default App;
