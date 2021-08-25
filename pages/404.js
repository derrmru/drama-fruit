import Link from 'next/link'
import Layout from '../components/templates/Layout'
import Snake from '../components/Snake'

const Custom404 = () => {
    return (
        <Layout>
            <div style={{ width: '100%', textAlign: 'center', minHeight: '50vh', }}>
                <h1>This page does not exist!</h1>
                <p>Try heading back to our <Link href="/">Homepage</Link>.</p>
                <p>But, if you like being lost, stick around for a game of Snake!</p>
                <div style={{ margin: '40px 0', fontSize: '60px' }}>
                    &#8595;
                </div>
                <Snake
                    color1="var(--drama-pink)"
                    color2="var(--drama-green)"
                    backgroundColor="white"
                />
                <div style={{ margin: '40px 0' }}></div>
            </div>
        </Layout>
    )
}

export default Custom404