import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

function Login({ addToken }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    console.log(newUserData);
    setUserData(newUserData);
  }
  let navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/login", userData).then((res) => {
      console.log(res.data[0]);
      if (res.data.success === true) {
        window.sessionStorage.setItem("auth_token", res.data[0].token);
        window.sessionStorage.setItem("auth_name", res.data[0].username);
        window.sessionStorage.setItem("auth_id", res.data[0].id);
        addToken(res.data[0].token);
        console.log(res.data[0].token);
        if (res.data[0].role === "admin") {
          navigate("/Admin");
        } else {
          navigate("/Oprema");
        }
      } else {
        alert("NEUSPESNO");
      }
    });
  }
  return (
    <div id="kontakt">
      <div id="container1">
        <div id="contact-box">
          <div id="left"></div>
          <div id="right">
            <h2 className="title">Uloguj se</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  className="input--style-3"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onInput={handleInput}
                />
              </div>

              <div className="input-group">
                <input
                  className="input--style-3"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onInput={handleInput}
                />
              </div>
              <div className="p-t-10">
                <button
                  className="btn btn--pill btn--green"
                  type="submit"
                  id="login"
                  name="login"
                >
                  Potvrdi
                </button>
              </div>
              <br />
              <br />
              <p>
                <a href="/Register" className="tekstForme">
                  Zdravo
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
