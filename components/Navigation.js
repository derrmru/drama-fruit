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
                            <Image
                                src="/images/drama_fruit_logo.jpeg"
                                alt="Drama Fruit Logo"
                                width={144}
                                height={112}
                            />
                            <h1>Fruit</h1>
                        </span>
                    </a>
                </Link>
                <div
                    className={style.iconsContainer}
                    >
                    <svg
                        className={style.icon}
                        viewBox="-10 -10 60 60" 
                        width="50" 
                        height="44"
                        >
                            <path 
                                strokeWidth="2"
                                stroke="black"
                                fill="black"
                                d="M 5 2 C 3.35455 2 2 3.35455 2 5 L 2 45 C 2 46.6455 3.35455 48 5 48 L 45 48 C 46.6455 48 48 46.6455 48 45 L 48 5 C 48 3.35455 46.6455 2 45 2 L 5 2 Z M 5 4 L 45 4 C 45.5545 4 46 4.44545 46 5 L 46 45 C 46 45.5545 45.5545 46 45 46 L 5 46 C 4.44545 46 4 45.5545 4 45 L 4 5 C 4 4.44545 4.44545 4 5 4 Z M 22 11 C 15.9367 11 11 15.9367 11 22 C 11 28.0633 15.9367 33 22 33 C 24.6527 33 27.0976 32.0395 29 30.4688 L 29.0313 30.4688 L 37.7813 39.2188 L 39.2188 37.7813 L 30.4688 29.0313 L 30.4688 29 C 32.0395 27.0976 33 24.6527 33 22 C 33 15.9367 28.0633 11 22 11 Z M 22 13 C 26.9824 13 31 17.0176 31 22 C 31 26.9824 26.9824 31 22 31 C 17.0176 31 13 26.9824 13 22 C 13 17.0176 17.0176 13 22 13 Z"
                                />
                    </svg>
                    <svg 
                        className={style.icon}
                        viewBox="0 -2 34 32" 
                        width="50" 
                        height="44"
                        >
                        <path 
                            strokeWidth=".1"
                            stroke="black"
                            fill="black"
                            d="M 5 7 C 4.448 7 4 7.448 4 8 C 4 8.552 4.448 9 5 9 L 7.21875 9 L 9.84375 19.5 C 10.0667 20.39 10.8643 21 11.7813 21 L 13 21 L 22 21 L 23.25 21 C 24.152 21 24.9182 20.4013 25.1563 19.5313 L 27.75 10 L 11 10 L 11.5 12 L 25.1563 12 L 23.25 19 L 11.7813 19 L 9.15625 8.5 C 8.93425 7.61 8.13675 7 7.21875 7 L 5 7 Z M 22 21 C 20.355 21 19 22.355 19 24 C 19 25.645 20.355 27 22 27 C 23.645 27 25 25.645 25 24 C 25 22.355 23.645 21 22 21 Z M 13 21 C 11.355 21 10 22.355 10 24 C 10 25.645 11.355 27 13 27 C 14.645 27 16 25.645 16 24 C 16 22.355 14.645 21 13 21 Z M 13 23 C 13.5641 23 14 23.4359 14 24 C 14 24.5641 13.5641 25 13 25 C 12.4359 25 12 24.5641 12 24 C 12 23.4359 12.4359 23 13 23 Z M 22 23 C 22.5641 23 23 23.4359 23 24 C 23 24.5641 22.5641 25 22 25 C 21.4359 25 21 24.5641 21 24 C 21 23.4359 21.4359 23 22 23 Z" />
                    </svg>
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