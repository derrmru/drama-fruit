import Head from 'next/head'
import Layout from '../components/templates/Layout'
import PageTitle from '../components/PageTitle'
import { useState, useEffect } from 'react'
import { fetchEntries } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../styles/TandCs.module.css'

const TandCs = () => {
    //fetch t&c's from contentful
    const [terms, setTerms] = useState([])

    useEffect(() => {
        const getPolicy = async () => {
            const allTerms = await fetchEntries({
                content_type: "termsConditions",
            })
            setTerms([...allTerms])
        }
        getPolicy()
    }, [])

    //open accordian paragraph
    const [openClose, setOpenClose] = useState('');

    return (
        <Layout>
            <Head>
                <title>Terms and Conditions - Drama Fruit</title>
                <meta name="description" content="Drama Fruit Terms and Conditions" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <PageTitle title="Terms & Conditions" />
            <div className={style.termsBody}>
                {
                    terms && terms
                        .sort((a, b) => a.fields.position - b.fields.position)
                        .map((article, i) => {
                            const content = article.fields.articleBody.content;
                            return <div key={'acc-section' + i} style={{ width: '100%' }}>
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
                {/*
                policy && Object.keys(policy).map((section, i) => {
                    return <div key={'acc-section' + i} style={{width: '100%'}}>
                        <button 
                            className={style.accordOC}
                            onClick={() => (openClose === '' || openClose !== ('p' + i)) ? setOpenClose(('p' + i)) : setOpenClose('')}
                            >
                                <div>{section}</div> <div>{openClose === ('p' + i) ? '-' : '+'}</div>
                        </button>
                        {openClose === ('p' + i) &&
                            <div className={style.openedText + " fade-in"}>
                                {policy[section].map((paragraph, j) => {
                                    return paragraph.listItems ? //if paragraph is a subarray, map out as unordered list
                                        <ul key={'listItems' + j}>
                                            {paragraph.listItems.map((item, k) => {
                                                return <li key={'item' + k}>
                                                    {item}
                                                </li>
                                            })}
                                        </ul> : 
                                            <p key={'acc-paragraph' + j}>{paragraph}</p>
                                })}
                            </div>
                        }
                    </div>
                })
            */}
            </div>
        </Layout>
    )
}

export default TandCs