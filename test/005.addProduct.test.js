import supertest from 'supertest';
import { expect } from 'chai';

const apiURL = 'https://dummyjson.com';
const request = supertest(apiURL);
const newProduct = {
  "title": "Kijang Kapsul"
};
const response = await request.post('/product/add')
  .send(newProduct);

describe('API Add Product', () => {
  it('TC-008_harus berhasil add product dan mendapat response 201', async () => {
    expect(response.status).to.equal(201);
  }).timeout(2000);

  it('TC-009_harus berhasil mendapatkan response "title"', async () => {
    expect(response.text).to.include('Kijang Kapsul');
  }).timeout(2000);
});