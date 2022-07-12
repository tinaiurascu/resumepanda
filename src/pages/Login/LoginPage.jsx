import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <div className="text-center">
        <h1 className="mt-5">Autentificare</h1>
      </div>
      <div className="p-4 p-md-5 border rounded-3 bg-light mt-5">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInputEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInputEmail">Adresa de email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Parola</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Ține-mă minte
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Autentificare
        </button>
        <button
          className="w-100 btn btn-lg btn-outline-secondary mt-2"
          onClick={signInWithGoogle}
        >
          Autentificare cu Google
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          Ți-ai uitat parola? <Link to="/reset">Resetează-ți parola</Link>
        </small>
      </div>
    </div>
    // <div className="login">
    //   <div className="login__container">
    //     <input
    //       type="text"
    //       className="login__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="login__textBox"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button
    //       className="login__btn"
    //       onClick={() => logInWithEmailAndPassword(email, password)}
    //     >
    //       Login
    //     </button>
    //     <button className="login__btn login__google" onClick={signInWithGoogle}>
    //       Login with Google
    //     </button>
    //     <div>
    //       <Link to="/reset">Forgot Password</Link>
    //     </div>
    //     <div>
    //       Don't have an account? <Link to="/register">Register</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Login;
