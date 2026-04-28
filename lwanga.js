// ===== WAIT FOR PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {

  // ===== MENU TOGGLE =====
  function toggleMenu() {
    const nav = document.getElementById("nav-list");
    if (nav) nav.classList.toggle("show");
  }

  // make toggleMenu global (for onclick)
  window.toggleMenu = toggleMenu;

  // CLOSE MENU WHEN LINK CLICKED
  const navLinks = document.querySelectorAll("#nav-list li a");
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      const nav = document.getElementById("nav-list");
      if (nav) nav.classList.remove("show");
    });
  });

  // ===== SLIDER =====
  const slides = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  // safety check (prevents crash)
  if (!slides || images.length === 0) {
    console.log("Slider not found");
    return;
  }

  let index = 0;
  let autoSlide;

  function showSlide() {
    slides.style.transform = "translateX(-" + (index * 100) + "%)";
  }

  function nextSlide() {
    index = (index + 1) % images.length;
    showSlide();
  }

  function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide();
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000); // slower = better control
  }

  function resetAuto() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // ===== BUTTON EVENTS (SAFE) =====
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      resetAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevSlide();
      resetAuto();
    });
  }

  startAutoSlide();

});
document.getElementById("admissionForm").addEventListener("submit", function(e){
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        school: document.getElementById("school").value,
        parent: document.getElementById("parent").value,
        phone: document.getElementById("phone").value
    };

    // Save locally (simple system)
    localStorage.setItem("admissionData", JSON.stringify(data));

    document.getElementById("successMsg").innerText = 
        "Application submitted successfully!";
});

// Download as text file
function downloadForm(){
    const data = localStorage.getItem("admissionData");

    if(!data){
        alert("Fill the form first!");
        return;
    }

    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "admission.txt";
    link.click();
}
document.getElementById("admissionForm").addEventListener("submit", function(e){
    e.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        school: document.getElementById("school").value,
        parent: document.getElementById("parent").value,
        phone: document.getElementById("phone").value
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
    .then(function(response) {
        document.getElementById("successMsg").innerText = 
            "Application sent successfully!";
    }, function(error) {
        document.getElementById("successMsg").innerText = 
            "Failed to send. Try again.";
    });
function searchSite(){
    let input = document.getElementById("searchInput").value.toLowerCase();

    if(input.includes("library") || input.includes("e-library")){
        window.location.href = "#elib";
    }
    else if(input.includes("results")){
        window.location.href = "#results";
    }
    else if(input.includes("facilities")){
        window.location.href = "#facilities";
    }
    else{
        alert("No results found");
    }
}
document.getElementById("searchInput").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchSite();
    }
});
});
