import style from './PageTitle.module.css'

const PageTitle = ({ title }) => {
    return <h1
        className={style.title}
        style={{ textAlign: 'center' }}
    >
        {title}
    </h1>
}

export default PageTitle