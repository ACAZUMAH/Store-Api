const connectDB = require('./dist/models/db.js').default;
const jsonProducts = require('./src/models/data.json');
const products = require('./dist/models/products.js').default
require('dotenv').config();

const url = process.env.DATABASE_URL;

const start = async() =>{
    try {
        if(url){
            await connectDB(url)
            //await products.deleteMany({})
            await products.insertMany(jsonProducts)
            console.log('Data imported')
        }
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start();