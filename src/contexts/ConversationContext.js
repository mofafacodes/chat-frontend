import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactContext'
import { arrayEquality } from '../helpers/misc'
import { useSocket } from './SocketContext'

const ConversationContext = React.createContext()

export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationProvider({ id, children }) {
    const socket = useSocket()

    const [conversations, setConversations] = useLocalStorage('conversations', [])
    
    const [selectedConversationIndex, setSelectedConversationIndex] = React.useState(0)
    
    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]})
    }

    const { contacts } = useContacts()

    const addMessageToConversation = React.useCallback(({ recipients, text, sender } ) => {
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversations = prevConversations.map(
                conversation => {
                    if (arrayEquality(conversation.recipients, recipients)) {
                        madeChange = true
                        return {
                            ...conversations,
                            messages: [...conversation.messages, newMessage]
                        }
                    }
                    return conversation
                }
            )
            if (madeChange) {
                return newConversations
            } else {
                return [
                    ...prevConversations, {
                       recipients, 
                       messages: [newMessage] 
                    }
                ]
            }
        })
     }, [setConversations])

    React.useEffect(() => {
        if (socket == null) return
        socket.on('receive-message', addMessageToConversation)
        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])


    function sendMessage(recipients, text) {

        socket.emit('send-message', { recipients, text})
        addMessageToConversation({recipients, text, sender: id})
    }
    // const formattedConvos = conversations.map((conversation, index) => {
    //     const r = conversations
    //     console.log(r. r)
    //     const recipients = conversation.recipients.map(recipient => {
    //         const contact = contacts.find(contact => {
    //             return contact.id === recipient
    //         })

    //         const name = (contact && contact.name) || recipient 
    //     return { id: recipient, name}    
    //     })

    //     const messages = conversation.messages.map(message => {
    //         const contact = contacts.find(contact => {
    //             return contact.id === message.sender
    //         })

    //         const name = (contact && contact.name) || message.sender 
    //         const fromMe = id === message.sender

    //         return {
    //             message, senderName: name, fromMe
    //         }
    //     })

    //     const selected = index === selectedConversationIndex
    //     return { ...conversation, messages, recipients, selected }
    // })


    const value = {
        conversations,
        selectedConversation: conversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }
  return (
      <ConversationContext.Provider value={value}>
          {children}
      </ConversationContext.Provider>
     )
}



