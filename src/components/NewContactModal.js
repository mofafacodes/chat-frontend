import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactContext'

function NewContactModal({ closeModal }) {
    const idRef = React.useRef()
    const nameRef = React.useRef()

    const {createContact} = useContacts()
    function handleSubmit(e) {
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
     }
    
  return (
      <div>
          <Modal.Header closeButton>Create Contact</Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  <Form.Group>
                      <Form.Label>Id</Form.Label>
                      <Form.Control type='text' ref={idRef} required/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type='text' ref={nameRef} required/>
                  </Form.Group>
                  <Button variant='primary' type='submit'>Create</Button>
              </Form>
          </Modal.Body>
      </div>
  )
}

export default NewContactModal