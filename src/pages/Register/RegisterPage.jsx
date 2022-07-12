import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../services/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <div className="text-center">
        <h1 className="mt-5">Înregistrează-te</h1>
      </div>
      <div className="p-4 p-md-5 border rounded-3 bg-light mt-5">
        <div className="form-floating mb-3">
          <input
            type="name"
            className="form-control"
            id="floatingInputName"
            placeholder="Popescu Ion"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="floatingInputName">Nume</label>
        </div>
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
        <button className="w-100 btn btn-lg btn-primary" onClick={register}>
          Creare cont
        </button>
        <button
          className="w-100 btn btn-lg btn-outline-secondary mt-2"
          onClick={signInWithGoogle}
        >
          Creare cont cu Google
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          {/* Ți-ai uitat parola?{" "}
          <Link to="/forgot-password">Resetează-ți parola</Link> */}
          Ai cont deja? <Link to="/login">Autentifică-te</Link>
        </small>
      </div>
    </div>
    // <div className="register">
    //   <div className="register__container">
    //     <input
    //       type="text"
    //       className="register__textBox"
    // value={name}
    // onChange={(e) => setName(e.target.value)}
    //       placeholder="Full Name"
    //     />
    //     <input
    //       type="text"
    //       className="register__textBox"
    // value={email}
    // onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <input
    //       type="password"
    //       className="register__textBox"
    // value={password}
    // onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <button className="register__btn" onClick={register}>
    //       Register
    //     </button>
    //     <button
    //       className="register__btn register__google"
    //       onClick={signInWithGoogle}
    //     >
    //       Register with Google
    //     </button>
    //     <div>
    //       Already have an account? <Link to="/">Login</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Register;
