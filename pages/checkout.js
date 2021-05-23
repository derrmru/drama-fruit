import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import $ from 'jquery'
import Layout from '../components/templates/Layout'
import PayPalButton from 'react-paypal-smart-button'
import TextInput from '../components/form_components/TextInput'
import { useState, useContext, useEffect } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import style from '../styles/Checkout.module.css'

export default function Checkout() {
  //cart context
  const { items, itemsSetter } = useContext(ShoppingContext)
  console.log(items)

  //delete item from cart
  const deleteItem = (item) => {
    let obj = {...items};
    delete obj[item]
    itemsSetter(obj)
  }

  //increment or decrement pages
  const inc = (item, direction) => {
    let obj = { ...items };
    obj[item]['number'] = Number(obj[item]['number']) + direction
    itemsSetter(obj)
  }

  //state measures whether they are ready to pay
  const [payNow, setPayNow] = useState(false);

  //total variable
  const total = Object.keys(items).reduce((total, item) => {
    return total += (Number(items[item]['price']) * Number(items[item]['number']))
  }, 0);

  //handle paypal submission
  const handlePaypalSuccess = () => {
    console.log('success')
  }

  //handle form inputs
  const [fields, setFields] = useState({});
  const setValue = (name, value) => {
    let temp = {...fields}
    temp[name] = value;
    setFields(temp)
  }

  const submit = (e) => {
    e.preventDefault()
    $.post('/api/payments', {
      email: fields.email
    })
  }

  return (
    <div>
      <Head>
        <title>Drama Fruit</title>
        <meta name="description" content="Fresh Fruit by Marek Kalianko" />
        <link rel="icon" href="/favicon.ico" />
        {/*netlify cms identity script*/}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
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
                        <div className={style.itemImage} style={{ width: '30%', height: '30%' }}>
                          <Image
                            src={'/' + items[item]['image']}
                            layout="responsive"
                            objectFit="contain"
                            width={"30"}
                            height={"30"}
                          />
                        </div>
                        <div className={style.itemText}>
                          <h3 className={style.itemHeader} style={{ margin: '0' }}>
                            {item}
                          </h3>
                          <p>Price: €{items[item]['price']}</p>
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
                          <div className={style.itemHeader}>
                            <Link href={'/products/' + slug}>
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
                      Pay Now
                    </button>
                    <hr style={{margin: '40px 0 40px 0', border: 'none', height: '3px', backgroundColor: 'var(--drama-pink)'}} />
                  </div>
                </div>
              </div>
            </>
          }
          </>
          :
          <div className={style.paypalContainer}>
            <form 
              onSubmit={(e) => submit(e)} 
              style={{textAlign: 'left', margin: '0 0 20px 0'}}
              >
              <TextInput 
                name="full_name"
                value={fields.full_name}
                setValue={(name, value) => setValue(name, value)}
                />
              <TextInput 
                name="email"
                value={fields.email}
                setValue={(name, value) => setValue(name, value)}
                />
              <TextInput 
                name="telephone"
                value={fields.telephone}
                setValue={(name, value) => setValue(name, value)}
                />
              <input
                type="submit"
                className={style.buyButton}
                style={{margin: '20px 0', width: '100%'}}
                value="BUY"
                />
              </form>
            {/*<PayPalButton 
              price={total}
              description={Object.keys(items).reduce((total, item) => {
                return total += item + ' x' + items[item]['number']
              }, '')}
              clientId="AQ7S1K9k_fTVm-hxtjumIIoZXi3cxwiiEuMbhjj8ls8XmzBbE6KlX6ghFbyKI8QiRXKq1ym46q2xCQNR"
              currency="EUR"
              paySubmit={() => handlePaypalSuccess()}
            />*/}
            <button
              style={{marginBottom: '20px', width: '90%'}}
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