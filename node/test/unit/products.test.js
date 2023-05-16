const productController = require("../../controllers/productsController"); // Products Controller 모듈을 가져옴
const productModel = require("../../models/Product"); // Products Model 모듈을 가져옴
const httpMocks = require("node-mocks-http"); // node-mocks-http 모듈을 가져옴
const newProduct = require("../data/new-product.json"); // 새로운 제품 데이터를 가져옴
const allProducts = require("../data/all-products.json"); // 모든 제품 데이터를 가져옴

// ProductModel 메소드들에 대한 mock 함수들 생성
productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = "5diijfdsijdfhuehwufwe"; // 특정 제품의 ID
const updatedProduct = {
  name: "updated name",
  description: "updated description",
}; // 업데이트된 제품 데이터
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest(); // http 요청 객체 생성
  res = httpMocks.createResponse(); // http 응답 객체 생성
  next = jest.fn(); // next 함수 생성
});

// Products Controller Create 테스트
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct; // 요청 객체의 body 속성에 새로운 제품 데이터를 할당
  });
  it("should have a createProduct funtcion", () => {
    expect(typeof productController.createProduct).toBe("function"); // createProduct 함수가 정의되어 있는지 확인
  });
  it("should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next); // createProduct 함수를 실행
    expect(productModel.create).toBeCalledWith(newProduct); // create 함수가 새로운 제품 데이터로 호출되었는지 확인
  });
  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next); // createProduct 함수를 실행
    expect(res.statusCode).toBe(201); // 응답 객체의 상태 코드가 201(Created)인지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });
  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct); // create 함수가 새로운 제품 데이터를 반환하도록 mock 설정
    await productController.createProduct(req, res, next); // createProduct 함수를 실행
    expect(res._getJSONData()).toStrictEqual(newProduct); // 응답 객체의 JSON 데이터가 새로운 제품 데이터와 일치하는지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" }; // 에러 메시지
    const rejectedPromise = Promise.reject(errorMessage); // rejected Promise 객체 생성
    productModel.create.mockReturnValue(rejectedPromise); // create 함수가 rejected Promise 객체를 반환하도록 mock 설정
    await productController.createProduct(req, res, next); // createProduct 함수를 실행

    expect(next).toBeCalledWith(errorMessage); // next 함수가 에러 메시지와 함께 호출되었는지 확인합니다.
  });
});

describe("Product Controller Get", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe("function"); // getProducts 함수가 정의되어 있는지 확인
  });
  it("should call ProductModel.find({})", async () => {
    await productController.getProducts(req, res, next); // getProducts 함수를 실행
    expect(productModel.find).toHaveBeenCalledWith({}); // find 함수가 빈 객체로 호출되었는지 확인
  });
  it("should return 200 response", async () => {
    await productController.getProducts(req, res, next); // getProducts 함수를 실행
    expect(res.statusCode).toBe(200); // 응답 객체의 상태 코드가 200인지 확인
    expect(res._isEndCalled).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });
  it("should return json body in response", async () => {
    productModel.find.mockReturnValue(allProducts); // find 함수가 모든 제품 데이터를 반환하도록 mock 설정
    await productController.getProducts(req, res, next); // getProducts 함수를 실행
    expect(res._getJSONData()).toStrictEqual(allProducts); // 응답 객체의 JSON 데이터가 모든 제품 데이터와 일치하는지 확인
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding product data" }; // 에러 메시지
    const rejectedPromise = Promise.reject(errorMessage); // rejected Promise 객체 생성
    productModel.find.mockReturnValue(rejectedPromise); // find 함수가 rejected Promise 객체를 반환하도록 mock 설정
    await productController.getProducts(req, res, next); // getProducts 함수를 실행
    expect(next).toHaveBeenCalledWith(errorMessage); // next 함수가 에러 메시지와 함께 호출되었는지 확인
  });
});

describe("Product Controller GetById", () => {
  it("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe("function"); // getProductById 함수가 정의되어 있는지 확인
  });
  it("should call productMode.findById", async () => {
    req.params.productId = productId; // 요청 객체의 params 속성에 productId 속성을 추가하고 productId 값을 할당
    await productController.getProductById(req, res, next); // getProductById 함수를 실행
    expect(productModel.findById).toBeCalledWith(productId); // findById 함수가 productId 값으로 호출되었는지 확인
  });
  it("should return json body and reponse code 200", async () => {
    productModel.findById.mockReturnValue(newProduct); // findById 함수가 새로운 제품 데이터를 반환하도록 mock 설정
    await productController.getProductById(req, res, next); // getProductById 함수를 실행
    expect(res.statusCode).toBe(200); // 응답 객체의 상태 코드가 200인지 확인
    expect(res._getJSONData()).toStrictEqual(newProduct); // 응답 객체의 JSON 데이터가 새로운 제품 데이터와 일치하는지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });
  it("should return 404 when item doesnt exist", async () => {
    productModel.findById.mockReturnValue(null); // findById 함수가 null을 반환하도록 mock 설정
    await productController.getProductById(req, res, next); // getProductById 함수를 실행
    expect(res.statusCode).toBe(404); // 응답 객체의 상태 코드가 404인지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "error" }; // 에러 메시지
    const rejectedPromise = Promise.reject(errorMessage); // rejected Promise 객체 생성
    productModel.findById.mockReturnValue(rejectedPromise); // findById 함수가 rejected Promise 객체를 반환하도록 mock 설정
    await productController.getProductById(req, res, next); // getProductById 함수를 실행
    expect(next).toHaveBeenCalledWith(errorMessage); //  next 함수가 에러 메시지와 함께 호출되었는지 확인
  });
});

describe("Product Controller Update", () => {
  it("should have an updateProduct function", () => {
    expect(typeof productController.updateProduct).toBe("function"); // updateProduct 함수가 정의되어 있는지 확인
  });
  it("should call productMode.findByIdAndUpdate", async () => {
    req.params.productId = productId; // 요청 객체의 params 속성에 productId 속성을 추가하고 productId 값을 할당
    req.body = updatedProduct; // 요청 객체의 body 속성에 updatedProduct 속성을 추가하고 updatedProduct 값을 할당
    await productController.updateProduct(req, res, next); // updateProduct 함수를 실행
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      // findByIdAndUpdate 함수가 productId 값과 updatedProduct 값을 인자로 받아 호출되었는지 확인
      productId, // 첫 번째 인자는 productId 값
      updatedProduct, // 두 번째 인자는 updatedProduct 값
      { new: true } // 세 번째 인자는 { new: true }
    );
  });

  it("should return json body and response code 200", async () => {
    req.params.productId = productId; // 요청 객체의 params 속성에 productId 속성을 추가하고 productId 값을 할당
    req.body = updatedProduct; // 요청 객체의 body 속성에 updatedProduct 속성을 추가하고 updatedProduct 값을 할당
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct); // findByIdAndUpdate 함수가 updatedProduct 값을 반환하도록 mock 설정
    await productController.updateProduct(req, res, next); // updateProduct 함수를 실행
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
    expect(res.statusCode).toBe(200); // 응답 객체의 상태 코드가 200인지 확인
    expect(res._getJSONData()).toStrictEqual(updatedProduct); // 응답 객체의 JSON 데이터가 updatedProduct 값과 일치하는지 확인
  });

  it("should handle 404 when item doesnt exist", async () => {
    productModel.findByIdAndUpdate.mockReturnValue(null); // findByIdAndUpdate 함수가 null을 반환하도록 mock 설정
    await productController.updateProduct(req, res, next); // updateProduct 함수를 실행
    expect(res.statusCode).toBe(404); // 응답 객체의 상태 코드가 404인지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error" }; // 에러 메시지
    const rejectPromise = Promise.reject(errorMessage); // rejected Promise 객체 생성
    productModel.findByIdAndUpdate.mockReturnValue(rejectPromise); // findByIdAndUpdate 함수가 rejected Promise 객체를 반환하도록 mock 설정
    await productController.updateProduct(req, res, next); // updateProduct 함수를 실행
    expect(next).toHaveBeenCalledWith(errorMessage); //  next 함수가 에러 메시지와 함께 호출되었는지 확인
  });
});

describe("Product Controller Delete", () => {
  it("should have a deleteProduct function", () => {
    expect(typeof productController.deleteProduct).toBe("function"); // deleteProduct 함수가 정의되어 있는지 확인
  });
  it("should call ProductModel.findByIdAndDelete", async () => {
    req.params.productId = productId; // 요청 객체의 params 속성에 productId 속성을 추가하고 productId 값을 할당
    await productController.deleteProduct(req, res, next); // deleteProduct 함수를 실행
    expect(productModel.findByIdAndDelete).toBeCalledWith(productId); // findByIdAndDelete 함수가 productId 값으로 호출되었는지 확인
  });
  it("should return 200 response ", async () => {
    let deletedProduct = {
      // 삭제된 제품 데이터
      name: "deletedProduct",
      description: "it is deleted",
    };
    productModel.findByIdAndDelete.mockReturnValue(deletedProduct); // findByIdAndDelete 함수가 deletedProduct 값을 반환하도록 mock 설정
    await productController.deleteProduct(req, res, next); // deleteProduct 함수를 실행
    expect(res.statusCode).toBe(200); // 응답 객체의 상태 코드가 200인지 확인
    expect(res._getJSONData()).toStrictEqual(deletedProduct); // 응답 객체의 JSON 데이터가 deletedProduct 값과 일치하는지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });
  it("should handle 404 when item doenst exist", async () => {
    productModel.findByIdAndDelete.mockReturnValue(null); // findByIdAndDelete 함수가 null을 반환하도록 mock 설정
    await productController.deleteProduct(req, res, next); // deleteProduct 함수를 실행
    expect(res.statusCode).toBe(404); // 응답 객체의 상태 코드가 404인지 확인
    expect(res._isEndCalled()).toBeTruthy(); // 응답 객체의 _isEndCalled 메소드가 true인지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error deleting" }; // 에러 메시지
    const rejectedPromise = Promise.reject(errorMessage); // rejected Promise 객체 생성
    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise); // findByIdAndDelete 함수가 rejected Promise 객체를 반환하도록 mock 설정
    await productController.deleteProduct(req, res, next); // deleteProduct 함수를 실행
    expect(next).toHaveBeenCalledWith(errorMessage); //  next 함수가 에러 메시지와 함께 호출되었는지 확인
  });
});
