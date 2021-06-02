import { useEffect, useState } from 'react'
import style from './Filter.module.css'

const Filter = ({
    options, 
    selected,
    setSelect
}) => {
    const [showOptions, setShowOptions] = useState(false)
    
    const ops = [' - Clear Filter - ', ...options]

    const update = (option) => {
        setShowOptions(!showOptions)
        option === ' - Clear Filter - ' ? setSelect('Select') : setSelect(option)
    }

    return (
        <div className={style.filterContainer + ' fade-in'}>
            <div 
                className={style.filterSelect}
                onClick={() => setShowOptions(!showOptions)}
                >
                    {selected}
                    <div className={style.downArrow + ' fade-in'}>
                        {showOptions ? <>&#10006;</> : <>&#8681;</>}
                    </div>
            </div>
            {
                showOptions && ops.map((option, i) => {
                    return <div 
                        key={'option' + i}
                        className={style.option + ' fade-in'}
                        onClick={() => update(option)}
                        >
                            {option}
                        </div>
                })
            }
        </div>
    )
}

export default Filter