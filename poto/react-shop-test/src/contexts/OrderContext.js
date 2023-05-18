import { createContext, useState, useMemo, useEffect } from "react";

export const OrderContext = createContext();

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

export function OrderContextProvider(props) {
  //초기화
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });
  //들어갈값 초기화
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(
    () => {
      //orderCounts 를 받아서 products 와 options 의 개수를 계산하여 totals 에 넣어준다.
      const productsTotal = calculateSubtotal("products", orderCounts);
      //orderCounts 를 받아서 products 와 options 의 개수를 계산하여 totals 에 넣어준다.
      const optionsTotal = calculateSubtotal("options", orderCounts);
      //productsTotal 과 optionsTotal 을 더하여 total 에 넣어준다.
      const total = productsTotal + optionsTotal;
      //setTotals 에 넣어준다.
      setTotals({
        products: productsTotal,
        options: optionsTotal,
        total,
      });
    },
    //orderCounts 가 변경될때마다 실행한다.
    [orderCounts]
  );

  const value = useMemo(() => {
    //updateItemCount 카운터는 itemName, newItemCount, orderType 을 외부에서 받는다.
    function updateItemCount(itemName, newItemCount, orderType) {
      //미띤
      // setOrderCounts(newOrderCounts)는 실제로는 orderCounts 상태를 업데이트하는 역할을 합니다. 하지만 React에서 useState Hook은 상태를 업데이트하는 것이 비동기적으로 이루어지기 때문에, 업데이트 되기 전의 orderCounts 상태를 복사해둔 것입니다.

      // 이는 React Hook의 특징 중 하나로, 상태를 직접 업데이트하는 것이 아니라 이전 상태를 복사한 후 업데이트하는 것이 좋습니다. 이전 상태를 복사해두면 이전 상태의 값과 새로운 값이 다른 경우에만 상태를 업데이트하기 때문에, 불필요한 렌더링을 방지할 수 있습니다.

      // 따라서, orderCountsMap을 업데이트한 후 새로운 orderCounts 상태를 업데이트하는 것이 아니라, 먼저 새로운 orderCounts를 만들고(orderCounts를 복사한 후), orderCountsMap을 업데이트한 후, 그 다음 setOrderCounts()를 호출하여 orderCounts 상태를 업데이트하는 것입니다.

      //orderCounts 를 복사한다. 맵은 바로값을 넣으면 기존값이 날라간다.
      const newOrderCounts = { ...orderCounts };

      //orderCountsMap 을 복사하는데 orderCounts 안에있는 orderType을복사한다 이떄 orderType 은 products 또는 options 이다.
      const orderCountsMap = orderCounts[orderType];

      //set을 이용해 orderCountsMap을 업데이트한다 이떄 itemName 을 키값으로해서 newItemCount 를 넣어준다.

      orderCountsMap.set(itemName, parseInt(newItemCount));

      //???
      setOrderCounts(newOrderCounts);
    }
    //초기화한다.
    const resetOrderDatas = () => {
      setOrderCounts({
        products: new Map(),
        options: new Map(),
      });
    };

    //updateItemCount와 resetOrderDatas 을 리턴하는 이유는 이 함수들을 외부에서 사용할수있게 하기위해서이다.
    return [{ ...orderCounts, totals }, updateItemCount, resetOrderDatas];
  }, [orderCounts, totals]);
  return <OrderContext.Provider value={value} {...props} />;
}
