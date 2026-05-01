const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// *** ВАЖНО: путь к твоей папке music внутри public ***
const MUSIC_DIR = path.join(__dirname, 'public', 'music');

// раздача статики (HTML, CSS, JS)
app.use(express.static('public'));

// API-список всех аудиофайлов в папке
app.get('/api/songs', (req, res) => {
  if (!fs.existsSync(MUSIC_DIR)) return res.json([]);

  const allowedExtensions = [
    '.mp3', '.wav', '.ogg', '.flac', '.aac',
    '.m4a', '.wma', '.opus', '.webm', '.mid',
    '.midi', '.aiff', '.aif', '.ape', '.dsf',
    '.dff', '.mpc', '.spx', '.oga', '.amr',
    '.3gp', '.ac3', '.ec3', '.mka'
  ];

  const files = fs.readdirSync(MUSIC_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return allowedExtensions.includes(ext);
  });

  res.json(files);
});

// отдача конкретного файла по имени
app.get('/music/:name', (req, res) => {
  const file = path.join(MUSIC_DIR, req.params.name);
  res.sendFile(file);
});

// старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});