const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbUser, database } = require('./config');
const port = 3000;
const productsCtrl = require('./products_controller');

const connectionString = `postgres://${dbUser}@localhost/${database}`;

const app = express();

app.use(bodyParser.json());

app.use(cors());


const massiveConnection = massive(connectionString)
.then(db => {

  app.set('db', db);
})
.catch(err => {
  console.log(err);
})

app.post('/api/product', productsCtrl.create);

app.get('/api/products', productsCtrl.getAll);

app.get( '/api/product/:id', productsCtrl.getOne );
app.put( '/api/product/:id', productsCtrl.update );
app.delete( '/api/product/:id', productsCtrl.delete );


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})
