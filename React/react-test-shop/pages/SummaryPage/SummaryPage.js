import React, { useState, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";

const SummaryPage = ({ setStep }) => {
  const [orderDatas] = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const productArray = Array.from(orderDatas.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDatas.options.size > 0;
  let optionsRender = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDatas.options.keys());
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
    optionsRender = (
      <>
        <h2>옵션: {orderDatas.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDatas.totals.products}</h2>
      <ul>{productList}</ul>
      {optionsRender}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="confirm-checkbox"
        />
        {/* //htmlFor는 HTML의 속성(attribute) 중 하나로, 레이블(label)과 연결된 체크박스(checkbox)나 라디오 버튼(radio button)을 지정하는 데 사용됩니다. */}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
