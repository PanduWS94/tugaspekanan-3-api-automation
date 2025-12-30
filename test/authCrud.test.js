const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

// Base URL for the dummyjson API
const BASE_URL = "https://dummyjson.com";

describe("AUTH CRUD API Tests", () => {
  let token = "";
  let createdResourceId;

  before((done) => {
    // Simulate login to get token
    chai
      .request(BASE_URL)
      .post("/auth/login")
      .send({ username: "testuser", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      });
  });

  it("should CREATE a new resource", (done) => {
    chai
      .request(BASE_URL)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Product", description: "This is a test product", price: 99.99 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id");
        createdResourceId = res.body.id;
        done();
      });
  });

  it("should READ an existing resource", (done) => {
    chai
      .request(BASE_URL)
      .get(`/products/${createdResourceId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id", createdResourceId);
        done();
      });
  });

  it("should UPDATE an existing resource", (done) => {
    chai
      .request(BASE_URL)
      .put(`/products/${createdResourceId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 79.99 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("price", 79.99);
        done();
      });
  });

  it("should DELETE an existing resource", (done) => {
    chai
      .request(BASE_URL)
      .delete(`/products/${createdResourceId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});