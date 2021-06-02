import Head from 'next/head'
import Layout from '../components/templates/Layout'
import { useState, useEffect } from 'react'
import { fetchEntries } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../styles/TandCs.module.css'

const TandCs = () => {
    //fetch t&c's from contentful
    const [terms, setTerms] = useState({})

    useEffect(() => {
        const getPolicy = async () => {
            const selection = await fetchEntries({
                content_type: "termsAndConditions",
            })
            setTerms(...selection)
        }
        getPolicy()
    }, [])

    let policy;
    if (terms.fields) {
        policy = terms.fields.terms
        console.log(policy)
    }

    //open accordian paragraph
    const [openClose, setOpenClose] = useState('');
    console.log(openClose)

    return (
        <Layout>
            <Head>
                <title>Terms and Conditions - Drama Fruit</title>
                <meta name="description" content="Drama Fruit Terms and Conditions" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Terms and Conditions</h2>
            <div className={style.termsBody}>
            {
                policy && Object.keys(policy).map((section, i) => {
                    return <div key={'acc-section' + i} style={{width: '100%'}}>
                        <button 
                            className={style.accordOC}
                            onClick={() => openClose === '' ? setOpenClose(('p' + i)) : setOpenClose('')}
                            >
                                <div>{section}</div> <div>{openClose === ('p' + i) ? '-' : '+'}</div>
                        </button>
                        {openClose === ('p' + i) &&
                            <div className="fade-in">
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
            }
            </div>
        </Layout>
    )
}

export default TandCs