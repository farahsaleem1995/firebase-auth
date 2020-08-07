import materilize, { closeModal } from "./materialize.js";
import {
  signUp,
  signIn,
  signOut,
  onAuthStatechanged,
  addAdminRole,
  setClaims,
} from "./user.js";
import { getGuides, addGuide } from "./guides.js";
import { setupGuides, setupUI, setFormErrorMsg } from "./util.js";

const signUpForm = document.querySelector("#signup-form");
const signInForm = document.querySelector("#login-form");
const signOutBtn = document.querySelector("#logout");

const createFrom = document.querySelector("#create-form");

const adminForm = document.querySelector(".admin-actions");

onAuthStatechanged((user) => {
  if (user) {
    setClaims(user, (updatedUser) => {
      setupUI(updatedUser);
    });
    getGuides(setupGuides);
  } else {
    setupUI(user);
    setupGuides([]);
  }
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  const bio = signUpForm["signup-bio"].value;

  signUp(
    email,
    password,
    { bio: bio },
    (user) => {
      if (user) {
        closeModal(signUnForm, "modal-signup");
      }
    },
    (err) => {
      setFormErrorMsg(signUpForm, err.message);
    }
  );
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  signIn(
    email,
    password,
    (user) => {
      if (user) {
        closeModal(signInForm, "modal-login");
      }
    },
    (err) => {
      setFormErrorMsg(signInForm, err.message);
    }
  );
});

signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  signOut((success) => {
    if (success) {
      console.log("User signed out.");
    }
  });
});

createFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  const guide = {
    title: createFrom["title"].value,
    content: createFrom["content"].value,
  };
  addGuide(guide, (ref) => {
    if (ref) {
      closeModal(createFrom, "modal-create");
    }
  });
});

adminForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector("#admin-email").value;
  addAdminRole(adminEmail);
});

materilize();
