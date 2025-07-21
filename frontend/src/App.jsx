// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './utils/config';
import Nav from './utils/Nav';

const generateRoutes = (routeList) => {
  return routeList.flatMap(route => {
    if (route.children) {
      return generateRoutes(route.children);
    }
    if (route.component) {
      return <Route key={route.path} path={route.path} element={<route.component />} />;
    }
    return [];
  });
};

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        {generateRoutes(routes)}
      </Routes>
    </Router>
  );
}

export default App;
