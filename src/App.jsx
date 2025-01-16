import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fontsource/mulish'; // Defaults to 400 weight
import '@fontsource/mulish/300.css'; // Light
import '@fontsource/mulish/600.css'; // Semi-Bold
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Ensure Tailwind CSS is included here


import Home from "./pages/Home";


const App = () => {
  return (
    <Router>
      <div>
 

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
     
        </Routes>
      </div>
    </Router>
  );
};

export default App;
