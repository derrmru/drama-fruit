//mollie
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_KEY });

//firestore
import db from '../../lib/db'

export default async (req, res) => {
    console.log(req.body)
    //after transaction is complete we receive payment ID and must query the status
    const payment = await mollieClient.payments.get(req.body.id)

    //update status in firebase
    await db.collection('orders').doc(payment.metadata.order_id).set({
        status: payment.status
    }, { merge: true })

    //respond to Mollie with 200 or it keeps calling
    await res.status(200).send('complete')
}