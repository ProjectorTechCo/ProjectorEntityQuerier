const { Pool } = require("pg");
const config = require('./config');

class PgInstance {
    static async action(query, params=[]) {
        try {
            let currentConfig = await config.getConfig();
            let pool = new Pool(currentConfig.postgres);
            let queryResult = (await pool.query(query, params));
            let result = queryResult.insertId ? queryResult.insertId : queryResult.rows;
            return { status: 200, message: result };
        } catch (e) {
            return {status: 500, message: e.message};
        }
    }
}

module.exports = PgInstance;
