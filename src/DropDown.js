function initialHidding() {
  const dropDowns = document.querySelectorAll(".drop-down-menu");
  dropDowns.forEach((dropDown) => (dropDown.style.visibility = "hidden"));
}

function addDropDowns() {
  const menus = Array.from(document.getElementsByClassName("drop-down"));
  menus.forEach((element) => {
    addDropDown(element);
  });
}

function addDropDown(element) {
  const button = element.querySelector(".drop-down-menu-button");
  const menu = element.querySelector(".drop-down-menu");

  button.addEventListener("click", () => {
    menu.style.visibility === "hidden"
      ? (menu.style.visibility = "visible")
      : (menu.style.visibility = "hidden");
  });
}

function createDropDownMenus() {
  initialHidding();
  addDropDowns();
}

export default createDropDownMenus;
