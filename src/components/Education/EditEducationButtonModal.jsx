import { useState } from "react";
import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import { Button, Modal, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "react-toastify/dist/ReactToastify.css";

const EditEducationButtonModal = (props) => {
  const {
    id,
    defaultSchool,
    defaultDegree,
    defaultFieldOfStudy,
    defaultEndDate,
    toast,
  } = props;

  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);
  const [school, setSchool] = useState(defaultSchool);
  const [degree, setDegree] = useState(defaultDegree);
  const [fieldOfStudy, setFieldOfStudy] = useState(defaultFieldOfStudy);
  const [endDate, setEndDate] = useState(defaultEndDate.toDate());

  const [user] = useAuthState(auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSchoolChange = (event) => {
    setSchool(event.target.value);
    isDisabled();
  };

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
    isDisabled();
  };

  const handleFieldOfStudyChange = (event) => {
    setFieldOfStudy(event.target.value);
    isDisabled();
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    isDisabled();
  };

  const isDisabled = () => {
    if (!school || !fieldOfStudy || !degree || endDate === null) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    isDisabled();

    await FirestoreService.updateEducationDocument(id, {
      school,
      fieldOfStudy,
      degree,
      endDate,
    }).then(() => toast("Educația a fost adaugată cu success!"));
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editează
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editează</Modal.Title>
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
                <Form.Label>Numele școlii</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: Universitatea Titu Maiorescu, București"
                  defaultValue={school}
                  onChange={handleSchoolChange}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Completează numele școlii.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                controlId="validationCompany"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Tipul diplomei</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: Licențiat"
                  defaultValue={degree}
                  onChange={handleDegreeChange}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Inserați tipul diplomei.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                controlId="validationPhoneNumber"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Domeniul de studiu</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex: Informatică"
                  defaultValue={fieldOfStudy}
                  onChange={handleFieldOfStudyChange}
                />
                <Form.Control.Feedback>Arată bine!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Inserați domeniul de studiu.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                controlId="validationStartDate"
                className="d-flex flex-column justify-content-start align-items-start text-start"
              >
                <Form.Label>Data de absolvire</Form.Label>
                <DatePicker
                  className="datePicker"
                  onChange={handleEndDateChange}
                  value={endDate}
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
            Editează
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditEducationButtonModal;
