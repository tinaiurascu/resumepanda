import { useEffect, useState } from "react";
import Resume from "../../components/Resume/Resume";
import AddResumeButtonModal from "./AddResumeButtonModal";
import { ToastContainer, toast } from "react-toastify";

import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const ResumeList = () => {
  const [user, loading] = useAuthState(auth);
  const [resumes, setResumes] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const unsubscribe = FirestoreService.listenToResumesUpdates(
      user,
      (querySnapshot) => {
        const resumesData = querySnapshot.docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          };
        });
        setResumes(resumesData);
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, [user, loading]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    FirestoreService.getAllExperiences(user.uid).then((res) =>
      setExperiences(res)
    );
  }, [user, loading]);

  return (
    <div className="px-4 pt-5 container">
      <ToastContainer />
      <h2 className="pb-2 border-bottom text-start d-flex justify-content-between">
        <span>Lista de Resume</span>
        <AddResumeButtonModal toast={toast} allExperiences={experiences} />
      </h2>
      {resumes?.map((resume) => {
        return (
          <Resume
            key={resume.id}
            id={resume.id}
            createdAt={resume.createdAt}
            updatedAt={resume.updatedAt}
            author={resume.author}
            resumeTitle={resume.resumeTitle}
            allExperiences={experiences}
            resumeExperience={resume.resumeExperience}
            imageURL={resume.imageURL}
            totalExperiencesNumber={experiences?.length}
            toast={toast}
          />
        );
      })}
    </div>
  );
};

export default ResumeList;
