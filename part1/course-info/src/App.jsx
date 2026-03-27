import Header from './Header'
import Content from './Content'
import Total from './Total'
import { useState } from 'react'
import Button from './Button'
import Counter from './Counter'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  function handleIncrease(){
    setCounter(counter + 1);
  }

  function handleDecrease(){
    setCounter(counter - 1);
  }

  function handleSetZero(){
    setCounter(0);
  }


  console.log('rendering...', counter)

  return (
    <div>
      <Counter count={counter} />
      <Button onClick={handleIncrease} text='Plus' />
      <Button onClick={handleDecrease} text='Minus' />
      <Button onClick={handleSetZero} text='Set Zero' />
    </div>
  )
}

export default App