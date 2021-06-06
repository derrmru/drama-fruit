import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/templates/Layout'
import PageTitle from '../components/PageTitle'
import FAQs from '../components/FAQ/FAQs'
import { fetchEntries } from '../lib/contentful'

const FAQ = () => {

    //fetch entries from contentful
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        const ent = async () => {
            const allEntries = await fetchEntries({
                content_type: "faqs",
            })
            setEntries([...allEntries])
        }
        ent()
    }, [])
    
    return (
        <div>
            <Head>
                <title>Frequently Asked Questions - Drama Fruit</title>
                <meta name="description" content="Frequently Asked Questions" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <PageTitle title="FAQ's" />
                <FAQs entries={entries} />
            </Layout>
        </div>
    )
}

export default FAQ