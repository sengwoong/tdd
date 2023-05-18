# 문법
리엑트 테스트 문법	설명
render(<Component />)	컴포넌트를 렌더링합니다.
screen.getByRole("role", { name: "name" })	지정된 역할(role)과 이름(name)에 해당하는 요소를 찾습니다.
screen.getByText("text", { exact: false })	지정된 텍스트(text)를 포함하는 요소를 찾습니다.
screen.findByRole("role", { name: "name" })	비동기적으로 지정된 역할(role)과 이름(name)에 해당하는 요소를 찾습니다.
screen.findByTestId("test-id")	비동기적으로 지정된 테스트 ID(test-id)에 해당하는 요소를 찾습니다.
expect(value).toEqual(expectedValue)	값(value)이 예상된 값(expectedValue)과 일치하는지 확인합니다.
expect(value).toBeTruthy()	값(value)이 참(truthy)인지 확인합니다.
expect(value).toHaveLength(length)	값(value)의 길이가 예상된 길이(length)와 일치하는지 확인합니다.
userEvent.clear(inputElement)	입력 요소(inputElement)의 내용을 지웁니다.
userEvent.type(inputElement, "text")	입력 요소(inputElement)에 텍스트("text")를 입력합니다.
userEvent.click(element)	요소(element)를 클릭합니다.
server.resetHandlers(...handlers)	Mock 서버의 핸들러(handlers)를 재설정합니다.
rest.get(url, handler)	지정된 URL(url)에 대한 GET 요청에 대한 핸들러(handler)를 생성합니다.
act(callback)	비동기적인 동작(callback)을 수행합니다.
cleanup()	테스트를 정리하고 메모리 누수를 방지합니다.
describe("description", () => { ... })	테스트 스위트를 생성하고 테스트들을 그룹화합니다.
test("description", () => { ... })	테스트 케이스를 정의합니다.
위의 코드에서 사용된 Jest 테스트 문법을 표로 정리해보았습니다. 이 표는 주어진 코드에 사용된 테스트 문법들의 예시이며, Jest의 다양한 테스트 문법이 더 있을 수 있습니다. Jest 문서(https://jestjs.io/docs)를 참조하여 더 자세한 정보를 얻을 수 있습니다.



노드 테스트 케이스	설명
const	상수를 선언하는 JavaScript 키워드입니다. 변수에 할당된 값은 변경할 수 없습니다.
require	Node.js에서 모듈을 가져오는 함수로, 다른 파일에서 해당 모듈을 사용할 수 있게 합니다.
orderMenuController	주문 메뉴와 관련된 기능을 제어하는 컨트롤러 객체입니다.
orderMenuModel	주문 메뉴와 관련된 데이터를 다루는 데이터베이스 모델 객체입니다.
httpMocks	Node.js HTTP 요청과 응답을 테스트하기 위한 Mock 객체를 생성하는 라이브러리입니다.
node-mocks-http	Node.js의 HTTP 모듈을 모킹하기 위해 사용되는 라이브러리입니다.
jest.fn()	Jest 테스트 프레임워크에서 함수를 모킹하기 위해 사용되는 함수입니다.
describe	테스트 스위트를 정의하는 Jest의 함수입니다. 테스트 케이스들을 그룹화합니다.
beforeEach	각 테스트 케이스 실행 전에 특정 코드를 실행하는 Jest의 함수입니다.
it	테스트 케이스를 정의하는 Jest의 함수입니다. 테스트할 기능이나 동작을 설명합니다.
expect	예상 결과를 검증하는 Jest의 함수입니다.
toBe	expect 함수와 함께 사용되어 값을 비교하는 함수입니다. 두 값이 일치하는지 확인합니다.
toHaveBeenCalledWith	expect 함수와 함께 사용되어 함수가 특정 매개변수와 함께 호출되었는지 확인합니다.
mockReturnValue	mocking된 함수가 호출될 때 반환할 값을 설정하는 함수입니다.
await	비동기 함수에서 Promise가 완료될 때까지 기다리기 위해 사용되는 키워드입니다.
Promise.reject	거부된 상태인 Promise 객체를 생성하는 함수입니다.
Math.random	0과 1 사이의 난수를 생성하는 JavaScript의 메소드입니다.
httpMocks.createRequest	httpMocks 라이브러리에서 요청 객체를 생성하는 함수입니다.
httpMocks.createResponse	httpMocks 라이브러리에서 응답 객체를 생성하는 함수입니다.
orderMenuModel.find	orderMenuModel의 메소드로, 주어진 조건에 맞는 주문 메뉴를 조회하는 함수입니다.
orderMenuModel.create	orderMenuModel의 메소드로, 새로운 주문 메뉴를 생성하는 함수입니다.
orderMenuModel.findByIdAndDelete	orderMenuModel의 메소드로, 주어진 ID에 해당하는 주문 메뉴를 삭제하는 함수입니다.
next	다음 미들웨어 함수를 호출하기 위한 매개변수로 사용되는 함수입니다.
req	HTTP 요청 객체를 나타내는 변수입니다.
res	HTTP 응답 객체를 나타내는 변수입니다.
req.body	HTTP 요청 객체에서 요청 본문 데이터를 나타내는 속성입니다.
req.params.productId	HTTP 요청 객체에서 URL 매개변수를 나타내는 속성입니다.
