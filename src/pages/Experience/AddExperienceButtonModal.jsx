import { useState } from "react";
import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import { Button, Modal, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "react-toastify/dist/ReactToastify.css";

const AddExperienceButtonModal = (props) => {
  const { toast } = props;
  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");

  const [user] = useAuthState(auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
    isDisabled();
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    isDisabled();
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    isDisabled();
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    isDisabled();
  };

  const handleIsPresent = () => {
    setIsPresent(!isPresent);
    isDisabled();
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    isDisabled();
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    isDisabled();
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    isDisabled();

    FirestoreService.createExperience(user, {
      jobTitle,
      companyName,
      location,
      isPresent,
      startDate,
      endDate,
      description,
    }).then(() => toast("Experiența a fost adaugată cu success!"));
    handleClose();
  };

  const isDisabled = () => {
    if (
      !jobTitle ||
      !companyName ||
      !location ||
      startDate === null ||
      (endDate === null && !isPresent) ||
      !description
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adaugă experiență nouă
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adaugă o nouă experiență</Modal.Title>
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
                <Form.Label>Titlul funcției</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: JavaScript Developer"
                  defaultValue={jobTitle}
                  onChange={handleJobTitleChange}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Completează titlul funcției.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                controlId="validationCompany"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Numele companiei</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: Vodafone"
                  defaultValue={companyName}
                  onChange={handleCompanyNameChange}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Inserați un nume de companie.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                controlId="validationPhoneNumber"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Locație</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: București"
                  defaultValue={location}
                  onChange={handleLocationChange}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Inserați o locație.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={isPresent}
                  onChange={handleIsPresent}
                  label="În prezent lucrez pe acest post"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                controlId="validationStartDate"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Data de început</Form.Label>
                <DatePicker
                  className="datePicker"
                  onChange={handleStartDateChange}
                  value={startDate}
                />
              </Form.Group>
            </Row>

            {!isPresent && (
              <Row className="mb-3">
                <Form.Group
                  controlId="validationEndDate"
                  className="d-flex flex-column justify-content-start align-items-start text-start"
                >
                  <Form.Label>Data de sfârșit</Form.Label>
                  <DatePicker
                    className="datePicker"
                    onChange={handleEndDateChange}
                    value={endDate}
                  />
                </Form.Group>
              </Row>
            )}

            <Row className="mb-3">
              <Form.Group
                controlId="validationDescription"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Descrierea postului</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Ex: responsabilități"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
            </Row>
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

export default AddExperienceButtonModal;
