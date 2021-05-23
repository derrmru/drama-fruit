const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: "test_6AVPHyeQADq34cfPN3uUU85EAPrxxh" });

export default async (req, res) => {
  console.log(req.body)
  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: req.body.total, // We enforce the correct number of decimals through strings
    },
    description: 'Order #12345',
    redirectUrl: 'https://drama-fruit.vercel.app/',
    webhookUrl: 'https://drama-fruit.vercel.app/api/payment-status',
    metadata: {
      order_id: '12345',
    },
    billingEmail: req.body.email
  });
  console.log(payment)
  await res.redirect(payment.getCheckoutUrl())
}