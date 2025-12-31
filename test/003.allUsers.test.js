import supertest from 'supertest';
import { expect } from 'chai';

const apiURL = 'https://dummyjson.com';
const request = supertest(apiURL);
const response = await request.get('/users?limit=200')

describe('API Get All User', () => {
  it('TC-004_harus berhasil mendapatkan list user dan mendapat response 200', async () => {
    expect(response.status).to.equal(200);

  }).timeout(2000);

  it('TC-005_harus berhasil mendapatkan response "success"', async () => {
    expect(response.text).to.include('Emily');
  }).timeout(2000);
});