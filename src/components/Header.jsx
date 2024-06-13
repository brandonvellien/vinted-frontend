import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  console.log(location);
  return (
    <header>
      <h2>Je suis dans le header</h2>
      <Link to={`/signup`}>
        <button>S'inscrire</button>
      </Link>
      <button>Se connecter</button>
    </header>
  );
};

export default Header;
