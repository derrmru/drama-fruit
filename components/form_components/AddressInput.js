import TextInput from './TextInput'
import { useState, useEffect } from 'react'

const AddressInput = (props) => {

    //render google auto complete for address fields
    const [googleLoad, setGoogleLoad] = useState(false);
    const renderGoogle = () => {
        setGoogleLoad(true)
        let autocomplete;
        const google = window.google;
        const auto = document.getElementById('address');
        autocomplete = new google.maps.places.Autocomplete(auto, {})

        let handlePlaceSelect = () => {
            let addressObject = autocomplete.getPlace();
            let address = addressObject.address_components;

            autocomplete.setFields(['address_component']);
            const val = address.reduce((total, cur) => {
                const c = cur['long_name'];
                total.push(c)
                return total
            }, []).filter((c) => c !== 'United Kingdom' && c !== 'Greater London' && c !== 'England').join(', ')
            props.setAddress(val)
        }
        autocomplete.addListener("place_changed", handlePlaceSelect)
    }

    //on mount, load google auto complete 
    useEffect(() => {
        if (!googleLoad) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkuPHNHz8Ki1KV6n6iI1-EFVIC3ZAm0QY&libraries=places";
            script.async = true;
            script.onload = () => renderGoogle();
            document.body.appendChild(script);
        }
    }, [googleLoad])

    return (
        <TextInput 
            name='address'
            value={props.value}
            setValue={(name, value) => props.setAddress(value)}
            description="Your Delivery Address, Make Sure It's Correct!"
            id="address"
        />
    )
}

export default AddressInput