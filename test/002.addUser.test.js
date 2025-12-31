import supertest from 'supertest';
import { expect } from 'chai';
import fs from 'fs';

const apiURL = 'https://dummyjson.com';
const request = supertest(apiURL);


describe('API Add User Tests', () => {
  it('TC-003_harus berhasil add user baru, mengembalikan respon kode 201', async () => {
    const newUser = {
      "firstName": "Pandu",
      "lastName": "Wibisono",
      "age": 31
    };
    const response = await request.post('/users/add')
      .send(newUser);

    expect(response.status).to.equal(201);
    expect(response.text).to.include('id');
    fs.writeFileSync('../mochachai-demo-panduws94/Environment/userid.json', JSON.stringify(response.body));
  }).timeout(2000);
});