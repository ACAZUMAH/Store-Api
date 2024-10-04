import http from 'http';
import startExpressApp from './startExpressApp';
import connectDB from '../models/db';

const startServer = async () => {

    await connectDB(process.env.DATABASE_URL as string);

    const app = await startExpressApp();

    const server = http.createServer(app);

    const PORT = process.env.PORT || 3500;

    server.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    })
}

export default startServer;