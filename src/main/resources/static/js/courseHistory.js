const url = "http://localhost:8080";

document
  .querySelector("#courseHistoryTabMenu01")
  .addEventListener("click", (e) => {
    // console.log("tab01 clicked!!");

    document.querySelector(".myCourseWrap01").classList.remove("hidden");
    document.querySelector(".myCourseWrap02").classList.add("hidden");
  });

document
  .querySelector("#courseHistoryTabMenu02")
  .addEventListener("click", (e) => {
    // console.log("tab02 clicked!!");

    document.querySelector(".myCourseWrap01").classList.add("hidden");
    document.querySelector(".myCourseWrap02").classList.remove("hidden");
  });
