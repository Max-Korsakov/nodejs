const http = require('http');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();

const service = require('../server/service')(config);

const server = http.createServer(service);

server.listen(process.env.PORT || 3000);

server.on('listening', () => {
    log.info(
        `Server listen in ${service.get('env')} on ${server.address().port}`
    );
});
