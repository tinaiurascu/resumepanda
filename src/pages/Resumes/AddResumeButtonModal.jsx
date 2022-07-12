import { useState } from "react";
import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import { Button, Modal, Form, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const AddResumeButtonModal = (props) => {
  const { allExperiences, toast } = props;
  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [resumeExperience, setResumeExperience] = useState([]);
  const [imageURL, setImageURL] = useState("");

  const [user] = useAuthState(auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResumeTitle = (event) => {
    setResumeTitle(event.target.value);
    isDisabled();
  };

  const isDisabled = () => {
    if (!resumeTitle || resumeExperience <= 0) {
      return true;
    }

    return false;
  };

  const isChecked = (id) => {
    if (resumeExperience.includes(id)) {
      return true;
    }

    return false;
  };

  const handleResumeExperienceChange = (id) => {
    if (resumeExperience.includes(id)) {
      setResumeExperience(
        resumeExperience.filter((experience) => experience !== id)
      );
    } else {
      setResumeExperience([...resumeExperience, id]);
    }
    isDisabled();
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    isDisabled();

    await FirestoreService.createResume(user, {
      resumeTitle,
      imageURL,
      resumeExperience,
    }).then(() => toast("Resume-ul a fost adaugat cu success!"));
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adaugă Resume nou
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adaugă un nou Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className=""
          >
            <Row className="mb-3">
              <Form.Group
                controlId="validationJobTitle"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Nume Resume</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: JavaScript Developer, oferta Vodafone"
                  defaultValue={resumeTitle}
                  onChange={handleResumeTitle}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Completează numele școlii.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                controlId="validationJobTitle"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>URL Companie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: https://www.vodafone.ro/logo.png"
                  defaultValue={imageURL}
                  onChange={(event) => setImageURL(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Label>
              Experiențe ({resumeExperience.length}/{allExperiences.length}){" "}
            </Form.Label>

            {allExperiences?.map((experience) => {
              return (
                <Row className="mb-3" key={experience.id}>
                  <Form.Group controlId={experience.id} className="d-flex ">
                    <label className="experienceLabel">
                      <Form.Check
                        id={experience.id}
                        type="checkbox"
                        checked={isChecked(experience.id)}
                        onChange={() =>
                          handleResumeExperienceChange(experience.id)
                        }
                      />
                      <div className="experienceTitleContainer">
                        <span className="experienceTitle">
                          {experience.jobTitle}
                        </span>
                        <span>
                          {experience.companyName} - {experience.location} -{" "}
                          {/* {format(experience?.startDate?.toDate(), "PP")} */}
                        </span>
                      </div>
                    </label>
                  </Form.Group>
                </Row>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Închide
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isDisabled()}
          >
            Adaugă
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddResumeButtonModal;
