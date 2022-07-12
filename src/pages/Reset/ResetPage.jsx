import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./reset.css";

import { auth, sendPasswordReset } from "../../services/auth";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <div className="text-center">
        <h1 className="mt-5">Resetare parolă</h1>
      </div>
      <div className="p-4 p-md-5 border rounded-3 bg-light mt-5">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Adresa de email</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          onClick={() => sendPasswordReset(email)}
        >
          Resetează parolă
        </button>

        <hr className="my-4" />
        <small className="text-muted">
          Nu ai cont ? <Link to="/register">Creare cont</Link>
        </small>
      </div>
    </div>
    // <div className="reset">
    //   <div className="reset__container">
    //     <input
    //       type="text"
    //       className="reset__textBox"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="E-mail Address"
    //     />
    //     <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
    //       Send password reset email
    //     </button>
    //     <div>
    //       Don't have an account? <Link to="/register">Register</Link> now.
    //     </div>
    //   </div>
    // </div>
  );
}
export default Reset;
