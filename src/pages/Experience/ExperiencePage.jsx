import { useEffect, useState } from "react";
import Experience from "../../components/Experience/Experience";
import AddExperienceButtonModal from "./AddExperienceButtonModal";
import { ToastContainer, toast } from "react-toastify";

import * as FirestoreService from "../../services/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const ExperiencePace = () => {
  const [user, loading] = useAuthState(auth);
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    const unsubscribe = FirestoreService.listenToExperienceUpdates(
      user,
      (querySnapshot) => {
        const experienceData = querySnapshot.docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          };
        });
        setExperiences(experienceData);
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, [user, loading]);

  return (
    <div className="px-4 pt-5 container">
      <ToastContainer />
      <h2 className="pb-2 border-bottom text-start d-flex justify-content-between">
        <span>Experiențe </span>
        <AddExperienceButtonModal toast={toast} />
      </h2>
      {experiences?.map((experience) => {
        return (
          <Experience
            key={experience.id}
            id={experience.id}
            author={experience.author}
            companyName={experience.companyName}
            jobTitle={experience.jobTitle}
            location={experience.location}
            startDate={experience.startDate}
            isPresent={experience.isPresent}
            endDate={experience.endDate}
            description={experience.description}
            toast={toast}
            controls={true}
          />
        );
      })}
    </div>
  );
};

export default ExperiencePace;
