import { useState, useEffect } from 'react'
import * as gtag from '../lib/gtag'
import { useRouter } from 'next/router'
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

  //value to pass to ShoppingProvider
  const value = { items, itemsSetter }


  //Google Analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ShoppingProvider value={value}>
      <Component {...pageProps} />
    </ShoppingProvider>
  )
}

export default MyApp
