function showScreen(screenName) {

// Hide all screens
document.querySelectorAll(".screen").forEach(screen => {
  screen.style.display = "none";
});

// Show selected screen
document.getElementById(screenName).style = "block";
}
