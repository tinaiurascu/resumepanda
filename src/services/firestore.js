import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  query,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const listenToResumesUpdates = (user, snapshot, error) => {
  const refCollecton = collection(db, "resumes");
  const q = query(refCollecton, where("author", "==", user.uid));

  return onSnapshot(q, snapshot, error);
};

export const listenToProfileUpdates = (user, snapshot, error) => {
  const refCollecton = collection(db, "profiles");
  const q = query(refCollecton, where("author", "==", user.uid));

  return onSnapshot(q, snapshot, error);
};

export const listenToExperienceUpdates = (user, snapshot, error) => {
  const refCollecton = collection(db, "experiences");
  const q = query(refCollecton, where("author", "==", user.uid));

  return onSnapshot(q, snapshot, error);
};

export const listenToEducationUpdates = (user, snapshot, error) => {
  const refCollecton = collection(db, "education");
  const q = query(refCollecton, where("author", "==", user.uid));

  return onSnapshot(q, snapshot, error);
};

export const getPublicResume = async (id) => {
  const resume = await getResume(id);

  const profile = await getProfile(resume.author);

  const experiences = await getAllExperiences(resume.author).then(
    (experiences) =>
      experiences.filter((experience) =>
        resume.resumeExperience.includes(experience.id)
      )
  );

  const education = await getAllEducation(resume.author);

  return {
    id,
    author: resume.author,
    imageURL: resume.imageURL,
    fullName: profile[0].fullName,
    jobTitle: profile[0].jobTitle,
    contact: profile[0].contact,
    experiences,
    education,
  };
};

export const getResume = async (resumeId) => {
  const resumeRef = doc(db, "resumes", resumeId);
  const resume = await getDoc(resumeRef);
  if (resume.exists()) {
    return resume.data();
  }
  return null;
};

export const getProfile = async (userId) => {
  const refCollecton = collection(db, "profiles");
  const q = query(refCollecton, where("author", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  });
};
export const getAllExperiences = async (userId) => {
  const refCollecton = collection(db, "experiences");
  const q = query(refCollecton, where("author", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  });
};

export const getAllEducation = async (userId) => {
  const refCollecton = collection(db, "education");
  const q = query(refCollecton, where("author", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };
  });
};

export const createExperience = async (user, content) => {
  if (content) {
    const {
      jobTitle,
      companyName,
      location,
      isPresent,
      startDate,
      endDate,
      description,
    } = content;
    const refCollecton = collection(db, "experiences");
    try {
      await addDoc(refCollecton, {
        author: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: null,
        jobTitle,
        companyName,
        location,
        isPresent,
        startDate,
        endDate,
        description,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
export const createResume = async (user, content) => {
  if (content) {
    const { resumeTitle, imageURL, resumeExperience } = content;
    const refCollecton = collection(db, "resumes");
    try {
      await addDoc(refCollecton, {
        author: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: null,
        resumeTitle,
        imageURL,
        resumeExperience,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
export const createEducation = async (user, content) => {
  if (content) {
    const { school, fieldOfStudy, degree, endDate } = content;
    const refCollecton = collection(db, "education");
    try {
      await addDoc(refCollecton, {
        author: user.uid,
        createdAt: serverTimestamp(),
        school,
        fieldOfStudy,
        degree,
        endDate,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const createAndUpdateProfile = async (user, documentId, content) => {
  const q = query(collection(db, "profiles"), where("author", "==", user.uid));
  const docs = await getDocs(q);

  if (docs.docs.length === 0) {
    await addDoc(collection(db, "profiles"), {
      author: user.uid,
      fullName: content.fullName,
      jobTitle: content.jobTitle,
      contact: content.contact,
    });
  }

  if (docs.docs.length > 0) {
    const docUpdate = {
      fullName: content.fullName,
      jobTitle: content.jobTitle,
      contact: content.contact,
    };
    const docRef = doc(db, "profiles", documentId);
    await updateDoc(docRef, docUpdate);
  }
};

export const updateExperienceDocument = async (documentId, updatedContent) => {
  const {
    jobTitle,
    companyName,
    location,
    isPresent,
    startDate,
    endDate,
    description,
  } = updatedContent;

  const docUpdate = {
    jobTitle,
    companyName,
    location,
    isPresent,
    startDate,
    endDate,
    description,
    updatedAt: serverTimestamp(),
  };
  const docRef = doc(db, "experiences", documentId);
  await updateDoc(docRef, docUpdate);
};
export const updateEducationDocument = async (documentId, updatedContent) => {
  const { school, fieldOfStudy, degree, endDate } = updatedContent;

  const docUpdate = {
    school,
    fieldOfStudy,
    degree,
    endDate,
  };
  const docRef = doc(db, "education", documentId);
  await updateDoc(docRef, docUpdate);
};

export const updateResumeDocument = async (documentId, updatedContent) => {
  const { resumeTitle, imageURL, resumeExperience } = updatedContent;

  const docUpdate = {
    resumeTitle,
    imageURL,
    resumeExperience,
    updatedAt: serverTimestamp(),
  };

  const docRef = doc(db, "resumes", documentId);
  await updateDoc(docRef, docUpdate);
};

export const deleteExperienceDocument = async (documentId) => {
  const docRef = doc(db, "experiences", documentId);
  await deleteDoc(docRef);
};
export const deleteEducationDocument = async (documentId) => {
  const docRef = doc(db, "education", documentId);
  await deleteDoc(docRef);
};
export const deleteResumeDocument = async (documentId) => {
  const docRef = doc(db, "resumes", documentId);
  await deleteDoc(docRef);
};
