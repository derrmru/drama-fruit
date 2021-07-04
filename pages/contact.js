import React from 'react'
import { useState } from 'react'
import $ from 'jquery'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/templates/Layout'
import PageTitle from '../components/PageTitle'
import TextInput from '../components/form_components/TextInput'
import EmailInput from '../components/form_components/EmailInput'
import TextArea from '../components/form_components/TextArea'
import Checkbox from '../components/form_components/Checkbox'
import SocialMedia from '../components/SocialMedia'
import style from '../styles/Contact.module.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
        setFields({
            first_name: '',
            last_name: '',
            email: '',
            message: '',
            privacy: '',
        });
        $.post(
            '/api/contact',
            fields
        ).done((res) => {
            console.log(res);
        });
        handleClickOpen();
    } 
    
    //open and close confirmation dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Layout>
                <Head>
                    <title>Contact - Drama Fruit</title>
                    <meta name="description" content="Get In Touch - Drama Fruit" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta 
                        name="viewport" 
                        content="width=device-width, initial-scale=1.0,user-scalable=0"
                        />
                </Head>
                <PageTitle title="Contact" />
                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Thanks for getting in touch. I'll reply soon. 
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <form 
                    className={style.form}
                    onSubmit={(e) => {submit(e)}}
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