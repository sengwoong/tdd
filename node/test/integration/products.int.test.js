const request = require("supertest"); // supertest 모듈을 요청
const app = require("../../server"); // 서버를 가져옴
const newProduct = require("../data/new-product.json"); //새로운 제품 데이터를 가져옴

let firstProduct; // 첫번째 제품을 저장하는 변수

it("POST /api/products", async () => {
  // 새 제품 생성 테스트
  const response = await request(app).post("/api/products").send(newProduct); // 새 제품 생성 요청 보냄
  expect(response.statusCode).toBe(201); // 응답 상태 코드가 201(Created) 이어야 함
  expect(response.body.name).toBe(newProduct.name); // 응답으로 받은 제품 이름이 요청으로 보낸 제품 이름과 일치해야 함
  expect(response.body.description).toBe(newProduct.description); // 응답으로 받은 제품 설명이 요청으로 보낸 제품 설명과 일치해야 함
});

it("should return 500 on POST /api/products", async () => {
  // 잘못된 요청으로 인해 서버에서 에러가 발생하는 경우의 테스트
  const response = await request(app) // 잘못된 요청 보냄
    .post("/api/products")
    .send({ name: "phone" });
  expect(response.statusCode).toBe(500); // 응답 상태 코드가 500(Internal Server Error) 이어야 함
  expect(response.body).toStrictEqual({
    // 응답으로 받은 에러 메시지가 정확해야 함
    message: "Products validation failed: price: Path price is required.",
  });
});

it("GET /api/products", async () => {
  // 모든 제품 조회 테스트
  const response = await request(app).get("/api/products"); // 모든 제품 조회 요청 보냄
  expect(response.statusCode).toBe(200); // 응답 상태 코드가 200(OK) 이어야 함
  expect(Array.isArray(response.body)).toBeTruthy(); // 응답으로 받은 데이터가 배열이어야 함
  expect(response.body[0].name).toBeDefined(); // 응답으로 받은 첫번째 제품의 이름이 정의되어야 함
  expect(response.body[0].description).toBeDefined(); // 응답으로 받은 첫번째 제품의 설명이 정의되어야 함
  firstProduct = response.body[0]; // 첫번째 제품을 저장함
});

it("GET /api/product/:productId", async () => {
  // 특정 제품 조회 테스트
  const response = await request(app).get("/api/products/" + firstProduct._id); // 첫번째 제품 조회 요청 보냄
  expect(response.statusCode).toBe(200); // 응답 상태 코드가 200(OK) 이어야 함
  expect(response.body.name).toBe(firstProduct.name); // 응답으로 받은 제품 이름이 첫번째 제품의 이름과 일치해야 함
  expect(response.body.description).toBe(firstProduct.description); // 응답으로 받은 제품 설명이 첫번째 제품의 설명과 일치해야 함
});

it("GET id doenst exist /api/products/:productId", async () => {
  const response = await request(app).get(
    "/api/products/5f5cb1f145b82ecaf43e3877" // 존재하지 않는 제품 ID를 사용한 GET 요청을 보냄
  );
  expect(response.statusCode).toBe(404); // 응답 상태 코드가 404(Not Found) 이어야 함
});

it("PUT /api/products", async () => {
  const res = await request(app)
    .put("/api/products/" + firstProduct._id) // 첫번째 제품의 ID를 사용한 PUT 요청을 보냄
    .send({ name: "updated name", description: "updated desription" }); // 새로운 이름과 설명을 전달
  expect(res.statusCode).toBe(200); // 응답 상태 코드가 200(OK) 이어야 함
  expect(res.body.name).toBe("updated name"); // 응답으로 받은 제품 이름이 새로운 이름과 일치해야 함
  expect(res.body.description).toBe("updated desription"); // 응답으로 받은 제품 설명이 새로운 설명과 일치해야 함
});

it("should return 404 on PUT /api/products", async () => {
  const res = await request(app)
    .put("/api/products" + "5f5d79abdc3acb1b95e0eb99") // 존재하지 않는 제품 ID를 사용한 PUT 요청을 보냄
    .send({ name: "updated name", description: "updated desription" }); // 새로운 이름과 설명을 전달
  expect(res.statusCode).toBe(404); // 응답 상태 코드가 404(Not Found) 이어야 함
});

it("DELETE /api/products", async () => {
  const res = await request(app)
    .delete("/api/products/" + firstProduct._id) // 첫번째 제품의 ID를 사용한 DELETE 요청을 보냄
    .send();
  expect(res.statusCode).toBe(200); // 응답 상태 코드가 200(OK) 이어야 함
});

it("DELETE id doenst exist /api/products/:productId", async () => {
  const res = await request(app)
    .delete("/api/products/" + firstProduct._id) // 이미 삭제된 첫번째 제품의 ID를 사용한 DELETE 요청을 보냄
    .send();
  expect(res.statusCode).toBe(404); // 응답 상태 코드가 404(Not Found) 이어야 함
});
