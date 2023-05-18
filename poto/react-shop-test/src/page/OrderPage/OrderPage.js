import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Type from "./Type";
import OrderItem from "./OrderItem";
import OrderSideMenu from "./OrderSideMenu";

function OrderPage({ setStep }) {
  const [orderDatas] = useContext(OrderContext);
  // console.log(orderDatas);
  return (
    <div style={{ display: "flex" }}>
      <OrderSideMenu />

      <div>
        <div>
          <h1>Travel Products</h1>

          <Type orderType="products" />
          <OrderItem orderType="products" />
        </div>

        <div
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "red",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <h2>Total Price: {orderDatas.totals.total}</h2>
          <br />
          <button onClick={() => setStep(1)}>주문하기</button>
          <button onClick={() => setStep(2)}>주문정보보기</button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
