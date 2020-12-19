import winston from "winston";

const [name, version] = ["a", "b"];

const getLogger = () =>
    winston.createLogger({
        transports: [new winston.transports.Console()]
    });

export const config = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger()
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger()
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger()
    }
};
