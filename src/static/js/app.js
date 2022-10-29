document.getElementById("cars").addEventListener("click", ({ target }) => {
  if (target.classList.contains("more")) {
    const description = target.parentElement.querySelector(".description");
    if (description.style.display == "block") {
      description.style.display = "none";
      target.textContent = "Show More";
    } else {
      description.style.display = "block";
      target.textContent = "Hide";
    }
  }
});
