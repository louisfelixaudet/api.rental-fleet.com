import { createPool } from 'mariadb';
import { DB_CONFIG } from '#configs';

const pool = createPool({
     host: DB_CONFIG.DB_HOST,
     port: DB_CONFIG.DB_PORT, 
     user: DB_CONFIG.DB_USER, 
     password: DB_CONFIG.DB_PASSWORD,
     database: DB_CONFIG.DB_NAME,
     
     bigIntAsNumber: true,
     namedPlaceholders: true, // Required to use :name syntax

     // --- Pool Specific Settings ---
     connectionLimit: 10,      // Max number of connections to hold
     acquireTimeout: 10000,    // Wait 10s for a connection before failing
     idleTimeout: 30000,       // Close connections idle for 30s
     minimumIdleWeight: 1      // Keep at least 1 connection alive
});

export default pool;