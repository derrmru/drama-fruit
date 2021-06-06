import Head from 'next/head'
import { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Layout from '../components/templates/Layout'
import { getEntry } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../styles/About.module.css'

const About = () => {
    const [entry, setEntry] = useState([]);
    useEffect(() => {
        const fetchEntry = async () => {
            const allEntries = await getEntry('52AGVrAlHOX1XvGsV0dQ8o')
            setEntry(allEntries)
        }
        fetchEntry()
    }, [])

    console.log(entry)

    return (
        <div>
            <Head>
                <title>About - Drama Fruit</title>
                <meta name="description" content={entry.fields && entry.fields.seoDescription}/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <PageTitle title="About Drama Fruit" />
                <div className={style.profileContainer}>
                    <div className={style.profileImage}>
                        <img 
                            src={entry.fields && entry.fields.profileImage.fields.file.url} 
                            width="100%"
                            />
                    </div>
                    <div
                        className={style.profile}
                        >
                            {
                                entry.fields && documentToReactComponents(entry.fields.profile)
                            }
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default About