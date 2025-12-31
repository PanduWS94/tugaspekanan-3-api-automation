import supertest from 'supertest';
import { expect } from 'chai';

const apiURL = 'https://dummyjson.com';
const request = supertest(apiURL);
const response = await request.get('/products/1')

describe('API Get All Product', () => {
  it('TC-006_harus berhasil mendapatkan list product dan mendapat response 200', async () => {
    expect(response.status).to.equal(200);

  }).timeout(2000);

  it('TC-007_harus berhasil mendapatkan response "title"', async () => {
    expect(response.text).to.include('Essence Mascara Lash Princess');
  }).timeout(2000);
});