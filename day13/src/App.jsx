import { useState } from 'react'
import './App.css'
import CurrencyInput from './components/CurrencyInput'

function App() {
  const [input, setInput] = useState({
    name : "",
    krw : 0,
    usd : 0,
  })

  const onChangeInput = (e) => {
    let currency = 0;
    let currencyKeyName = ""
    if(e.target.name === "krw")
    {
      currency = e.target.value / 1300;
      currencyKeyName = "usd";
    }
    else{
      currency = e.target.value * 1300;
      currencyKeyName = "krw";
    }

    setInput({
      ...input,
      [e.target.name] : e.target.value,
      [currencyKeyName] : currency, 
    })
  }

  return (
    <div className="App">
    <CurrencyInput
    name={"krw"}
    input={input.krw}
    onChangeInput={onChangeInput}
    />
      <CurrencyInput
    name={"usd"}
    input={input.usd}
    onChangeInput={onChangeInput}
    />
    </div>
  )
}

export default App
