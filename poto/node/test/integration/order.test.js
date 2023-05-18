const request = require("supertest");
const app = require("../../server");
const orderMenuModel = require("../../models/orderMenu");
const neworderMenuModel = require("../data/order.json");

describe("Order API", () => {
  const PORT = 4001; // 사용할 포트 번호로 수정해주세요
  beforeAll(async () => {
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await server.close();
  });

  it("should get all order menus", async () => {
    const response = await request(app).get("/order");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should create an order menu", async () => {
    const mockOrder = { price: 100, orderNumber: expect.any(Number) };
    orderMenuModel.create = jest.fn().mockResolvedValue("createdOrderMenu");

    const response = await request(app)
      .post("/order")
      .send({ totals: { total: 100 } })
      .expect(201);

    expect(orderMenuModel.create).toHaveBeenCalledWith(mockOrder);
    expect(response.body).toEqual("createdOrderMenu");
  });

  it("should delete an order menu", async () => {
    const mockDeletedOrder = { _id: "12345", name: "Order Menu 1" }; // 삭제된 주문 메뉴의 예시로 수정해야 합니다.
    orderMenuModel.findByIdAndDelete = jest
      .fn()
      .mockResolvedValue(mockDeletedOrder);

    const response = await request(app).delete("/order/12345").expect(200);

    expect(orderMenuModel.findByIdAndDelete).toHaveBeenCalledWith("12345");
    expect(response.body).toEqual(mockDeletedOrder);
  });

  it("should return 404 if order menu is not found", async () => {
    orderMenuModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const response = await request(app).delete("/order/12345").expect(404);

    expect(orderMenuModel.findByIdAndDelete).toHaveBeenCalledWith("12345");
    expect(response.body).toEqual({});
  });
});

describe("Order API", () => {
  it("should get all order menus", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("Order API", () => {
  it("should get all order menus", async () => {
    const response = await request(app).get("/options");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });
});
