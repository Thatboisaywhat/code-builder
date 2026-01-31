export default function handler(req, res) {
    const { id } = req.query; // 'id' contains the base64 script
    
    try {
        const decoded = Buffer.from(id, 'base64').toString('utf-8');
        res.status(200).send(decoded);
    } catch(e) {
        res.status(500).send("print('Error loading script')");
    }
}
