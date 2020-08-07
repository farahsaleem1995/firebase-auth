import { setFormErrorMsg } from "./util.js";

const setup = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
  });
};

export const closeModal = (form, modalId) => {
  const modal = document.querySelector(`#${modalId}`);

  M.Modal.getInstance(modal).close();
  form.reset();

  setFormErrorMsg(form, "");
};

export default setup;
