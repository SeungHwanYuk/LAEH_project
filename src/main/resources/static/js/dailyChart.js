const url = "http://localhost:8080";

document.querySelector("#carlorieTabMenu01").addEventListener("click", (e) => {
  // console.log("tab01 clicked!!");

  document.querySelector(".carlorieWrap01").classList.remove("hidden");
  document.querySelector(".carlorieWrap02").classList.add("hidden");
});

document.querySelector("#carlorieTabMenu02").addEventListener("click", (e) => {
  // console.log("tab02 clicked!!");

  document.querySelector(".carlorieWrap01").classList.add("hidden");
  document.querySelector(".carlorieWrap02").classList.remove("hidden");
});
