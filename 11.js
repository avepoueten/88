const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/fetch-data', async (req, res) => {
    try {
        // استخراج IP الخاص بالمستخدم
        let userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // في حالة كون IP ليس مباشرًا، يمكن جلب الدولة عبر API خارجية
        let countryCode = "US"; // افتراضيًا
        try {
            const geoData = await axios.get(`http://ip-api.com/json/${userIP}`);
            countryCode = geoData.data.countryCode || "US";
        } catch (geoError) {
            console.warn("⚠️ فشل تحديد الدولة، سيتم استخدام الدولة الافتراضية.");
        }

        // جلب العروض بناءً على دولة المستخدم
        const response = await axios.get(`https://d30xmmta1avvoi.cloudfront.net/public/offers/feed.php?user_id=623653&api_key=53a51765794004fddca13d5f0c689224&s1=${countryCode}`);

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
