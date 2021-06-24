import style from '../../styles/Product.module.css'

const Sizes = ({
    sizes,
    theSize,
    setTheSize
}) => {
    return (
        <>
            {
                (sizes && sizes.indexOf('One Size Only') < 0) &&
                <>
                    <p>Size:</p>
                    <div className={style.sizesContainer}>
                        {
                            sizes.indexOf('S') >= 0 &&
                            <div
                                className={style.size}
                                style={theSize === 'Small' ? { backgroundColor: 'rgb(200, 200, 200)', border: '1px solid var(--drama-pink)' } : {}}
                                onClick={() => setTheSize('Small')}
                            >
                                S
                            </div>
                        }
                        {
                            sizes.indexOf('M') >= 0 &&
                            <div
                                className={style.size}
                                style={theSize === 'Medium' ? { backgroundColor: 'rgb(200, 200, 200)', border: '1px solid var(--drama-pink)' } : {}}
                                onClick={() => setTheSize('Medium')}
                            >
                                M
                            </div>
                        }
                        {
                            sizes.indexOf('L') >= 0 &&
                            <div
                                className={style.size}
                                style={theSize === 'Large' ? { backgroundColor: 'rgb(200, 200, 200)', border: '1px solid var(--drama-pink)' } : {}}
                                onClick={() => setTheSize('Large')}
                            >
                                L
                            </div>
                        }
                        {
                            sizes.indexOf('XL') >= 0 &&
                            <div
                                className={style.size}
                                style={theSize === 'Extra Large' ? { backgroundColor: 'rgb(200, 200, 200)', border: '1px solid var(--drama-pink)' } : {}}
                                onClick={() => setTheSize('Extra Large')}
                            >
                                XL
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Sizes