import { useState, useEffect } from 'react'
import { ShoppingProvider } from '../src/context/shoppingCart'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  //shopping items context
  const [items, setItems] = useState({})
  //reduce items
  const itemsSetter = (newItems) => {
    let i = {...items};
    Object.keys(i).forEach(item => !newItems[item] && delete i[item])
    Object.keys(newItems).forEach(item => i[item] = newItems[item])
    setItems(i)
    window.localStorage.setItem('items', JSON.stringify(i))//also store basket change in local Storage
  }

  useEffect(() => {
    if (window.localStorage.getItem('items')) setItems(JSON.parse(window.localStorage.getItem('items')))
  }, [])

  console.log(items)

  //value to pass to ShoppingProvider
  const value = { items, itemsSetter }

  return (
    <ShoppingProvider value={value}>
      <Component {...pageProps} />
    </ShoppingProvider>
  )
}

export default MyApp
