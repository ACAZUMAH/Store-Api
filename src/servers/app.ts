import http from 'http';
import startExpressApp from './startExpressApp';
import e from 'express';

const startServer = async () => {

    const app = await startExpressApp();

    const server = http.createServer(app);

    const PORT = process.env.PORT || 3500;

    server.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    })
}

export default startServer;