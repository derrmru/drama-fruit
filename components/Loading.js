import style from './Loading.module.css'

const Loading = ({
    message
}) => {

    return (
        <div className={style.wakingUp}>
            <div className={style.loadingIcon}>
                <div className={style.firstCircle}></div>
            </div>
            <p className={style.loadingText}>{message}...</p>
        </div>
    )
}

export default Loading