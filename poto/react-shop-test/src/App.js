import { useState } from "react";
import "./App.css";

import { OrderContextProvider } from "./contexts/OrderContext";
import OrderPage from "./page/OrderPage/OrderPage";
import SummaryPage from "./page/SummaryPage/summarypage";
import CompletePage from "./page/CompletePage/completepage";
function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{ padding: "4rem" }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setStep={setStep} />}
        {step === 1 && <SummaryPage setStep={setStep} />}
        {step === 2 && <CompletePage setStep={setStep} />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
