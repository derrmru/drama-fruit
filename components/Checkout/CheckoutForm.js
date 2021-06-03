import Link from 'next/link'
import TextInput from '../form_components/TextInput'
import EmailInput from '../form_components/EmailInput'
import AddressInput from '../form_components/AddressInput'
import Checkbox from '../form_components/Checkbox'
import style from '../../styles/Checkout.module.css'

const CheckoutForm = ({
    submit,
    fields,
    setValue,
    address,
    setAddress,
    setPayNow
}) => {
    return <div className={style.paypalContainer}>
        <h3 style={{margin: '5px 0 20px'}}>Delivery Details</h3>
        <form 
            onSubmit={(e) => submit(e)} 
            style={{textAlign: 'left', margin: '0 0 20px 0'}}
            >
            <TextInput 
                name="full_name"
                value={fields.full_name}
                setValue={(name, value) => setValue(name, value)}
                />
            <EmailInput 
                name="email"
                value={fields.email}
                setValue={(name, value) => setValue(name, value)}
                />
            <TextInput 
                name="telephone"
                value={fields.telephone}
                setValue={(name, value) => setValue(name, value)}
                />
            <AddressInput 
                name="address"
                value={address}
                setAddress={(value) => setAddress(value)}
                />
            <Checkbox 
                name="privacy"
                value={fields.privacy}
                setValue={(name, value) => setValue(name, value)}
                description={<>By ticking this box you indicate that you have read and agree with our <Link href="/terms-and-conditions"><a>Terms and Conditions</a></Link> and <Link href="/privacy-policy"><a>Privacy Policy</a></Link></>}
                />
            <input
                type="submit"
                value="BUY"
                />
        </form>
        <button
            style={{marginBottom: '20px', width: '100%'}}
            onClick={() => setPayNow(false)}
            >
            Edit My Basket
        </button>
    </div>
}

export default CheckoutForm