import Stock from './View/Stock.js';
import SignIn from './View/SignIn.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn/>} />
        <Route path="/stock" element={<Stock/>} />
      </Routes>
    </Router>
     
  );
}

export default App;
