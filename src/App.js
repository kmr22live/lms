import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function App() {
  const nav = useNavigate();
  useEffect(() => {
    nav("/dashboard");
  }, []);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}
export default App;
