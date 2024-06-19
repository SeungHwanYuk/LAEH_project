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

const urlCurrent = "http://localhost:8080/user/current";

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else {
        //   if (response.data.userId != "anonymousUser") {
        console.log("세션 유지");
        if (response.status == 200) {
          console.log(response.data.userId + "님, 환영합니다.");
          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
}

sessionCurrent();
