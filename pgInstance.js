const { Pool } = require("pg");

class PgInstance {
    static async action(query, params=[]) {
        try {
            let pool = new Pool({
                host: 'localhost',
                port: 5432,
                user: 'postgres',
                database: "postgres"
            });
            let queryResult = (await pool.query(query, params));
            let result = queryResult.insertId ? queryResult.insertId : queryResult.rows;
            return { status: 200, message: result };
        } catch (e) {
            return {status: 500, message: e.message};
        }
    }
}

module.exports = PgInstance;
