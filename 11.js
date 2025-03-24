const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // السماح بالطلبات من أي نطاق

app.get('/fetch-data', async (req, res) => {
    try {
        const response = await axios.get(`https://d30xmmta1avvoi.cloudfront.net/public/offers/feed.php?user_id=623653&api_key=53a51765794004fddca13d5f0c689224&s1=&s2=`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
