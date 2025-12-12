require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cardRoutes = require('./src/routes/cardRoutes');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');
const { getApiInfo } = require('./src/controllers/cardController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

app.use('/api/cards', cardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
    });
};

if (require.main === module) {
    startServer();
}

module.exports = app;