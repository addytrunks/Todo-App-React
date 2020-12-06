import React from 'react'
import {useState} from 'react'
import db from './firebase'
import {Modal} from 'react-bootstrap'
import firebase from 'firebase'

const Todo = ({todo}) => {

    const [show,setShow] = useState(false)
    const [input,setInput] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const time = Date(todo.time).split(' ').slice(1,5)

    const updateTodo = (event) => {
        db.collection('todos').doc(todo.id).set({
            todo:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true})
        setShow(false)
    }
    return (
        <div>
            <li className='list-group-item list-group-item-action'>
                {todo.todo}
                <button onClick={handleShow} className='btn btn-sm btn-success float-right' >
                    <i className="far fa-edit"></i>
                </button>
                <button onClick={event => db.collection('todos').doc(todo.id).delete()} className='btn btn-sm btn-danger float-right mr-2'>
                    <i className="far fa-trash-alt"></i>
                </button>
            </li>

                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Update Todo</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                            <input placeholder={todo.todo} value={input} onChange={event => setInput(event.target.value)} className='form-control' />
                            <small id="emailHelp" class="form-text text-muted">Added at {time.map(t => (
                                t+' '
                            ))}</small><br />
                            <button onClick={updateTodo} disabled={input.length === 0 || input.length>100} type="submit" className='btn btn-md btn-success'>Update</button>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Todo