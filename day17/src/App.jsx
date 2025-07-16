import { useRef, useReducer, useCallback, createContext, useMemo } from 'react'
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

export const contactStateContext = createContext();
export const contactDispatchContext = createContext();

function App() {
  const [contacts, dispacth] = useReducer(reducer, mokdata);
  const idRef= useRef(3);

  const onCreate = useCallback((contact) => {
    dispacth({
      type: "CREATE",
      data: {
        id: idRef.current++,
        name: contact.name,
        email: contact.email,
      }
    })
  }, []);

  const onDelete = useCallback((targetId) => {
    dispacth({
      type: "DELETE",
      targetId: targetId,
    })
  }, []);


  const memoizedDispatch = useMemo(() => {
    return { onCreate, onDelete };
  }, [])

  return (
    <div className="App">
      <h2>Contact List</h2>
      <contactStateContext.Provider value={contacts}>
      <contactDispatchContext.Provider
       value={memoizedDispatch}
      >
      <section>
        <ContactEditor />
      </section>
      <section>
        <ContactList />
      </section>
      </contactDispatchContext.Provider>
      </contactStateContext.Provider>
    </div>
  )
}

export default App
