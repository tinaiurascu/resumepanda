import { useEffect, useState } from "react";
import Education from "../../components/Education/Education";
import { ToastContainer, toast } from "react-toastify";

import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import AddEducationButtonModal from "./AddEducationButtonModal";

const EducationPage = () => {
  const [user, loading] = useAuthState(auth);
  const [education, setEducation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const unsubscribe = FirestoreService.listenToEducationUpdates(
      user,
      (querySnapshot) => {
        const educationData = querySnapshot.docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          };
        });
        setEducation(educationData);
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, [user, loading]);

  return (
    <div className="px-4 pt-5 container">
      <ToastContainer />
      <h2 className="pb-2 border-bottom text-start d-flex justify-content-between">
        <span>Educație </span>
        <AddEducationButtonModal toast={toast} />
      </h2>
      {education?.map((education) => {
        return (
          <Education
            key={education.id}
            id={education.id}
            author={education.author}
            school={education.school}
            degree={education.degree}
            fieldOfStudy={education.fieldOfStudy}
            endDate={education.endDate}
            toast={toast}
            controls={true}
          />
        );
      })}
    </div>
  );
};
export default EducationPage;
