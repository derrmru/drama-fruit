const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: "test_6AVPHyeQADq34cfPN3uUU85EAPrxxh" });

export default async (req, res) => {
    //after transaction is complete we receive payment ID and must query the status
    const payment = await mollieClient.payments.get(req.body.id)
    console.log(payment)
    res.status(200)
}