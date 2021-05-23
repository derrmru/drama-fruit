//firestore
import db from '../../lib/db'

export default async (req, res) => {
    //check status of transaction in firebase
    const docRef = db.collection('orders').doc(req.body.transaction_id);
    const doc = await docRef.get();
    if (doc.exists) {
        res.json(doc.data())
    }
}