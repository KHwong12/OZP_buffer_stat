// UI function for fold/unfold side panel
// https://codepen.io/DeolaJ/pen/xvjbKY

document.addEventListener("DOMContentLoaded", function() {

  const sidebar = document.querySelector(".contentDiv");
  const mainContent = document.querySelector('.viewDiv');

  document.querySelector('.fold-button').onclick = function () {

    sidebar.classList.toggle('contentDiv_fold');
    mainContent.classList.toggle('viewDiv_large');

  };

});
