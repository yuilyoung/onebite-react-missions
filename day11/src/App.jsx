import { useState } from 'react'
import './App.css'
import OrderEdit from "./components/OrderEdit"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <OrderEdit/>
    </>
  )
}

export default App
