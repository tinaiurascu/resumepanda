import { useEffect, useState } from "react";
import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";

const ProfilePage = () => {
  const [validated, setValidated] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [contact, setContact] = useState({});
  const [prevState, setPrevState] = useState({});

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    FirestoreService.createAndUpdateProfile(user, profileId, {
      fullName,
      jobTitle,
      contact,
    });
  };

  const isDisabled = () => {
    if (fullName !== prevState?.fullName) {
      return false;
    }
    if (jobTitle !== prevState?.jobTitle) {
      return false;
    }
    if (contact?.email !== prevState?.contact?.email) {
      return false;
    }

    if (contact?.phone !== prevState?.contact?.phone) {
      return false;
    }

    return true;
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    isDisabled();
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
    isDisabled();
  };

  const handleContacEmailtChange = (event) => {
    setContact({ ...contact, email: event.target.value });
    isDisabled();
  };

  const handleContactPhoneChange = (event) => {
    setContact({ ...contact, phone: event.target.value });
    isDisabled();
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const unsubscribe = FirestoreService.listenToProfileUpdates(
      user,
      (querySnapshot) => {
        const snapshot = querySnapshot.docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          };
        });
        const profile = snapshot[0];
        setPrevState({
          fullName: profile?.fullName,
          jobTitle: profile?.jobTitle,
          contact: profile?.contact,
        });

        setProfileId(profile?.id);
        setFullName(profile?.fullName);
        setJobTitle(profile?.jobTitle);
        setContact(profile?.contact);
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, [user, loading]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className=""
      >
        <Row className="mb-2">
          <Form.Group
            controlId="validationName"
            className="d-flex flex-column justify-content-start align-items-start text-start"
          >
            <Form.Label>Nume complet</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Popescu Ion"
              defaultValue={fullName}
              onChange={handleFullNameChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Completează numele.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            controlId="validationJobTitle"
            className="d-flex flex-column justify-content-start align-items-start text-start"
          >
            <Form.Label>Titlul funcției</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="JavaScript Developer"
              defaultValue={jobTitle}
              onChange={handleJobTitleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Completează titlul funcției.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            controlId="validationEmail"
            className="d-flex flex-column justify-content-start align-items-start text-start"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="popsescu.ion@mail.com"
              defaultValue={contact?.email}
              onChange={handleContacEmailtChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Inserați un email valid.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            controlId="validationPhoneNumber"
            className="d-flex flex-column justify-content-start align-items-start text-start"
          >
            <Form.Label>Telefon</Form.Label>
            <Form.Control
              required
              type="tel"
              placeholder="+40 722 123 456"
              defaultValue={contact?.phonenumber}
              onChange={handleContactPhoneChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Inserați un numar de telefon valid.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" disabled={isDisabled()}>
          Salvează
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
