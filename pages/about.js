import Head from 'next/head'
import PageTitle from '../components/PageTitle'
import Layout from '../components/templates/Layout'

const About = () => {
    return (
        <div>
            <Head>
                <title>About - Drama Fruit</title>
                <meta name="description" content="About Drama Fruit" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <PageTitle title="About Drama Fruit" />

            </Layout>
        </div>
    )
}

export default About