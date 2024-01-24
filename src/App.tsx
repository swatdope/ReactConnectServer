import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

const App = () => {
  const [category, setCategory] = useState("");

  const connect = () => console.log("connecting");
  const disconnect = () => console.log("disconnecting");

  useEffect(() => {
    connect();

    return () => disconnect();
  });

  return (
    <>
      <select
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </>
  );
};

export default App;
