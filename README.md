
다음 아래와 같은 툴을 사용하겨 개발 하였습니다<br>
\![image](https://github.com/sengwoong/tdd/assets/92924243/8e4b5399-ed48-436c-9740-7c046fbfb5a7)

<br>
총프로젝트 기간 2일 문서작성 1일..? [놀랍게도 몽고스 디비저장할떄 네이밍에s를 붙여야한다에 10시간이상걸렸습니다.]<br>
(poto 파일에 몽고디비 crud 리엑트)<br>
미니프로젝트라 기간을 짧게잡았습니다.<br>
다음 강의를 보고 공부하였습니다.<br>
리엑트 너무 하드코딩이라서 구조를 리펙토링하였습니다.<br>


![image](https://github.com/sengwoong/tdd/assets/92924243/f6aacd3c-efb1-4c5f-b6e4-47f714414046)
강의만 300만원 정도 봤습니다.<br>
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
jest관련해서 강의랑 다르게 오류가 많이날겁니다 일단 엑시오스 가 업데이트돼면서 jest에서 충돌나는것을 막는방법입니다 <br>
![image](https://github.com/sengwoong/tdd/assets/92924243/1513baf0-be3d-4bbd-99ec-9516d4fa1a32)
<br>
바벨이랑 설정도 바꿔야합니다.
<br>
![image](https://github.com/sengwoong/tdd/assets/92924243/04666f55-fa5a-49f3-a200-23376a732acf)
https://junhyunny.github.io/react/jest/module-import-error-on-jest/
<br>
이렇게하고 기존에 바벨이랑 위 깃처럼 설정하면됍니다.
<br>
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
