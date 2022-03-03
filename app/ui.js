export function changeMenuIcon (sidebar, collapseBtn) {
  if (sidebar.classList.contains("open")) {
    // change the icon from "menu" to "right-padded menu"
    collapseBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    collapseBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

document.getElementById("lastModified").innerHTML = document.lastModified;

// Show sidePanel again if folded
// do not use it when users are changing buffer variables only
export function showSidePanel () {
  const sidebar = document.querySelector(".sidebar");

  // If a class that the element is already a member of is added, classList.add will ignore it
  sidebar.classList.add("open");
}
