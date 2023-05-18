
다음 아래와 같은 툴을 사용하겨 개발 하였습니다<br>
![image](https://github.com/sengwoong/tdd/assets/92924243/8e4b5399-ed48-436c-9740-7c046fbfb5a7)

<br>
총프로젝트 기간 2일 문서작성 1일..? [놀랍게도 몽고스 디비저장할떄 네이밍에s를 붙여야한다에 10시간이상걸렸습니다.]<br>
(poto 파일에 몽고디비 crud 리엑트)<br>
미니프로젝트라 기간을 짧게잡았습니다.<br>
다음 강의를 보고 공부하였습니다.<br>
리엑트 너무 하드코딩이라서 구조를 리펙토링하였습니다.<br>


![image](https://github.com/sengwoong/tdd/assets/92924243/f6aacd3c-efb1-4c5f-b6e4-47f714414046)
강의만 300만원 정도 봤습니다.<br>
참고로 강사느 카카오톡 신입교육 담당<br>
아래는 정리한블로그13개포스팅 뷰테스팅 이후에 오랜만에 jest를 사용해보네요<br>
https://blog.naver.com/dogfooddragon <br>
https://blog.naver.com/djsdjdyd123/223102799481


<br>노드파일기준 테스트<br>
![image](https://github.com/sengwoong/tdd/assets/92924243/0e8132f4-ef36-4c65-9339-57c98408fd19)
<br>
라우터 파일 및 컨트롤러로 구별해 두었습니다.<br>
![image](https://github.com/sengwoong/tdd/assets/92924243/a1255a3b-47ef-41b8-843f-ccdb6f16648d)
<br> 
<br>
<br>
너무하드코더라서 일부분 고쳐서 사용합니다 일단 라우터들 밖으로 뺏습니다.
<br>
참고로 컴포넌트안만들고 일짜로 쭉 코딩한것을 분리하고 서버로 뺴고 중복코드가돼서 저기로 보냅니다.
<br>
(원래 서버랑 같이두면안돼는건 압니다.)
<br>
위치도 많이 이동시켰습니다. 리엑트가 처음이면 이폴더보고 예전강의보면 못볼수도 있을것같아요
<br>
![image](https://github.com/sengwoong/tdd/assets/92924243/64575a81-678b-4c32-a848-da74dfe7529a)
가격개산 코드분리는 엄청잘해둔것같습니다<br> 
그렇지만 계산이너무 단순해서 리펙토링했습니다. 백엔드에서 어뎁터 패턴사용해서 좀더 유연하게 설계해야할것같은데 테스트를 해야해서 나뚭니다.<br>
```
const pricePerItem = {
  products: {
    America: 1000,
    England: 2000,
    Germany: 1500,
    Portland: 1700,
  },
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) {
  let subtotal = 0;

  if (orderType === "products") {
    for (const [country, count] of orderCounts[orderType]) {
      subtotal += count * pricePerItem[orderType][country];
    }
  } else if (orderType === "options") {
    for (const [option, count] of orderCounts[orderType]) {
      subtotal += count * pricePerItem[orderType];
    }
  }

  return subtotal;
}
```





테스트문법 정리 블로그 (저작권 문제로 락걸었지만 500포스트 넘습니다.) 
<br><br>
https://blog.naver.com/djsdjdyd123?Redirect=Update&logNo=223105256730


<br>
코딩은 에러를 잡는기술 이라더니 온동네 에러에만 20시간 이상보내고
<br>
(몽고디비 10시간 jest 바벨설정[최근바뀜] 10) 실제로 코드는 4~5시간 만지네요
<br>
jest관련해서 강의랑 다르게 오류가 많이날겁니다 일단 엑시오스 가 업데이트돼면서 jest에서 충돌나는것을 막는방법입니다 <br><br>


![image](https://github.com/sengwoong/tdd/assets/92924243/1513baf0-be3d-4bbd-99ec-9516d4fa1a32)


<br>
바벨이랑 설정도 바꿔야합니다.
<br>
<br>

![image](https://github.com/sengwoong/tdd/assets/92924243/04666f55-fa5a-49f3-a200-23376a732acf)
https://junhyunny.github.io/react/jest/module-import-error-on-jest/
<br>


이렇게하고 기존에 바벨이랑 위 깃처럼 설정하면됍니다.
<br>
<br>
<br>
msw쓰레
```
  "devDependencies": {
    "@babel/core": "^7.21.8",
    "@babel/preset-env": "^7.21.5",
    "babel-jest": "^29.5.0",
    "eslint-plugin-jest-dom": "^4.0.3",
    "eslint-plugin-testing-library": "^5.11.0",
    "jest": "^27.5.1",
    "test-utils": "^1.1.1"
  }
  ```
  <br>
  <br>
  추가<br>
  에니메이션 메뉴바만들고 튑니다<br>
  (더만들면 2일넘을것같아요)<br>
  <br>
  
  ![image](https://github.com/sengwoong/tdd/assets/92924243/9092421d-e8c0-437d-a03a-927415be3027)
  
  
  ```
  setupServer와 MockAdapter는 둘 다 API 요청을 가로채고 응답을 제어하는 데 사용되는 도구입니다. 하지만 그들은 서로 다른 라이브러리이며 목적과 사용법이 다릅니다.

setupServer는 msw (Mock Service Worker) 라이브러리에 포함된 도구입니다. msw는 브라우저나 Node.js에서 API 요청을 가로채고 가짜 응답을 제공하는 목 서버를 설정하는 데 사용됩니다. setupServer를 사용하여 목 서버를 구성하고, msw를 활성화하여 테스트 중에 실제 API 요청을 가로챌 수 있습니다.

예를 들어, 테스트에서 setupServer를 사용하여 가짜 응답을 설정할 수 있습니다:

javascript
Copy code
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/viewOrder', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ /* 응답 데이터 */ })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

it('should handle successful order completion', async () => {
  // orderCompleted 함수 호출 및 기대값 설정

  // 테스트 수행
});
MockAdapter는 axios 라이브러리와 함께 사용되는 도구입니다. axios는 HTTP 요청을 처리하는 클라이언트 라이브러리이며, MockAdapter는 axios의 인스턴스를 가로채고 가짜 응답을 설정하여 API 요청을 테스트하는 데 사용됩니다.

예를 들어, MockAdapter를 사용하여 가짜 응답을 설정할 수 있습니다:

javascript
Copy code
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

mockAxios.onGet('/api/viewOrder').reply(200, { /* 응답 데이터 */ });

it('should handle successful order completion', async () => {
  // orderCompleted 함수 호출 및 기대값 설정

  // 테스트 수행
});
따라서 setupServer와 MockAdapter는 다른 라이브러리에 속하며, 각각 msw와 axios와 함께 사용되는 도구입니다. setupServer는 목 서버를 설정하고 가짜 응답을 제공하는 데 사용되는 반면, MockAdapter는 axios를 가로채고 가짜 응답을 제공하여 API 요청을 테스트하는 데 사용됩니다.
  ```

