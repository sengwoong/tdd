import React, { useEffect, useContext, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../contexts/OrderContext";
import { DelectOrder, ViewOrder } from "./test/UseOrderData";

function CompletePage({ setStep }) {
  const [OrderDatas, , resetOrderDatas] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    orderCompleted(OrderDatas);
  }, [OrderDatas]);

  const orderCompleted = async (OrderDatas) => {
    try {
      const response = await ViewOrder(OrderDatas);
      setOrderHistory(response);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  const orderDelect = async (productId) => {
    try {
      await DelectOrder({ productId });
      // 주문이 삭제된 후에 orderHistory를 업데이트하여 orderTable이 재랜더링되도록 함
      setOrderHistory((prevOrderHistory) =>
        prevOrderHistory.filter((item) => item._id !== productId)
      );
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
      <td>{item._id}</td>
      <td>
        <button onClick={() => orderDelect(item._id)}>삭제</button>
      </td>
    </tr>
  ));

  const handleClick = () => {
    resetOrderDatas();
    setStep(0);
  };

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <th>주문 번호</th>
              <th>주문 가격</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <button onClick={handleClick}>첫 페이지로</button>
      </div>
    );
  }
}

export default CompletePage;
