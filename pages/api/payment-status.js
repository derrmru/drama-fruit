const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: "test_6AVPHyeQADq34cfPN3uUU85EAPrxxh" });

export default async (req, res) => {
    console.log(req.id)
    res.json({status: 200})
}
