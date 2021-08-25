import style from '../../styles/Home.module.css'

const Banner = ({
    items
}) => {
    return (
        <div className={style.bannerContainer + ' fade-in'}>
            <div className={style.bannerText + ' ' + style.mainText}>
                <h1>For Everyone<br />Unafraid<br />To Stand Out</h1>
            </div>
            <div className={style.bannerImage + ' ' + style.mainImage}>
                <img
                    className={style.theImage}
                    src={items && items.fields.bannerImage.fields.file.url}
                    alt={items && items.fields.altDescription}
                />
            </div>
        </div>
    )
}

export default Banner