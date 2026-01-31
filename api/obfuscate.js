export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");

    const { script } = req.body;
    
    // 1. Generate a unique ID for this script
    const scriptId = Math.random().toString(36).substring(7);

    // 2. Generate the URL that Roblox will call
    // Note: In a real production app, you would save 'script' to a database here.
    // For now, we embed it to ensure it works without a DB connection.
    const safeScript = Buffer.from(script).toString('base64');
    
    // 3. Create the Luarmor-style loadstring
    const loadstring = `loadstring(game:HttpGet("https://${req.headers.host}/api/loader?id=${safeScript}"))()`;

    return res.status(200).json({ 
        success: true, 
        id: scriptId,
        loadstring: loadstring 
    });
}
