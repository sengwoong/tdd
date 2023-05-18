// useItem.js
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";

export default function useItem(orderType) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  return { items, error, isLoading };
}
