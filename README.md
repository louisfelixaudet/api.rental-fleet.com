# api.rental-fleet.com 
Node.js and MariaDB API project for CRUD (Data-Centric) and RPC (Business-Centric) operations. 

## Prerequisites
- Node.js v24+
- npm v11+
- MariaDB v10+

## Installation
```cmd
git clone [URL du dépôt]
cd  [chemin du répertoire]
npm install
```

## Environment Variables
Copy `.env.example` to `.env` and fill in the values:

| Variable     | Description        | Example    |
|--------------|--------------------|------------|
| DB_HOST      | Database host      | localhost  |
| DB_PORT      | Database port      | 3307       |
| DB_USER      | Database user      | root       |
| DB_PASSWORD  | Database password  | secret     |
| DB_NAME      | Database name      | mydb       |
| JWT_SECRET         | JWT bearer token   | randomBytes(32) |
| JWT_REFRESH_SECRET | JWT bearer token   | randomBytes(32) |

## Running the App
```cmd
npm start # Production
npm run dev # Development
```

## Project Structure
```
src/
    controllers/
    middlewares/
    routes/
    utils/
    views/
    index.js
```

## License
MIT