import React from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = React.useState()
    const conversationIsOpen = activeKey === CONVERSATIONS_KEY
    const [modalOpen, setModalOpen] = React.useState()
    function closeModal() {
        setModalOpen(false)
    }

  return (
      <div style={{ width: '250px'}} className='d-flex flex-column' >
          <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
              <Nav variant='tabs' className='justify-content-center'>
                  <Nav.Item> <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversation</Nav.Link></Nav.Item>
                  <Nav.Item> <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link></Nav.Item>
              </Nav>
              <Tab.Content className='border-right overflow-auto flex-grow-1' >
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                    <Conversations/>
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                    <Contacts/>
                </Tab.Pane>
              </Tab.Content>
              <div className='p-2 border-top border-right small'>
                  Your Id: <span className='text-muted'>{id}</span>
              </div>
              <Button rounded='rounded-0' onClick={() => setModalOpen(true)}>
                  New {conversationIsOpen ? 'Conversation' : 'Contacts'}
              </Button>
          </Tab.Container>

          <Modal show={modalOpen} hide={closeModal}>
              {conversationIsOpen ? <NewConversationModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} /> }
          </Modal>
      </div>
  )
}
