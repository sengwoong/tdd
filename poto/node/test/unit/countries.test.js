const countriesModel = require("../../models/countries");
const httpMocks = require("node-mocks-http");

const { getCountries } = require("../../controllers/countriesController");
// getCountries 테스트
describe("Countries Controller - getCountries", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest(); // 요청 객체 생성
    res = httpMocks.createResponse(); // 응답 객체 생성
    next = jest.fn(); // next 함수 mocking
  });

  it("should retrieve all countries", async () => {
    const mockCountries = [{ name: "Country 1" }, { name: "Country 2" }]; // mocking을 위한 가짜 국가 데이터
    countriesModel.find = jest.fn().mockResolvedValue(mockCountries); // find 메소드가 mockCountries를 반환하도록 설정

    await getCountries(req, res, next); // getCountries 함수 호출

    expect(countriesModel.find).toHaveBeenCalledWith({}); // find 메소드가 빈 객체로 호출되었는지 확인
    expect(res.statusCode).toBe(200); // 응답 코드가 200인지 확인
    expect(res._getJSONData()).toEqual(mockCountries); // JSON 형식의 응답 데이터가 mockCountries와 일치하는지 확인
    expect(next).not.toHaveBeenCalled(); // next 함수가 호출되지 않았는지 확인
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error retrieving countries" }; // 에러 메시지 생성
    countriesModel.find = jest.fn().mockRejectedValue(errorMessage); // find 메소드가 에러 메시지를 반환하는 rejected Promise를 반환하도록 설정

    await getCountries(req, res, next); // getCountries 함수 호출

    expect(next).toHaveBeenCalledWith(errorMessage); // next 함수가 올바른 에러를 전달했는지 확인
  });
});
