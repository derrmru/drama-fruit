import { useState, useContext, useEffect } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import Image from 'next/image'
import Link from 'next/link'
import style from './Cart.module.css'

const Cart = () => {
    //show basket
    const [show, setShow] = useState(false);

    //cart context
    const { items, itemsSetter } = useContext(ShoppingContext)
    const cartLength = Object.keys(items).length;
    console.log(items)

    //delete item from cart
    const deleteItem = (item) => {
        let obj = {...items};
        delete obj[item]
        itemsSetter(obj)
    }

    //increment or decrement
    const inc = (item, direction) => {
        let obj = {...items};
        obj[item]['number'] = Number(obj[item]['number']) + direction
        itemsSetter(obj)
    }

    useEffect(() => {
        if (show) cartLength < 1 && setShow(false)
    })

    return (
        <div className={style.cartOverlay}>
            {
                cartLength > 0 && <div className={style.itemNo}>
                    <div>{cartLength}</div>
                </div>
            }
            <svg
                onClick={() => cartLength > 0 && setShow(!show)}
                className={style.icon}
                viewBox="0 -2 34 32"
                width="40"
                height="40"
            >
                <path
                    strokeWidth=".1"
                    stroke="black"
                    fill="black"
                    d="M 5 7 C 4.448 7 4 7.448 4 8 C 4 8.552 4.448 9 5 9 L 7.21875 9 L 9.84375 19.5 C 10.0667 20.39 10.8643 21 11.7813 21 L 13 21 L 22 21 L 23.25 21 C 24.152 21 24.9182 20.4013 25.1563 19.5313 L 27.75 10 L 11 10 L 11.5 12 L 25.1563 12 L 23.25 19 L 11.7813 19 L 9.15625 8.5 C 8.93425 7.61 8.13675 7 7.21875 7 L 5 7 Z M 22 21 C 20.355 21 19 22.355 19 24 C 19 25.645 20.355 27 22 27 C 23.645 27 25 25.645 25 24 C 25 22.355 23.645 21 22 21 Z M 13 21 C 11.355 21 10 22.355 10 24 C 10 25.645 11.355 27 13 27 C 14.645 27 16 25.645 16 24 C 16 22.355 14.645 21 13 21 Z M 13 23 C 13.5641 23 14 23.4359 14 24 C 14 24.5641 13.5641 25 13 25 C 12.4359 25 12 24.5641 12 24 C 12 23.4359 12.4359 23 13 23 Z M 22 23 C 22.5641 23 23 23.4359 23 24 C 23 24.5641 22.5641 25 22 25 C 21.4359 25 21 24.5641 21 24 C 21 23.4359 21.4359 23 22 23 Z" />
            </svg>
            {
                show && <div className={style.basket}>
                    <div 
                        className={style.exitCross}
                        onClick={() => cartLength > 0 && setShow(!show)}
                        >
                            &#10006;
                    </div>
                    <div className={style.basketItem}>
                        <h3>BASKET</h3>
                        <hr />
                        {
                            Object.keys(items).map((item, i) => {
                                return <div
                                    key={'cartItem' + i}
                                    className={style.item}
                                    >
                                    <Image
                                        src={'/' + items[item]['image']}
                                        width={"40%"}
                                        height={"40%"}
                                    />
                                    <div className={style.basketItemText}>
                                        <div className={style.basketItemTitle}>{item}</div>
                                        <div>€{items[item]['price']}</div>
                                        <div className={style.incrementContain}> 
                                            <div 
                                                className={style.incrementButton}
                                                onClick={() => items[item]['number'] > 1 && inc(item, -1)}
                                                >
                                                    -
                                            </div>
                                            <div>{items[item]['number']}</div>
                                            <div 
                                                className={style.incrementButton}
                                                onClick={() => inc(item, 1)}
                                                >
                                                    +
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className={style.itemCross}
                                        onClick={() => deleteItem(item)}
                                        >
                                            &#10006;
                                    </div>
                                </div>
                            })
                        }
                        <hr />
                        <div 
                            className={style.basketTotal}
                            >
                            <h4>TOTAL: €{Object.keys(items).reduce((total, item) => total += (Number(items[item]['price']) * Number(items[item]['number'])), 0)}</h4>
                        </div>
                        <hr />
                        <div className={style.checkContain}>
                        <Link href="/checkout" width="100%">
                            <a className={style.checkout} style={{width: '100%'}}>
                                CHECKOUT
                            </a>
                        </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart