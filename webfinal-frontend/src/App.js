import Home from './View/Home.js';
import Stock from './View/Stock.js';
import Contact from './View/Contact.js';
import SignIn from './View/SignIn.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/stock" element={<Stock/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        {/* <Route path="/products" component={Products} /> */}
      </Routes>
    </Router>
     
  );
}

export default App;
