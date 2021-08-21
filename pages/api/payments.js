//mollie
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_KEY });

//firestore
import db from '../../lib/db'

export default async (req, res) => {
  console.log(req.body)
  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: req.body.total,
    },
    description: req.body.description,
    redirectUrl: 'https://www.dramafruit.com/payment-complete?transaction=' + req.body.transaction_id + req.body.ids,
    webhookUrl: 'https://www.dramafruit.com/api/payment-status',
    metadata: {
      order_id: req.body.transaction_id,
      address: req.body.address
    },
    billingEmail: req.body.email
  });

  //create order in database under mollie transaction ID
  const docRef = db.collection('orders').doc(req.body.transaction_id);
  docRef.set({
    name: req.body.name,
    email: req.body.email,
    telephone: req.body.telephone,
    address: req.body.address,
    description: req.body.description,
    total: req.body.total,
    mollie_id: payment.id,
    privacy: req.body.privacy,
    contentful_ids: req.body.ids,
    date_created: new Date()
  });



  await res.send(payment.getCheckoutUrl())
}