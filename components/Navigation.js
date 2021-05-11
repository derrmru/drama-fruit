import { useContext, useEffect } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import Cart from './Cart'
import Link from 'next/link'
import Image from 'next/image'
import style from './Navigation.module.css'

const Navigation = ({ navItems }) => {
    return (
        <>
            <div className={style.logoTitleIcons}>
                <div className={style.iconsContainer}></div>
                
                <Link href="/">
                    <a style={{textDecoration: 'none'}}>
                        <span className={style.headerTitle}>
                            <h1>Drama</h1> 
                            <div className={style.bannerLogo}>
                            <Image
                                src="/images/drama_fruit_logo.png"
                                alt="Drama Fruit Logo"
                                width={100}
                                height={96}
                            />
                            </div>
                            <h1>Fruit</h1>
                        </span>
                    </a>
                </Link>
                <div
                    className={style.iconsContainer}
                    >
                    <div className={style.cartOverlay}>
                        <svg
                            className={style.icon}
                            viewBox="-10 -10 60 60" 
                            width="45" 
                            height="40"
                            >
                                <path 
                                    strokeWidth="2"
                                    stroke="black"
                                    fill="black"
                                    d="M 5 2 C 3.35455 2 2 3.35455 2 5 L 2 45 C 2 46.6455 3.35455 48 5 48 L 45 48 C 46.6455 48 48 46.6455 48 45 L 48 5 C 48 3.35455 46.6455 2 45 2 L 5 2 Z M 5 4 L 45 4 C 45.5545 4 46 4.44545 46 5 L 46 45 C 46 45.5545 45.5545 46 45 46 L 5 46 C 4.44545 46 4 45.5545 4 45 L 4 5 C 4 4.44545 4.44545 4 5 4 Z M 22 11 C 15.9367 11 11 15.9367 11 22 C 11 28.0633 15.9367 33 22 33 C 24.6527 33 27.0976 32.0395 29 30.4688 L 29.0313 30.4688 L 37.7813 39.2188 L 39.2188 37.7813 L 30.4688 29.0313 L 30.4688 29 C 32.0395 27.0976 33 24.6527 33 22 C 33 15.9367 28.0633 11 22 11 Z M 22 13 C 26.9824 13 31 17.0176 31 22 C 31 26.9824 26.9824 31 22 31 C 17.0176 31 13 26.9824 13 22 C 13 17.0176 17.0176 13 22 13 Z"
                                    />
                        </svg>
                    </div>
                    <Cart />
                </div>
            </div>
            <hr className={style.navHR} />
                <nav className={style.desktopNav}>
                    {
                        navItems.map((item, i) => {
                            return <Link 
                                key={'nav-item' + i} 
                                href={item[1]}
                                >
                                <a>
                                    <li>
                                        {item[0]}
                                    </li>
                                </a>
                            </Link>
                        })
                    }
                </nav>
            <hr className={style.navHR} />
        </>
    )
}

export default Navigation