const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000

// midleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wpflsxi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try{
        app.get('/products', async(req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            
            const productsCollection = client.db('emaJhon').collection('products');
            const query = {}
            const cursor = productsCollection.find(query);
            const products = await cursor.skip(size * page).limit(size).toArray();
            const count = await productsCollection.estimatedDocumentCount()
            res.send({count, products})
        })
    }
    finally{

    }
}

run().catch(err=> console.log(err))


app.get('/', (req, res) => {
    res.send('Ema jhon server is running...')
})

app.listen(port, () => {
    console.log(`ema jhon port: ${port}`)
})