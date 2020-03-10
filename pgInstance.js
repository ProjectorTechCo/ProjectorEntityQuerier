const { Pool } = require("pg");
const pgConfig = require('./config').postgres;

class PgInstance {
    static async action(query, params=[]) {
        try {
            let pool = new Pool(pgConfig);
            let queryResult = (await pool.query(query, params));
            let result = queryResult.insertId ? queryResult.insertId : queryResult.rows;
            return { status: 200, message: result };
        } catch (e) {
            return {status: 500, message: e.message};
        }
    }
}

module.exports = PgInstance;
