const { Pool } = require('pg');

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env.LOCAL_DATABASE_URL
});

module.exports = {
  query: (text, params, callback) => {
    if (process.env.NODE_ENV !== 'production') console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};