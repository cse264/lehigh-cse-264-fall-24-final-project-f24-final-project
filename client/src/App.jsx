import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Plants from "./components/pages/Plants";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";

export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="plants" element={<Plants />} />
          <Route path="/*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

