import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="intro">
        <h1>Hello, I'm <span className="highlight">Haider Ali Quadri</span></h1>
        <p className="tagline">A passionate developer building responsive websites and web apps</p>
        <div className="cta-buttons">
          <Link to="/services/webdev" className="btn">View Services</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
        </div>
      </div>

      <div className="skills-section">
        <h2>Tech Stack</h2>
        <ul className="skills-list">
          <li>React</li>
          <li>JavaScript (ES6+)</li>
          <li>Node.js</li>
          <li>FastAPI</li>
          <li>Git & GitHub</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
