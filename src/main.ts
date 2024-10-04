import { config } from "dotenv";

const main = async () => {
    config();
    const start = await import('./servers/app');
    start.default();
}

main().catch(
    err => console.error('unable to start server')
)