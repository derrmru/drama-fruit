import { useEffect, useState } from "react"
import $ from 'jquery'

const PaymentComplete = () => {
    const [transaction, setTransaction] = useState();

    //get transaction id from redirection URL
    let tId;
    useEffect(() => {
        tId = window.location.href.split('transaction=')[1];
        console.log(tId)
    })

    //get order status from transaction id using api/payment-check
    $.post(
        '/api/check-order',
        { transaction_id: tId }
    ).done((data) => {
        setTransaction(data)
    })

    console.log(transaction)

    return (
        <div>
            Payment Complete
        </div>
    )
}

export default PaymentComplete