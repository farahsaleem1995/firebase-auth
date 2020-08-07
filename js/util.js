import { getUser } from "./user.js";

const guideList = document.querySelector(".guides");
const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const adminItems = document.querySelectorAll(".admin");
const accountDetails = document.querySelector(".account-details");

// Setup guides
export const setupGuides = (data) => {
  let html = "";

  if (data.length > 0) {
    data.forEach((guide) => {
      const li = `
      <li>
        <div class="collapsible-header white lighten-3">${
          guide.data().title
        }</div>
        <div class="collapsible-body grey darken-1 white-text">${
          guide.data().content
        }</div>
      </li>
      `;

      html += li;
    });
  } else {
    html = `
    <h5 class="center-align">Login to view guides</h5>
    `;
  }

  guideList.innerHTML = html;
};

export const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = "block"));
    }

    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));

    getUser(user.uid, (data) => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${data.bio}</div>
        <div class="teal-text">${user.admin ? "Admin" : ""}</div>
      `;
      accountDetails.innerHTML = html;
    });
  } else {
    adminItems.forEach((item) => (item.style.display = "none"));

    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));

    accountDetails.innerHTML = "";
  }
};

export const setFormErrorMsg = (form, msg) => {
  form.querySelector(".error").innerHTML = msg;
};
