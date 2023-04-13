import React from "react";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactProvider } from "../contexts/ContactContext";
import { ConversationProvider } from "../contexts/ConversationContext";
import SocketProvider from "../contexts/SocketContext";

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = ( 
    <SocketProvider id={id}>
      <ContactProvider> 
       <ConversationProvider id={id}>
        <Dashboard id={id} /> 
       </ConversationProvider>
      </ContactProvider>
    </SocketProvider>
  )
  return (
      id ? dashboard : <Login onIdSubmit={setId}/>     
  );
}

export default App;
