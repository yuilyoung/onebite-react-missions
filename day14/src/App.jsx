import { useState, useRef, useReducer } from 'react'
import './App.css'
import ContactEditor from './components/ContactEditor'
import ContactList from './components/ContactList'

const mokdata = [
  {
    id: 0,
    name: "한입스튜디오",
    email: "onbite.fe@gmail.com",
  },
  {
    id: 1,
    name: "이정환",
    email: "king199777@gmail.com",
  },
  {
    id: 2,
    name: "이정환2",
    email: "winterlood.dev@gmail.com",
  },
]

function reducer(state, action) {
  switch(action.type){
    case 'CREATE': return [action.data, ...state];
    case 'DELETE': return state.filter(
      (item) => item.id !== action.targetId
      );
    default: 
      return state;
    }
}

function App() {
  //const [contacts, setContacts] = useState(mokdata);
  const [contacts, dispacth] = useReducer(reducer, mokdata);
  const idRef= useRef(3);

  const onCreate = (contact) => {
    dispacth({
      type: "CREATE",
      data: {
        id: idRef.current++,
        name: contact.name,
        email: contact.email,
      }
    })
  }

  const onDelete = (targetId) => {
    dispacth({
      type: "DELETE",
      targetId: targetId,
    })
  }

  // const onCreate = (contact) => {
  //   const newContact = {
  //     id:idRef.current++,
  //     name: contact.name,
  //     email: contact.email,
  //   }

  //   setContacts([newContact, ...contacts]);
  // }

  // const onDelete = (targetId) => 
  // {
  //   setContacts(contacts.filter((contact) => contact.id != targetId));
  // }

  return (
    <div className="App">
      <h2>Contact List</h2>
      <section>
        <ContactEditor onCreate={onCreate}/>
      </section>
      <section>
        <ContactList contacts={contacts}  onDelete={onDelete}/>
      </section>
    </div>
  )
}

export default App
