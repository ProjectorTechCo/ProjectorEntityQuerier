const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const genericEntity = require('./generic_entity');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger);

app.get('/:entity', genericEntity.action(genericEntity._select));
app.post('/:entity', genericEntity.action(genericEntity._create));
app.put('/:entity', genericEntity.action(genericEntity._update));
app.delete('/:entity', genericEntity.action(genericEntity._delete));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
