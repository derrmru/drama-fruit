import { useState } from 'react'
import $ from 'jquery'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/templates/Layout'
import TextInput from '../components/form_components/TextInput'
import EmailInput from '../components/form_components/EmailInput'
import TextArea from '../components/form_components/TextArea'
import Checkbox from '../components/form_components/Checkbox'
import SocialMedia from '../components/SocialMedia'
import style from '../styles/Contact.module.css'

const Contact = () => {
    //form fields
    const [fields, setFields] = useState({});
    //reduce to single state
    const updateFields = (name, value) => {
        let temp = {...fields};
        temp[name] = value;
        setFields(temp)
    }
    console.log(fields)

    //submit form
    const submit = (e) => {
        e.preventDefault();
        $.post(
            '/api/contact',
            fields
        ).done((res) => {
            console.log(res)
        })
    }

    return (
        <div>
            <Layout>
                <Head>
                    <title>Drama Fruit - Contact</title>
                    <meta name="description" content="Get In Touch - Drama Fruit" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h2 style={{ textAlign: 'center', margin: '40px 0 40px' }}>Contact</h2>
                <form 
                    className={style.form}
                    onSubmit={(e) => submit(e)}
                    >
                    <TextInput 
                        name='first_name'
                        value={fields.first_name}
                        setValue={(name, value) => updateFields(name, value)}
                        />
                    <TextInput 
                        name='last_name'
                        value={fields.last_name}
                        setValue={(name, value) => updateFields(name, value)}
                        />
                    <TextInput 
                        name='oh_no_honey'
                        value={fields.oh_no_honey}
                        setValue={(name, value) => updateFields(name, value)}
                        />
                    <EmailInput 
                        name='email'
                        value={fields.email}
                        setValue={(name, value) => updateFields(name, value)}
                        />
                    <TextArea 
                        name='message'
                        value={fields.message}
                        setValue={(name, value) => updateFields(name, value)}
                        id="contact_textarea"
                        />
                    <Checkbox 
                        name="privacy"
                        value={fields.privacy}
                        setValue={(name, value) => updateFields(name, value)}
                        description={<>By ticking this box you indicate that you have read and agree with our <Link href="/privacy-policy"><a>Privacy Policy</a></Link></>}
                        />
                    <input 
                        type="submit"
                        value="Send"
                        />
                </form>
                <div className={style.social}>
                    <SocialMedia />
                </div>
            </Layout>
        </div>
    )
}

export default Contact