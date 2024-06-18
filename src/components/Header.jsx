import { useLocation, Link } from "react-router-dom";
import logo from "/src/assets/img/logo.png";

const Header = ({ token, handleToken, search, setSearch }) => {
  const location = useLocation();
  console.log(location);

  const spanStyle = {
    marginTop: "10px",
  };

  return (
    <header className="header-container">
      <Link to={`/`}>
        <div className="header-logo-container">
          <img className="header-logo" src={logo} alt="vinted" />
        </div>
      </Link>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher des articles"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          className="searchinput"
        />
        <div className="filter-container">
          <span style={spanStyle}>Trier par prix</span>
          <span className="checkbox">
            <input type="checkbox" name="price" />
            <div className="wrapper">
              <div className="button">
                <span>⇣</span>
              </div>
            </div>
          </span>
          <span>Prix entre :</span>
          <div>Ici la barre de filtre</div>
        </div>
      </div>
      <div className="auth-buttons">
        {token ? (
          <button className="logout" onClick={() => handleToken(null)}>
            {" "}
            Se déconnecter{" "}
          </button>
        ) : (
          <>
            <Link to={`/signup`}>
              <button className="button-login-signup button-signup">
                S'inscrire
              </button>
            </Link>
            <Link to={`/login`}>
              <button className="button-login-signup button-signup">
                Se connecter
              </button>
            </Link>
          </>
        )}
      </div>
      <div>
        <Link to={token ? "/publish" : "/login"}>
          {" "}
          <button className="header-button button-sold">
            Vends tes articles
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
