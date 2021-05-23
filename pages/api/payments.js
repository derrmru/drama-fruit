//mollie
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_KEY });

//firestore
import db from '../../lib/db'

export default async (req, res) => {
  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: req.body.total,
    },
    description: req.body.description,
    redirectUrl: 'https://drama-fruit.vercel.app/payment-complete?transaction=' + req.body.transaction_id,
    webhookUrl: 'https://drama-fruit.vercel.app/api/payment-status',
    metadata: {
      order_id: req.body.transaction_id
    },
    billingEmail: req.body.email
  });

  //create order in database under mollie transaction ID
  const docRef = db.collection('orders').doc(req.body.transaction_id);
    docRef.set({
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        description: req.body.description,
        total: req.body.total,
        mollie_id: payment.id,
        date_created: new Date()
    });

  await res.send(payment.getCheckoutUrl())
}