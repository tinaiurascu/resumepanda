import { Link } from "react-router-dom";
import "./styles.scss";

const LandingPage = () => {
  return (
    <div className="px-4 pt-5 text-center bg-dark landingPageContainer">
      <h1 className="display-4 fw-bold text-light pt-5">
        Adaptează-ți experiența
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4 text-light subheader">
          Crearea unui CV poate fi o bătaie de cap de cele mai multe ori. Cu
          ResumePanda, șansele să fi selectat pentru jobul dorit cresc, doarece
          vine în ajutorul tău cu completarea experiențelor potrivite în funcție
          de locul la care aplici. Un Resume simplu, organizat dar totuși
          complet este ceea ce ai nevoie.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Link to="/register">
            <button
              type="button"
              className="btn btn-warning btn-lg px-4 me-sm-3"
            >
              Creare cont
            </button>
          </Link>
        </div>
      </div>
      <div className="landingPageImageContainer"></div>
    </div>
  );
};

export default LandingPage;
