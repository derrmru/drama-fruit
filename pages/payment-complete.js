import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/templates/Layout'
import Loading from '../components/Loading'
import { useEffect, useState, useContext } from "react"
import { ShoppingContext } from '../src/context/shoppingCart'
import { updateStock } from '../lib/contentful'
import $ from 'jquery'
import style from '../styles/Payment.module.css'

const PaymentComplete = () => {
    const [transaction, setTransaction] = useState({});

    //get transaction id from redirection URL
    let tId;
    useEffect(() => {
        tId = window.location.href.split('transaction=')[1].split('id=')[0];

        //get order status from transaction id using api/check-order
        if (Object.keys(transaction).length === 0) {
            $.post(
                '/api/check-order',
                {
                    transaction_id: tId
                }).done((data) => {
                    console.log(data)
                    setTransaction(data)
                })
        }
    }, [transaction])

    //shopping cart context//shopping cart context
    const { items, itemsSetter } = useContext(ShoppingContext)

    useEffect(() => {//update stock for items that were purchased
        if (Object.keys(transaction).length > 0) {
            let items = window.location.href.split('id=');
            console.log(items)
            items.map((item, i) => {
                if (i > 0) {
                    const id = item.split('number=')[0];
                    console.log(id)
                    const num = item.split('number=')[1];
                    console.log(num)
                    if (transaction["status"] === 'paid') {
                        updateStock(id, num)//set contentful to decrease stock
                        itemsSetter({}) //empty cart on successful purchase completion
                        window.localStorage.setItem('items', JSON.stringify({})) //empty local storage (cart)
                    }
                }
            })
        }
    }, [transaction])

    return (
        <div>
            <Head>
                <title>Drama Fruit</title>
                <meta name="description" content="Successful Transaction" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className={style.response}>
                    {(transaction && Object.keys(transaction).length > 0) ?
                        transaction["status"] === 'paid' ? <div>
                            <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Payment Complete!</h2>
                            <h3 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Please check your emails for confirmation of your order.</h3>
                            <p style={{ textAlign: 'center', margin: '40px 0 40px' }}>Your Order ID is: <span style={{ fontSize: '28px' }}>{transaction && transaction.mollie_id}</span></p>
                            <p style={{ textAlign: 'center', margin: '40px 0 40px' }}>Feel like buying more?! Head back to the <Link href="/drama-shop"><a>Shop</a></Link></p>
                        </div> :
                            transaction["status"] === 'open' ? <div>
                                <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Payment Incomplete!</h2>
                                <h3 style={{ textAlign: 'center', margin: '40px 0 40px' }}>It looks like you started your payment, but it didn't finish.</h3>
                                <div style={{ textAlign: 'center', margin: '40px 0 40px' }}>Please head back to the <Link href="/drama-shop"><a>Shop</a></Link> and try again.</div>
                            </div> :
                                transaction["status"] === 'expired' ? <div>
                                    <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Payment Incomplete!</h2>
                                    <h3 style={{ textAlign: 'center', margin: '40px 0 40px' }}>It looks like you started your payment, but you didn't finish in time.</h3>
                                    <div style={{ textAlign: 'center', margin: '40px 0 40px' }}>Please head back to the <Link href="/drama-shop"><a>Shop</a></Link> and try again.</div>
                                </div> :
                                    transaction["status"] === 'canceled' ? <div>
                                        <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Payment Cancelled!</h2>
                                        <h3 style={{ textAlign: 'center', margin: '40px 0 40px' }}>It looks like you had second thoughts.</h3>
                                        <div style={{ textAlign: 'center', margin: '40px 0 40px' }}>Why not head back to the <Link href="/drama-shop"><a>Shop</a></Link> so I can convince you!</div>
                                    </div> :
                                        transaction["status"] === 'failed' ? <div>
                                            <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Payment Failed!</h2>
                                            <h3 style={{ textAlign: 'center', margin: '40px 0 40px' }}>It looks like we can't accept your payment method.</h3>
                                            <div style={{ textAlign: 'center', margin: '40px 0 40px' }}>Why not head back to the <Link href="/drama-shop"><a>Shop</a></Link> and try again with a different card.</div>
                                        </div> :
                                            <>
                                                <Loading message="This is taking a little long" />
                                            </> :
                        <>
                            <Loading message="awaiting payment confirmation" />
                        </>
                    }
                </div>
            </Layout>
        </div>
    )
}

export default PaymentComplete