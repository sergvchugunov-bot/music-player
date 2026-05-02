const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статики (сайт)
app.use(express.static(path.join(__dirname, 'public')));

// Прокси для обхода CORS Google Диска
app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('URL is required');
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        if (!response.ok) return res.status(502).send('Upstream error');
        res.setHeader('Content-Type', response.headers.get('content-type'));
        response.body.pipe(res);
    } catch (e) {
        res.status(500).send('Proxy error');
    }
});

// Запуск
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
