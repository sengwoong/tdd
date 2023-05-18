// api.js

import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    await axios.post("http://localhost:4000/order", orderData);
  } catch (error) {
    throw new Error("에러가 발생했습니다.");
  }
};
export const ViewOrder = async () => {
  try {
    const response = await axios.get("http://localhost:4000/order");
    return response.data;
  } catch (error) {
    throw new Error("에러가 발생했습니다.");
  }
};

export const DelectOrder = async ({ productId }) => {
  try {
    await axios.delete(`http://localhost:4000/order/${productId}`);
  } catch (error) {
    throw new Error("에러가 발생했습니다.");
  }
};
