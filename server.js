const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running');
});

const MUSIC_DIR = path.join(__dirname, 'music');

// подключаем сайт
app.use(express.static('public'));

// список треков
app.get('/api/songs', (req, res) => {
  if (!fs.existsSync(MUSIC_DIR)) return res.json([]);

  const files = fs.readdirSync(MUSIC_DIR).filter(f =>
    f.endsWith('.mp3') ||
    f.endsWith('.flac') ||
    f.endsWith('.m4a')
  );

  res.json(files);
});

// отдача музыки
app.get('/music/:name', (req, res) => {
  const file = path.join(MUSIC_DIR, req.params.name);
  res.sendFile(file);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});