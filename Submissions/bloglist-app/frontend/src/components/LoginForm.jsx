import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await loginService.login(username, password);
      console.log("RESULT DATA: ", result);
      blogService.setToken(result.token);
      setUser(result);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(result));
      showNotification("successfully logged in");
    } catch (exception) {
      showNotification("error logging in");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <p>
        username{" "}
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </p>
      <p>
        password{" "}
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </p>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
