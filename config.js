const axios = require("axios");

class Config {
    constructor(serviceName) {
        this.config = {
            "dev": "http://localhost:7200/",
            "prod": ""
        };
        this.serviceName = serviceName;
    }

    async fetchConfig(env=process.env.NODE_ENV) {
        let params = {
            env: env || "dev",
            service: this.serviceName
        };
        return axios.get(this.config[env || "dev"] + "config", {params});
    };

    async getConfig() {
        if (!this.fullConfig) {
            this.fullConfig = (await this.fetchConfig()).data;
        }
        return this.fullConfig;
    }
}

let config = new Config("entityQuerier");

module.exports = config;