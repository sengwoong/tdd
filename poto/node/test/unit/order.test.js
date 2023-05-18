// 필요한 모듈 및 의존성 가져오기
const orderMenuController = require("../../controllers/orderMenuController"); // 주문 메뉴 컨트롤러 가져오기
const orderMenuModel = require("../../models/orderMenu"); // 주문 메뉴 모델 가져오기
const httpMocks = require("node-mocks-http"); // HTTP Mocks 모듈 가져오기

// Mocking the orderMenuModel methods
orderMenuModel.find = jest.fn(); // find 메소드 mocking
orderMenuModel.create = jest.fn(); // create 메소드 mocking
orderMenuModel.findByIdAndDelete = jest.fn(); // findByIdAndDelete 메소드 mocking

// getOrderMenus 테스트
describe("Order Menu Controller - getOrderMenus", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest(); // 요청 객체 생성
    res = httpMocks.createResponse(); // 응답 객체 생성
    next = jest.fn(); // next 함수 mocking
  });

  it("should have a getOrderMenus function", () => {
    expect(typeof orderMenuController.getOrderMenus).toBe("function"); // getOrderMenus 함수가 있는지 확인
  });

  it("should call orderMenuModel.find", async () => {
    await orderMenuController.getOrderMenus(req, res, next); // getOrderMenus 함수 호출
    expect(orderMenuModel.find).toHaveBeenCalledWith({}); // orderMenuModel.find가 올바르게 호출되었는지 확인
  });

  it("should return 200 response code and all options in JSON", async () => {
    const mockOptions = [{ option: "Option 1" }, { option: "Option 2" }]; // mocking을 위한 가짜 옵션 데이터 생성
    orderMenuModel.find.mockReturnValue(mockOptions); // find 메소드가 mockOptions를 반환하도록 설정

    await orderMenuController.getOrderMenus(req, res, next); // getOrderMenus 함수 호출

    expect(res.statusCode).toBe(200); // 응답 코드가 200인지 확인
    expect(res._getJSONData()).toEqual(mockOptions); // JSON 형식의 응답 데이터가 mockOptions와 일치하는지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답이 종료되었는지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding options" }; // 에러 메시지 생성
    const rejectedPromise = Promise.reject(errorMessage); // 실패하는 Promise 생성
    orderMenuModel.find.mockReturnValue(rejectedPromise); // find 메소드가 실패하는 Promise를 반환하도록 설정

    await orderMenuController.getOrderMenus(req, res, next); // getOrderMenus 함수 호출

    expect(next).toHaveBeenCalledWith(errorMessage); // next 함수가 올바른 에러를 전달했는지 확인
  });
});
// orderMenuCreate 테스트
describe("Order Menu Controller - orderMenuCreate", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest(); // 요청 객체 생성
    res = httpMocks.createResponse(); // 응답 객체 생성
    next = jest.fn(); // next 함수 mocking
    req.body = {
      totals: {
        total: 10.99,
      },
    }; // 요청 body에 필요한 데이터 추가
  });

  it("should have an orderMenuCreate function", () => {
    expect(typeof orderMenuController.orderMenuCreate).toBe("function"); // orderMenuCreate 함수가 있는지 확인
  });

  it("should generate a random order number and create an order menu", async () => {
    const mockCreatedOrderMenu = {
      _id: "60aeb7aeb7c98d25c44c062e",
      price: 10.99,
      orderNumber: 123456,
    }; // mocking을 위한 가짜 생성된 주문 메뉴 데이터
    const randomNumber = 123456; // mocking을 위한 가짜 생성된 주문 번호
    const expectedOrder = {
      price: req.body.totals.total,
      orderNumber: randomNumber,
    }; // 예상되는 주문 객체

    Math.random = jest.fn().mockReturnValue(0.123456); // Math.random을 mocking하여 항상 0.123456을 반환하도록 설정

    orderMenuModel.create.mockReturnValue(mockCreatedOrderMenu); // create 메소드가 mockCreatedOrderMenu를 반환하도록 설정

    await orderMenuController.orderMenuCreate(req, res, next); // orderMenuCreate 함수 호출

    expect(Math.random).toHaveBeenCalled(); // Math.random이 호출되었는지 확인
    expect(orderMenuModel.create).toHaveBeenCalledWith(expectedOrder); // create 메소드가 예상되는 주문 객체로 호출되었는지 확인
    expect(res.statusCode).toBe(201); // 응답 코드가 201인지 확인
    expect(res._getJSONData()).toEqual(mockCreatedOrderMenu); // JSON 형식의 응답 데이터가 mockCreatedOrderMenu와 일치하는지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답이 종료되었는지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error creating order menu" }; // 에러 메시지 생성
    const rejectedPromise = Promise.reject(errorMessage); // 실패하는 Promise 생성
    orderMenuModel.create.mockReturnValue(rejectedPromise); // create 메소드가 실패하는 Promise를 반환하도록 설정

    await orderMenuController.orderMenuCreate(req, res, next); // orderMenuCreate 함수 호출

    expect(next).toHaveBeenCalledWith(errorMessage); // next 함수가 올바른 에러를 전달했는지 확인
  });
});

// deleteOrderMenuForId 테스트
describe("Order Menu Controller - deleteOrderMenuForId", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest(); // 요청 객체 생성
    res = httpMocks.createResponse(); // 응답 객체 생성
    next = jest.fn(); // next 함수 mocking
    req.params.productId = "60aeb7aeb7c98d25c44c062e"; // 요청 파라미터에 필요한 데이터 추가
  });

  it("should have a deleteOrderMenuForId function", () => {
    expect(typeof orderMenuController.deleteOrderMenuForId).toBe("function"); // deleteOrderMenuForId 함수가 있는지 확인
  });

  it("should call orderMenuModel.findByIdAndDelete with the correct productId", async () => {
    await orderMenuController.deleteOrderMenuForId(req, res, next); // deleteOrderMenuForId 함수 호출

    expect(orderMenuModel.findByIdAndDelete).toHaveBeenCalledWith(
      req.params.productId
    ); // findByIdAndDelete 메소드가 올바른 productId로 호출되었는지 확인
  });

  it("should return 200 response code and the deleted order menu in JSON if found", async () => {
    const mockDeletedOrderMenu = {
      _id: "60aeb7aeb7c98d25c44c062e",
      price: 10.99,
      orderNumber: 123456,
    }; // mocking을 위한 가짜 삭제된 주문 메뉴 데이터
    orderMenuModel.findByIdAndDelete.mockReturnValue(mockDeletedOrderMenu); // findByIdAndDelete 메소드가 mockDeletedOrderMenu를 반환하도록 설정

    await orderMenuController.deleteOrderMenuForId(req, res, next); // deleteOrderMenuForId 함수 호출

    expect(res.statusCode).toBe(200); // 응답 코드가 200인지 확인
    expect(res._getJSONData()).toEqual(mockDeletedOrderMenu); // JSON 형식의 응답 데이터가 mockDeletedOrderMenu와 일치하는지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답이 종료되었는지 확인
  });

  it("should return 404 response code if the order menu is not found", async () => {
    orderMenuModel.findByIdAndDelete.mockReturnValue(null); // findByIdAndDelete 메소드가 null을 반환하도록 설정

    await orderMenuController.deleteOrderMenuForId(req, res, next); // deleteOrderMenuForId 함수 호출

    expect(res.statusCode).toBe(404); // 응답 코드가 404인지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답이 종료되었는지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error deleting order menu" }; // 에러 메시지 생성
    const rejectedPromise = Promise.reject(errorMessage); // 실패하는 Promise 생성
    orderMenuModel.findByIdAndDelete.mockReturnValue(rejectedPromise); // findByIdAndDelete 메소드가 실패하는 Promise를 반환하도록 설정

    await orderMenuController.deleteOrderMenuForId(req, res, next); // deleteOrderMenuForId 함수 호출

    expect(next).toHaveBeenCalledWith(errorMessage); // next 함수가 올바른 에러를 전달했는지 확인
  });
});
