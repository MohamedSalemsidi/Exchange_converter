import { useState, useEffect } from 'react'
import './App.css'
import Currency from './Currency'

// const BASE_URL = "https://api.exchangeratesapi.io"
const BASE_URL = "https://api.exchangerate.host/latest?base=MRU"
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exChangeRates, setexChangeRates] = useState();
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  
  let toAmount, fromAmount;
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exChangeRates
  } else {
    toAmount = amount
    fromAmount = amount / exChangeRates
  }
  useEffect(()=> {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setexChangeRates(data.rates[firstCurrency])
      });
  }, [])
  useEffect(()=> {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setexChangeRates(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency])
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <>
      <h1>Convert</h1>
      <Currency
        currencyOptions={currencyOptions}
        selected={fromCurrency}
        onchangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <Currency
        currencyOptions={currencyOptions}
        selected={toCurrency}
        onchangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App
