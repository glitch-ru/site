const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Путь к вашему JSON файлу
const FILE_PATH = './articles.json';

app.post('/save-article', (req, res) => {
    const newArticle = req.body;

    // Читаем текущий файл
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let articles = [];
        if (!err && data) {
            articles = JSON.parse(data);
        }

        // Добавляем новую статью
        articles.push(newArticle);

        // Записываем обратно
        fs.writeFile(FILE_PATH, JSON.stringify(articles, null, 2), (err) => {
            if (err) return res.status(500).send('Ошибка записи');
            res.send({ status: 'success' });
        });
    });
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));
