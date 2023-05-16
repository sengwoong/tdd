import { useState } from "react";
import "./App.css";

import { OrderContextProvider } from "./contexts/OrderContext";
import OrderPage from "./page/OrderPage/OrderPage";
function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{ padding: "4rem" }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
