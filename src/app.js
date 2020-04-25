/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

class Product {
  constructor({
    code, description, buyPrice, sellPrice, tags,
  }) {
    this.id = uuid();
    this.code = code;
    this.description = description;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.tags = tags;
    this.lovers = 0;
  }
}

const products = [];

app.get('/products', (request, response) => {
  response.status(200).json(products);
});

app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
  const { code } = request.body;
  const product = new Product(request.body);

  const sameCodeProduct = products.find((obj) => obj.code == code);

  if (sameCodeProduct) {
    product.lovers = sameCodeProduct.lovers;
  }

  products.push(product);
  response.status(201).json(product);
});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const { id } = request.params;

  let product = products.find((obj) => obj.id == id);

  if (product == undefined) {
    response.status(400).send();
  } else {
    const {
      code, description, buyPrice, sellPrice, tags,
    } = request.body;

    product.code = code;
    product.description = description;
    product.buyPrice = buyPrice;
    product.sellPrice = sellPrice;
    product.tags = tags;

    response.status(200).json(product);
  }
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const { code } = request.params;
  const index = products.findIndex((obj) => obj.code == code);
  if (index == -1) {
    response.status(400).send();
  } else {
    products.splice(index, 1);
    response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam
  // o code do parâmetro
  const { code } = request.params;
  const filtered = products.filter((obj) => obj.code == code);

  filtered.map((obj) => obj.lovers += 1);

  response.status(200).json(filtered[0]);
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const { code } = request.params;
  const filtered = products.filter((obj) => obj.code == code);

  response.status(200).json(filtered);
});

export default app;
