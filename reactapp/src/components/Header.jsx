import '../index.css';
import { Link } from "react-router-dom"; 

function Header() {
  return (
    <header className="main-header">
        <div className="logo-holder">
            <Link to="/" className="logo">Моя Фильмотека</Link>
        </div>
    </header>
  );
}

export default Header;