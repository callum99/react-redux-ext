import "./globals.css";
import Home from './app/pages/home';
import Counter from "./app/pages/counter";
import Form from "./app/pages/form";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = ({}) => {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/Counter" style={{ marginRight: 10 }}>Counter</Link>
        <Link to="/Form" style={{ marginRight: 10 }}>Form</Link>
        {/*<Link to="/about" style={{ marginRight: 10 }}>About</Link>*/}
        {/*<Link to="/contact">Contact</Link>*/}
      </nav>
      
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/form" element={<Form />} />
        {/*<Route path="/about" element={<About />} />*/}
        {/*<Route path="/contact" element={<Contact />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
