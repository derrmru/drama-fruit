import Head from 'next/head'
import Layout from '../components/templates/Layout'
import { useState, useEffect } from 'react'
import { getEntry } from '../lib/contentful'
import style from '../styles/TandCs.module.css'

const Privacy = () => {
    //fetch t&c's from contentful
    const [terms, setTerms] = useState({})

    useEffect(() => {
        const getPolicy = async () => {
            const selection = await getEntry('dBigm3szJcXAvkGP7FAr2')
            setTerms(selection)
        }
        getPolicy()
    }, [])

    console.log(terms)

    let policy;
    if (terms.fields) {
        policy = terms.fields.terms
    }

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
                policy && Object.keys(policy).map((section, i) => {
                    return <div key={'acc-section' + i} style={{width: '100%'}}>
                        <button 
                            className={style.accordOC}
                            onClick={() => (openClose === '' || openClose !== ('p' + i)) ? setOpenClose(('p' + i)) : setOpenClose('')}
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

export default Privacy