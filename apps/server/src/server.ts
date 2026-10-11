import { Server } from 'node:http';
import mongoose from 'mongoose';
import config from '@/config';
import app from '@/app';

let server: Server | undefined;
let shuttingDown = false;

async function shutdown(exitCode: number) {
    if (shuttingDown) return;
    shuttingDown = true;
    const timeout = setTimeout(() => process.exit(1), 10_000);
    timeout.unref();
    try {
        if (server)
            await new Promise<void>((resolve, reject) => {
                server!.close((error) => (error ? reject(error) : resolve()));
            });
        await mongoose.disconnect();
        process.exit(exitCode);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

async function main() {
    try {
        await mongoose.connect(config.database_url);
        server = app.listen(config.port, () => {
            console.log(`API listening on port ${config.port}`);
        });
        server.on('error', (error) => {
            console.error(error);
            void shutdown(1);
        });
    } catch (error) {
        console.error(error);
        await shutdown(1);
    }
}

process.on('SIGINT', () => void shutdown(0));
process.on('SIGTERM', () => void shutdown(0));
process.on('unhandledRejection', (error) => {
    console.error(error);
    void shutdown(1);
});
process.on('uncaughtException', (error) => {
    console.error(error);
    void shutdown(1);
});

void main();
