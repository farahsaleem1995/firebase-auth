import { db, auth, functions } from "./firebase-init.js";
import { unsubscribe } from "./guides.js";

const users = db.collection("users");

export const signUp = (email, password, properties, callback, errCallback) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      users
        .doc(cred.user.uid)
        .set({
          bio: properties.bio,
        })
        .then(() => {
          callback(cred.user);
        });
    })
    .catch((err) => {
      errCallback(err);
    });
};

export const signIn = (email, password, callback, errCallback) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      callback(cred.user);
    })
    .catch((err) => {
      errCallback(err);
    });
};

export const signOut = (callback) => {
  auth
    .signOut()
    .then(() => {
      callback(true);
    })
    .catch((err) => {
      console.log(`${err.code}:`, err.message);
    });
};

export const getUser = (uid, callback) => {
  users
    .doc(uid)
    .get()
    .then((doc) => {
      callback(doc.data());
    })
    .catch((err) => {
      console.log(`${err.code}:`, err.message);
    });
};

export const setClaims = (user, callback) => {
  user.getIdTokenResult().then((idTokenResult) => {
    user.admin = idTokenResult.claims.admin;
    callback(user);
  });
};

export const addAdminRole = (email) => {
  const addAdminRoleCloudFunction = functions.httpsCallable("addAdminRole");
  addAdminRoleCloudFunction({ email: email }).then((result) => {
    console.log(result);
  });
};

export const onAuthStatechanged = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      callback(user);
    } else {
      unsubscribe();

      callback(null);
    }
  });
};
