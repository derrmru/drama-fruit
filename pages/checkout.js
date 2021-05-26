import Head from 'next/head'
import Link from 'next/link'
import $ from 'jquery'
import { v4 as uuidv4 } from 'uuid';
import Loading from '../components/Loading'
import Layout from '../components/templates/Layout'
import TextInput from '../components/form_components/TextInput'
import EmailInput from '../components/form_components/EmailInput'
import AddressInput from '../components/form_components/AddressInput'
import { useState, useContext } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import style from '../styles/Checkout.module.css'

export default function Checkout() {
  //cart context
  const { items, itemsSetter } = useContext(ShoppingContext)

  //delete item from cart
  const deleteItem = (item) => {
    let obj = {...items};
    delete obj[item]
    itemsSetter(obj)
  }

  //increment or decrement pages
  const inc = (item, direction) => {
    let obj = { ...items };
    const newValue = obj[item]['number'] + direction
    if (newValue <= obj[item]['maxNumber']) {
      obj[item]['number'] = Number(obj[item]['number']) + direction
      itemsSetter(obj)
    }
  }

  //state measures whether they are ready to pay
  const [payNow, setPayNow] = useState(false);

  //total variable
  const total = Object.keys(items).reduce((total, item) => {
    return total += (Number(items[item]['price']) * Number(items[item]['number']))
  }, 0);

  //description variable
  const desc = Object.keys(items).reduce((description, current) => {
    return description += (current + ' x' + items[current]['number'] + ', ')
  }, '')

  //handle form inputs
  const [fields, setFields] = useState({});
  const setValue = (name, value) => {
    let temp = {...fields}
    temp[name] = value;
    setFields(temp)
  }

  //auto complete address state
  const [address, setAddress] = useState('');

  //handle submit
  const submit = (e) => {
    e.preventDefault()
    setLoad(true)
    const details = Object.keys(items).map(item => {
      return {environment: items[item]['environment'], id: items[item]['id']}
    });
    $.post(
      '/api/payments', 
      {
        transaction_id: uuidv4(),
        name: fields.full_name,
        email: fields.email,
        telephone: fields.telephone,
        description: desc,
        address: address,
        total: total.toFixed(2), //Mollie requires format of amount to be string with two decimal places
        details: details
      }).done((paymentUrl) => {
        //navigate to payment url
        window.location.href = paymentUrl
      })
  }

  //set Load
  const [load, setLoad] = useState(false);

  //update stock on contentful to minus number of items bought
  /*if (Object.keys(items).length > 0) {
    Object.keys(items).forEach(item => {
      updateStock(items[item].environment, items[item].id, items[item].number)
    })
  }*/

  return (
    <div>
      <Head>
        <title>Checkout - Drama Fruit</title>
        <meta name="description" content="Fresh Fruit by Marek Kalianko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Checkout</h2>
        {
          !payNow ? <>
          {
            Object.keys(items).length === 0 ? <>
              <h3 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Your Basket Is Empty</h3>
              <div style={{ textAlign: 'center', margin: '40px 0 40px' }}><Link href="/drama-shop"><a>Go To Shop</a></Link></div>
            </> : <>
              <div className={style.checkoutPanel + ' fade-in'}>
                <div className={style.itemsPanel}>
                  {//list basket items
                    Object.keys(items).map((item, i) => {
                      const slug = item.toLowerCase().split(' ').join('-')
                      return <div
                        key={'basketItem' + i}
                        className={style.item}
                      >
                        <div className={style.itemImage}>
                          <img
                            src={'/' + items[item]['image']}
                            object-fit="cover"
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div className={style.itemText}>
                          <h3 className={style.itemHeader} style={{ margin: '0' }}>
                            {item}
                          </h3>
                          <p>Price: €{items[item]['price']}</p>
                          {
                            items[item]['maxNumber'] === 1 ? 
                              <p 
                                style={{color: 'var(--drama-pink)', margin: '0 0 10px 0'}}
                                >
                                  Last In Stock
                              </p> :
                              <div className={style.incrementContain}>
                                Number of Items:
                                <div
                                  className={style.incrementButton}
                                  onClick={() => items[item]['number'] > 1 && inc(item, -1)}
                                >
                                  &#8722;
                                                  </div>
                                <div>{items[item]['number']}</div>
                                <div
                                  className={style.incrementButton}
                                  onClick={() => inc(item, 1)}
                                >
                                  &#x2b;
                                                  </div>
                              </div>
                          }
                          <div className={style.itemHeader}>
                            <Link href={'/drama-shop/' + slug}>
                              <a>
                                Visit Item Page
                              </a>
                            </Link>
                          </div>
                          <div
                            className={style.removeButton}
                            onClick={() => deleteItem(item)}
                            >
                              &#10006; Remove Item
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
                <div className={style.paymentPanel}>
                  <div className={style.stickyPay}>
                    <hr style={{margin: '20px 0 20px 0', border: 'none', height: '3px', backgroundColor: 'var(--drama-pink)'}} />
                    <h3 className={style.basketDetailsHeader} style={{ textAlign: 'center' }}>
                      Basket Details
                    </h3>
                    <hr style={{margin: '20px 0 20px 0', border: 'none', height: '3px', backgroundColor: 'var(--drama-pink)'}} />
                    <div>
                      <div>Items:</div>
                      <ul>
                        {//list items above total
                          Object.keys(items).map((item, j) => {
                            return <li key={'totalItem' + j} style={{marginBottom: '20px'}}>
                              {item} x{items[item]['number']}: <span style={{color: 'var(--drama-yellow)'}}>€{(Number(items[item]['price']) * Number(items[item]['number']))}</span>
                            </li>
                          })
                        }
                      </ul>
                    </div>
                    <div className={style.basketTotal}>
                      <ul>
                        <li>
                          Basket Total: €{total}
                        </li>
                      </ul>
                    </div>
                    <hr style={{margin: '40px 0 40px 0', border: 'none', height: '3px', backgroundColor: 'var(--drama-pink)'}} />
                    <button
                      className={style.payNowButton}
                      onClick={() => setPayNow(true)}
                      >
                      Proceed
                    </button>
                    <hr style={{margin: '40px 0 40px 0', border: 'none', height: '3px', backgroundColor: 'var(--drama-pink)'}} />
                  </div>
                </div>
              </div>
            </>
          }
          </>
          :
          load ? <Loading /> :
          <div className={style.paypalContainer}>
            <h3 style={{margin: '5px 0 20px'}}>Delivery Details</h3>
            <form 
              onSubmit={(e) => submit(e)} 
              style={{textAlign: 'left', margin: '0 0 20px 0'}}
              >
              <TextInput 
                name="full_name"
                value={fields.full_name}
                setValue={(name, value) => setValue(name, value)}
                />
              <EmailInput 
                name="email"
                value={fields.email}
                setValue={(name, value) => setValue(name, value)}
                />
              <TextInput 
                name="telephone"
                value={fields.telephone}
                setValue={(name, value) => setValue(name, value)}
                />
              <AddressInput 
                name="address"
                value={address}
                setAddress={(value) => setAddress(value)}
                />
              <input
                type="submit"
                value="BUY"
                />
              </form>
            <button
              style={{marginBottom: '20px', width: '100%'}}
              onClick={() => setPayNow(false)}
              >
              Edit My Basket
            </button>
          </div>
        }
        
      </Layout>
    </div>
  )
}