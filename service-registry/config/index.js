const pkj = require('../package.json');
const winston = require('winston');


const { name, version } = pkj;

const getLogger = (name, version, mode) => winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'debug')
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'info')
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'fatal')
    }
};
