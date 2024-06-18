import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      // console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }

      // Cookies.set("token", response.data.token, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Se Connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
