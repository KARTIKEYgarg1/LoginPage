import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const BASE_URL = "http://analyticsv.pythonanywhere.com/user/login";
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPwd(e.target.value);
  };
  function number() {
    var str = pwd;
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "0" && str[i] <= "9") {
        count++;
      }
    }
    return count;
  }
  const handleSubmit = () => {
    if (pwd.length < 8) {
      document.getElementById("msg").innerHTML = "Password too short";
    } else {
      if (number() > 3) {
        axios
          .post(BASE_URL, { username: username, password: pwd })
          .then((result) => {
            console.log(result);
            document.getElementById("msg").innerHTML =
              "Token: " + result.data.token;
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("msg").innerHTML =
              "Failed! Check above details";
          });
      } else {
        document.getElementById("msg").innerHTML = "Enter a valid password";
      }
    }
    document.getElementById("msg").style.visibility = "visible";
  };
  return (
    <div className="App">
      <center>
        <h2>Login</h2>
      </center>
      <label htmlFor="username">Username:</label>
      <input
        value={username}
        type="text"
        name="username"
        onChange={handleUsername}
      />
      <label htmlFor="password">Password:</label>
      <input
        value={pwd}
        type="password"
        name="Password"
        onChange={handlePassword}
      />
      <button className="btn" onClick={handleSubmit}>
        Login
      </button>
      <div id="msg">Fetching...</div>
    </div>
  );
}

export default App;
