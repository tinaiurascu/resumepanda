import { useEffect, useState, useRef } from "react";
import * as FirestoreService from "../../services/firestore";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Navbar, Button } from "react-bootstrap";
import Experience from "../../components/Experience/Experience";
import Education from "../../components/Education/Education";
import "./styles.scss";

const PublicResume = () => {
  const params = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    FirestoreService.getPublicResume(params.id).then((resume) => {
      setResume(resume);
    });
  }, []);

  const resumeRef = useRef();

  return (
    <div className="d-flex justify-content-center flex-column">
      <div
        className="publicResumeContainer container-xl bg-light bg-gradient"
        ref={resumeRef}
      >
        <div className="row gy-5 publicResumeHeader">
          <div className="col-12">
            <Navbar.Brand href="#home">
              <img
                className="bi me-2"
                width="150"
                role="img"
                aria-label="Bootstrap"
                src="../../pandalogo.png"
              />
            </Navbar.Brand>
          </div>
        </div>
        <div className="row gy-5">
          <div className="col-8 border bg-light p-25">
            <h1 className="publicResumeFullname">{resume?.fullName}</h1>
            <h4 className="publicResumeJobTitle">{resume?.jobTitle}</h4>
          </div>
          <div className="col-4 border bg-light p-25">
            <p className="publicResumeExpSelected">
              experiențe selectate pentru
            </p>
            <img
              className="resumeCompanyLogo"
              role="img"
              aria-label="Bootstrap"
              src={resume?.imageURL}
            />
            <div className="mt-4">
              <p className="publicResumeContact">
                <a href={`mailto:${resume?.contact.email}`}>
                  {resume?.contact.email}
                </a>
              </p>
              <p className="publicResumeContact">
                <a href={`tel:${resume?.contact.phonenumber}`}>
                  {resume?.contact.phonenumber}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8 border bg-light publicResumeExperienceContainer">
            <h4 className="publicResumeTitle">Experiență</h4>
            {resume?.experiences.map((experience) => {
              return (
                <Experience
                  className="publicResumeExperience"
                  key={experience.id}
                  id={experience.id}
                  author={experience.author}
                  companyName={experience.companyName}
                  jobTitle={experience.jobTitle}
                  location={experience.location}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  isPresent={experience.isPresent}
                  description={experience.description}
                  controls={false}
                />
              );
            })}
          </div>
          <div className="col-4 border bg-light publicResumeEducationContainer">
            <h4 className="publicResumeTitle">Educație</h4>
            {resume?.education.map((education) => {
              return (
                <Education
                  className="publicResumeEducation"
                  key={education.id}
                  id={education.id}
                  author={education.author}
                  school={education.school}
                  degree={education.degree}
                  fieldOfStudy={education.fieldOfStudy}
                  endDate={education.endDate}
                  control={false}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <ReactToPrint
          trigger={() => (
            <Button variant="dark" className="align-self-center">
              Download
            </Button>
          )}
          content={() => resumeRef.current}
        />
      </div>
    </div>
  );
};

export default PublicResume;
