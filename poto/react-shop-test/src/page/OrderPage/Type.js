// Type.js
import React, { useContext } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";
import OrderItem from "./OrderItem";
import useItem from "./useItem";

function Type({ orderType }) {
  const [orderDatas, _] = useContext(OrderContext);

  const { error } = useItem(orderType);

  let orderTypeKorean = orderType === "products" ? "상품" : "옵션";

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격:500</p>
      <p>
        {orderTypeKorean} 총 가격: {orderDatas.totals[orderType]}
      </p>
      {error && <ErrorBanner message="에러가 발생했습니다." />}

      <button
        onClick={() => {
          console.log("orderDatas:", orderDatas);
        }}
      ></button>
    </>
  );
}

export default Type;
