import React from 'react'
import io from 'socket.io-client'


const SocketContext = React.createContext()

export function useSocket() {
    return React.useContext(SocketContext)
}

export default function SocketProvider({ id , children}) {

    const [socket, setSocket] = React.useState()

    React.useEffect(() => {
        const newSocket = io('http://localhost:5000', { query: { id } })
        setSocket(newSocket)

        return () => newSocket.close()
        
    }, [id])
    return (
        <SocketContext.Provider value={socket}>
            {children}
      </SocketContext.Provider>
  )
}
