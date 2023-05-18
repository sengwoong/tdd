import React, { useContext } from "react";

import Products from "./Products";
import Options from "./Options";

import { OrderContext } from "../../contexts/OrderContext";
import useItem from "./useItem";

function OrderItem({ orderType }) {
  const [_, updateItemCount] = useContext(OrderContext);

  const ItemComponents = orderType === "products" ? Products : Options;
  const { items } = useItem(orderType);
  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </>
  );
}

export default OrderItem;
