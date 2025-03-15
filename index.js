const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 5000;
app.use(cors());
require('dotenv').config();
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.tdrl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db('pure-wood').collection('user');
    const productCollection = client.db('pure-wood').collection('product');

    // user releted api
    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.get('/user', async (req, res) => {
      const user = req.body;
      const result = await userCollection.find(user).toArray();
      res.send(result);
    });
    //  product releted api
    app.post('/product', async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });
    app.get('/products', async (req, res) => {
      const product = req.body;
      const result = await productCollection.find(product).toArray();
      res.send(result);
    });

    app.get('/product/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const result = await productCollection.findOne(filter)
      res.send(result);
    });
    
    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await productCollection.deleteOne(filter)
      res.send(result)
    });

    app.put('/updeat/:id', async (req, res) =>{
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const options = { upset: true };
      const updeatProduct = req.body;
      const product = {
        $set: {
          category: updeatProduct.category,
          descriptions: updeatProduct.descriptions,
          image: updeatProduct.image,
          name: updeatProduct.name,
          price: updeatProduct.price,
          price: updeatProduct.price,
          date: updeatProduct.date,
        },
      };

    })



    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (res, req) => {
  req.send('task management');
});

app.listen(port, () => {
  console.log(`task management is running ${port}`);
});
