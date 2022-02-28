// UI function for fold/unfold side panel
// https://codepen.io/DeolaJ/pen/xvjbKY

export function changeMenuIcon (sidebar, collapseBtn) {
  if (sidebar.classList.contains("open")) {
    // change the icon from "menu" to "right-padded menu"
    collapseBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    collapseBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}


document.getElementById("lastModified").innerHTML = document.lastModified;
