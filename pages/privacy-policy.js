import Head from 'next/head'
import Layout from '../components/templates/Layout'
import { useState, useEffect } from 'react'
import { fetchEntries } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../styles/TandCs.module.css'

const Privacy = () => {
    //fetch t&c's from contentful
    const [terms, setTerms] = useState([])

    useEffect(() => {
        const getPolicy = async () => {
            const allTerms = await fetchEntries({
                content_type: "privacyPolicy",
            })
            setTerms([...allTerms])
        }
        getPolicy()
    }, [])

    console.log(terms)

    //open accordian paragraph
    const [openClose, setOpenClose] = useState('');

    return (
        <Layout>
            <Head>
                <title>Privacy Policy - Drama Fruit</title>
                <meta name="description" content="Drama Fruit Terms and Conditions" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Privacy Policy</h2>
            <div className={style.termsBody}>
            {
                terms && terms
                    .sort((a, b) => a.fields.position - b.fields.position)
                    .map((article, i) => {
                    const content = article.fields.articleBody.content;
                    return <div key={'acc-section' + i} style={{width: '100%'}}>
                        <button 
                            className={style.accordOC}
                            onClick={() => (openClose === '' || openClose !== ('p' + i)) ? setOpenClose(('p' + i)) : setOpenClose('')}
                            >
                                <div>{article.fields.articleTitle}</div> <div>{openClose === ('p' + i) ? '-' : '+'}</div>
                        </button>
                        {openClose === ('p' + i) &&
                            <div className={style.openedText + " fade-in"}>
                                {content.map((paragraph, j) => {
                                    return <div key={'paragraph' + j}>
                                        {documentToReactComponents(paragraph)}
                                    </div>
                                })}
                            </div>
                        }
                    </div>
                })
            }
            </div>
        </Layout>
    )
}

export default Privacy