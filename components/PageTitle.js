import style from './PageTitle.module.css'

const PageTitle = ({ title }) => {
    return <h2 
        className={style.title}
        style={{ textAlign: 'center'}}
        >
            {title}
        </h2>
}

export default PageTitle