import * as FirestoreService from "../../services/firestore";
import { format, formatDistance } from "date-fns";
import { ro } from "date-fns/locale";

import { Button } from "react-bootstrap";
import EditExperienceButtonModal from "./EditExperienceButtonModal";
import "./styles.scss";

export const Experience = (props) => {
  const {
    id,
    author,
    companyName,
    jobTitle,
    location,
    startDate,
    endDate,
    isPresent,
    description,
    toast,
    controls,
    className,
  } = props;

  const handleDeleteExperience = async () => {
    await FirestoreService.deleteExperienceDocument(id).then(() =>
      toast("Experiența a fost ștearsă cu succes!")
    );
  };

  return (
    <div className={`${className} experienceContainer bg-light bg-gradient`}>
      <div className="d-flex justify-content-between">
        <div>
          <h3 className="experienceTitle">
            {jobTitle}, {location}
          </h3>
          <h4 className="experienceCompany">{companyName}</h4>
          <div className="d-flex ">
            <h4 className="experienceDate">
              {format(startDate.toDate(), "PP", { locale: ro })}
            </h4>
            <h4 className="experienceDate experienceDateBetween"> - </h4>
            <h4 className="experienceDate">
              {endDate === null
                ? "Present"
                : format(endDate.toDate(), "PP", { locale: ro })}
            </h4>
            <h4 className="experienceDate experienceDateBetween"> - </h4>
            <h4 className="experienceDate">
              {formatDistance(
                startDate.toDate(),
                endDate ? endDate.toDate() : new Date(),
                { locale: ro }
              )}
            </h4>
          </div>
        </div>
        <div className="experienceActions">
          {controls && (
            <>
              <EditExperienceButtonModal
                id={id}
                author={author}
                defaultCompanyName={companyName}
                defaultJobTitle={jobTitle}
                defaultLocation={location}
                defaultStartDate={startDate}
                defaultEndDate={endDate}
                defaultIsPresent={isPresent}
                defaultDescription={description}
                toast={toast}
              />
              <Button
                variant="danger"
                onClick={handleDeleteExperience}
                className="ms-2"
              >
                Șterge
              </Button>
            </>
          )}
        </div>
      </div>
      <p className="experienceDescription">{description}</p>
    </div>
  );
};

export default Experience;
