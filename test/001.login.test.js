import supertest from 'supertest';
import { expect } from 'chai';
import fs from 'fs';

const apiURL = 'https://dummyjson.com';
const request = supertest(apiURL);
const loginData = JSON.parse(fs.readFileSync('../mochachai-demo-panduws94/Environment/akunadmin.json', 'utf-8'))
const loginCredentials = {
  username: loginData.username,
  password: loginData.password
};
const response = await request.post('/auth/login')
  .send(loginCredentials);

describe('API Login Tests', () => {
  it('TC-001_harus berhasil login dan mengembalikan respon kode 201', async () => {
    expect(response.status).to.equal(200);
    fs.writeFileSync('../mochachai-demo-panduws94/Environment/responselogin.json', JSON.stringify(response.body));
  }).timeout(2000);

  it('TC-002_harus ada redaksi "Authentication berhasil ditambahkan" pada text response', async () => {
    expect(response.text).to.include('accessToken');
  }).timeout(2000);
});