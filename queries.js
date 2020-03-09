const schemaConfig = require('./schemaConfig');

const getFullTextQuery = (entity, text, operator="and") => {
    return `SELECT * FROM ${entity} WHERE to_tsvector('simple', ` +
    `${getColumnsConcat(entity, Object.keys(schemaConfig[entity]))}) @@ to_tsquery('simple', ` +
    `'${getParsedSearchText(text, operator)}')`;
};

const getColumnsConcat = (entity, columns) => {
    return columns.map(c => `coalesce(${getColumnType(entity, c)}, '')`).join(" || ' ' || ");
};

const getColumnType = (entity, column) => {
    if (schemaConfig[entity][column] === Date) {
        return `to_char(${column}, 'MM-DD-YYYY HH24:MI:SS')`;
    } else {
        return `${column}::TEXT`;
    }
}

const getParsedSearchText = (text, opertor) => {
    return text.split(' ').join(` ${opertor === 'and' ? '&' : '|'} `);
};

module.exports = {
    getFullTextQuery
};