import style from '../../styles/Home.module.css'

const Banner = ({
    items
}) => {
    return (
        <div className={style.bannerContainer + ' fade-in'}>
            <div className={style.bannerText + ' ' + style.mainText}>
                <h2>For Everyone<br />Unafraid<br />To Stand Out</h2>
            </div>
            <div className={style.bannerImage + ' ' + style.mainImage}>
                <img
                    className={style.theImage} 
                    src={items && items.fields.bannerImage.fields.file.url} 
                    />
            </div>
        </div>
    )
}

export default Banner