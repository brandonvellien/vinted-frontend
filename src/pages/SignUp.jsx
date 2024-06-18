import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );

      console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage("L'email est deja utilisé");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    }
  };

  return (
    <div className="signup-container">
      <div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>S'inscrire</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignUp;
