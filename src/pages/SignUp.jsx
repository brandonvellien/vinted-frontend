import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: true,
        }
      );

      console.log(response.data);

      Cookies.set("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>S'inscrire</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            <label>S'inscrire à notre newsletter</label>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
