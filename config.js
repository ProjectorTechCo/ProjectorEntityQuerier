const config = {
    "dev": {
        "postgres": {
            host: "localhost",
            port: 5432,
            user: 'postgres',
            database: 'postgres'
        }
    },
    "prod": {}
};

module.exports = config[process.env.NODE_ENV] || config["dev"];