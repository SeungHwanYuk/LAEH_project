const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlCurrent = "http://localhost:8080/user/current";

// let userId = "";
// let password = "";

// document.querySelector(".userId").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   userId = e.target.value;
// });

// document.querySelector(".password").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   password = e.target.value;
// });

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId != "anonymousUser") {
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
      alert("로그인이 필요합니다.");
      href = "login.html";
    });
}

sessionCurrent();
