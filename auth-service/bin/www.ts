import http from 'http';
import axios from 'axios';
import application from '../app';
import { unhandledErrorLogger } from '../utils';

process
    .on('unhandledRejection', (error, p) => {
        unhandledErrorLogger(error, p);
    })
    .on('uncaughtException', (error) => {
        unhandledErrorLogger(error);
        process.exit(1);
    });

const app = application();

const server = http.createServer(app);

server.listen(0);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const addr: any = server.address();
    const bind =
        typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;

    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr: any = server.address();
    const bind =
        typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    const registerService = () =>
        axios.put(
            `http://localhost:3000/register/${'auth-service'}/${'1.0.0'}/${
                addr.port
            }`
        );
    const unregisterService = () =>
        axios.delete(
            `http://localhost:3000/register/${'auth-service'}/${'1.0.0'}/${
                addr.port
            }`
        );
    registerService();
    const interval = setInterval(registerService, 20000);

    const cleanup = async () => {
        clearInterval(interval);
        await unregisterService();
    };

    process
        .on('unhandledRejection', async (error, p) => {
            unhandledErrorLogger(error, p);
        })
        .on('uncaughtException', async (error) => {
            unhandledErrorLogger(error);
            await cleanup();
            process.exit(1);
        })
        .on('SIGINT', async () => {
            await cleanup();
            process.exit(0);
        })
        .on('SIGTERM', async () => {
            await cleanup();
            process.exit(0);
        });
}
