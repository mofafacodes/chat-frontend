import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactContext'
import { useConversations } from '../contexts/ConversationContext'

export default function NewConversationModal({ closeModal }) {
    
    const [selectedContactIds, setSelectedContactIds] = React.useState([]) 


    const { contacts } = useContacts()
    const { createConversation} = useConversations()


    
    function handleCheckBoxChange(contactId)  {
        setSelectedContactIds(prevSelectedContactIds => {
            if (selectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return prevId !== contactId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    
    }


    function handleSubmit(e) {
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal();
    }

  return (
    <div>
          <Modal.Header closeButton>Start Conversation</Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                  {contacts.map(contact => (
                      <Form.Group controlId={contact.id} key={contact.id}>
                          <Form.Check
                              type='checkbox'
                              value={selectedContactIds.includes(contact.id)}
                              label={contact.name} 
                              onChange={() =>handleCheckBoxChange(contact.id)}
                              />
                    </Form.Group>
                ))}
                  <Button type='submit'>Create</Button>
              </Form>
          </Modal.Body>
        </div>
  )
}
