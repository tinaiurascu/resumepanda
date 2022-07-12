import * as FirestoreService from "../../services/firestore";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Button } from "react-bootstrap";
import EditEducationButtonModal from "./EditEducationButtonModal";
import "./styles.scss";

export const Education = (props) => {
  const {
    id,
    author,
    school,
    degree,
    fieldOfStudy,
    endDate,
    toast,
    className,
    controls,
  } = props;

  const handleDeleteEducation = async () => {
    await FirestoreService.deleteEducationDocument(id).then(() =>
      toast("Educația a fost ștearsă cu succes!")
    );
  };

  return (
    <div className={`${className} educationContainer bg-light bg-gradient`}>
      <div className="d-flex justify-content-between">
        <div>
          <h3 className="educationTitle">{school}</h3>
          <h4 className="educationDegree">
            {degree}, {fieldOfStudy}
          </h4>
          <div className="d-flex ">
            <h4 className="educationDate">
              {format(endDate.toDate(), "PP", {
                locale: ro,
              })}
            </h4>
          </div>
        </div>
        <div className="educationActions">
          {controls && (
            <>
              <EditEducationButtonModal
                id={id}
                author={author}
                defaultSchool={school}
                defaultDegree={degree}
                defaultFieldOfStudy={fieldOfStudy}
                defaultEndDate={endDate}
                toast={toast}
              />
              <Button
                variant="danger"
                onClick={handleDeleteEducation}
                className="ms-2"
              >
                Șterge
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
