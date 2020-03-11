const PgInstance = require("./PgInstance");
const queries = require("./queries");

const ENTITIES = ["projects", "buildings", "apps", "entrepreneurs", "contractors", "resources"];

const action = (callback) => {
    return (req, res) => {
        let { entity } = req.params;
        if (ENTITIES.indexOf(entity) === -1)
            res.status(400).send(`The entity ${entity} was not found.`);
        else
            callback(entity, req, res);
    }
};

const _select = (entity, req, res) => {
    const query = queries.getQuery(entity, req.query);
    PgInstance.action(query).then(result => {
            let {status, message} = result;
            res.status(status).json(message);
        }
    ).catch(e => {
        console.log(e);
        res.status(500).send(e.message);
    });
};

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
            res.status(400).send(e.message)
        });
    }
};

module.exports = {
    action, _select, _create, _update, _delete
};
