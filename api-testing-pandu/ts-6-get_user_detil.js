import supertest from 'supertest';
import { expect } from 'chai';
import fs from 'fs';

const apiURL = 'https://kasir-api.belajarqa.com';
const request = supertest(apiURL);
const loginResponse = JSON.parse(fs.readFileSync('../tugaspekanan-3-api-automation/Environment/responselogin.json', 'utf-8'));
const accessToken = loginResponse.data.accessToken;
const user = JSON.parse(fs.readFileSync('../tugaspekanan-3-api-automation/Environment/userid.json', 'utf-8'));
const userId = user.data.userId;

describe('API Get User detil Tests', () => {
  it('TC-010_harus berhasil get user dan mendapat response 200', async () => {
    const response = await request.get(`/users/${userId}`)
                                  .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).to.equal(200);
    expect(response.text).to.include('success');
  }).timeout(2000);
});