const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: "test_6AVPHyeQADq34cfPN3uUU85EAPrxxh" });

export default async (req, res) => {
  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: '10.00', // We enforce the correct number of decimals through strings
    },
    description: 'Order #12345',
    redirectUrl: 'https://drama-fruit.vercel.app/',
    webhookUrl: 'https://drama-fruit.vercel.app/api/payment-status',
    metadata: {
      order_id: '12345',
    },
  });
  await res.redirect(payment.redirectUrl)
}