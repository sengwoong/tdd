const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

let firstProduct;
it("POST /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "phone" });
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({});
});

it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /api/product/:productId", async () => {
  const response = await request(app).get("/api/products/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("GET id doenst exist /api/products/:productId", async () => {
  const response = await request(app).get(
    "/api/products/5f5cb1f145b82ecaf43e3877"
  );
  expect(response.statusCode).toBe(404);
});

it("PUT /api/products", async () => {
  const res = await request(app)
    .put("/api/products/" + firstProduct._id)
    .send({ name: "updated name", description: "updated desription" });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated name");
  expect(res.body.description).toBe("updated desription");
});

it("should return 404 on PUT /api/products", async () => {
  const res = await request(app)
    .put("/api/products" + "5f5d79abdc3acb1b95e0eb99")
    .send({ name: "updated name", description: "updated desription" });
  expect(res.statusCode).toBe(404);
});

it("DELETE /api/products", async () => {
  const res = await request(app)
    .delete("/api/products/" + firstProduct._id)
    .send();
  expect(res.statusCode).toBe(200);
});

it("DELETE id doenst exist /api/products/:productId", async () => {
  const res = await request(app)
    .delete("/api/products/" + firstProduct._id)
    .send();
  expect(res.statusCode).toBe(404);
});
