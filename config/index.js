require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    Cors: process.env.CORS,
    DbUser: process.env.DB_USER,
    DbPassword: process.env.DB_PASSWORD,
    DbHost: process.env.DB_HOST,
    DbName: process.env.DB_NAME
}

module.exports = { config };