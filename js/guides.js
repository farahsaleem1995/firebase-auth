import { db } from "./firebase-init.js";
const guides = db.collection("guides");

export let unsubscribe = () => {};

export const getGuides = (callback) => {
  unsubscribe = guides.onSnapshot(
    (snapshot) => {
      callback(snapshot.docs);
    },
    (err) => {
      console.log(`${err.code}:`, err.message);
    }
  );
};

export const addGuide = (guide, callback) => {
  guides
    .add({
      title: guide.title,
      content: guide.content,
    })
    .then((docRef) => {
      callback(docRef);
    })
    .catch((err) => {
      console.log(`${err.code}:`, err.message);
    });
};
