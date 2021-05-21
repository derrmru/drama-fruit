const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: "test_6AVPHyeQADq34cfPN3uUU85EAPrxxh" });

export default async (req, res) => {
    const payment = await mollieClient.payments.get(req.body.id)
    console.log(payment)
    res.json({status: 200})
}
