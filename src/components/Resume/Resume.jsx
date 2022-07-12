import * as FirestoreService from "../../services/firestore";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
import { ro } from "date-fns/locale";
import EditResumeButtonModal from "./EditResumeButtonModal";
import { currentURL } from "../../utils/constants";
import "./styles.scss";

const Resume = (props) => {
  const {
    id,
    author,
    createdAt,
    updatedAt,
    resumeTitle,
    allExperiences,
    resumeExperience,
    totalExperiencesNumber,
    imageURL,
    toast,
  } = props;

  const url = `${currentURL}resume/${id}`;

  const handleDeleteResume = async () => {
    await FirestoreService.deleteResumeDocument(id).then(() =>
      toast("Resume-ul a fost ștears cu succes!")
    );
  };

  return (
    <div className="resumeContainer bg-light bg-gradient">
      <div className="resumeContent">
        <div className="resumeStart">
          <h3 className="resumeTitle">{resumeTitle}</h3>

          <img
            className="resumeCompanyLogo"
            role="img"
            aria-label="Bootstrap"
            src={imageURL}
          />
        </div>
        <div className="resumeData">
          <span className="resumeDataTitle">Experiențe:</span>
          <span>
            {" "}
            {resumeExperience?.length}/{totalExperiencesNumber}
          </span>
        </div>
        <div className="resumeData">
          <span className="resumeDataTitle">Creat: </span>
          <span>
            {createdAt === null
              ? "Loading"
              : format(createdAt.toDate(), "PP", { locale: ro })}
          </span>
        </div>
        <div className="resumeData">
          <span className="resumeDataTitle">Updatat: </span>
          <span>
            {updatedAt === null
              ? "Nu"
              : format(updatedAt.toDate(), "PP", { locale: ro })}
          </span>
        </div>
      </div>
      <div className="resumeLink">
        <a href={url} target="_blank">
          {url}
        </a>
      </div>
      <div className="resumeActions">
        <a href={url} target="_blank">
          <Button variant="secondary" className="me-2">
            Previzualizează
          </Button>
        </a>
        <EditResumeButtonModal
          id={id}
          author={author}
          allExperiences={allExperiences}
          defaultResumeExperience={resumeExperience}
          defaultResumeTitle={resumeTitle}
          defaultImageURL={imageURL}
          totalExperiencesNumber={totalExperiencesNumber}
          toast={toast}
        />
        <Button variant="danger" onClick={handleDeleteResume}>
          Șterge
        </Button>
      </div>
    </div>
  );
};

export default Resume;
