import { useEffect, useRef } from "react";

const App = () => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) return ref.current.focus();
  });
  useEffect(() => {
    document.title = "yes you can do it";
  });
  return (
    <>
      <h1>Useeffect</h1>
      <input ref={ref} type="text" className="form-control" />
    </>
  );
};

export default App;
