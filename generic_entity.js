const PgInstance = require("./PgInstance");
const queries = require("./queries");

const ENTITIES = ["projects"];

const action = (callback) => {
    return (req, res) => {
        let { entity } = req.params;
        if (ENTITIES.indexOf(entity) === -1)
            res.status(400).send(`The entity ${entity} was not found.`);
        else
            callback(entity, req, res);
    }
}

const _select = (entity, req, res) => {
    PgInstance.action(`SELECT * FROM comp_${entity}`).then(result => {
            let {status, message} = result;
            res.status(status).json(message);
        }
    ).catch(e => {
        console.log(e);
        res.status(500).send("Server error");
    });
};

const selectAll = (param) => {
    return (req, res) => {
        let argument = req.params[param];
        let query = `SELECT * FROM ${this.entity}`;
        if (argument)
            query += ` WHERE ${param} = ${argument}`;
        PgInstance.action(query).then(result => {
                let {status, message} = result;
                res.status(status).json(message);
            }
        ).catch(e => {
            console.log(e);
        });
    }
};

const _selectByCondition = (entity, req, res) => {};
const _create = (entity, req, res) => {};
const _update = () => {};

const _delete = (param) =>
{
    return (req, res) => {
        let argument = req.params[param];
        PgInstance.action(`DELETE FROM ${this.entity} WHERE ${param} = ${argument}`).then(result => {
                let {status, message} = result;
                res.status(status).json(message);
            }
        ).catch(e => {
            console.log(e);
        });
        res.status(200).json({})
    }
};

module.exports = {
    action, _select
};
