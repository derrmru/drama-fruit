import { useState } from 'react'
import style from './Search.module.css'

const Search = () => {
    //open search box
    const [open, setOpen] = useState(false);

    //search box state
    const [search, setSearch] = useState('');

    return (
        <>
            <svg
                onClick={() => setOpen(!open)}
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
            {
                open && <div className={style.searchBox + ' fade-in'}>
                    <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                </div>
            }
        </>
    )
}

export default Search