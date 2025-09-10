import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Universities from "./components/Universities";
// import DamascusUniversity from "./components/DamascusUniversity";
// import HomsUniversity from "./components/HomsUniversity";
// import LatakiaUniversity from "./components/LatakiaUniversity";
// import KalamoonUniversity from "./components/KalamoonUniversity";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Universities />} />
//         <Route path="/university/damascus" element={<DamascusUniversity />} />
//         <Route path="/university/homs" element={<HomsUniversity />} />
//         <Route path="/university/latakia" element={<LatakiaUniversity />} />
//         <Route path="/university/kalamoon" element={<KalamoonUniversity />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
