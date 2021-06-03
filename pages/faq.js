import Head from 'next/head'
import Layout from '../components/templates/Layout'
import PageTitle from '../components/PageTitle'

const FAQ = () => {
    return (
        <div>
            <Head>
                <title>Frequently Asked Questions - Drama Fruit</title>
                <meta name="description" content="Frequently Asked Questions" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <PageTitle title="FAQ's" />

            </Layout>
        </div>
    )
}

export default FAQ