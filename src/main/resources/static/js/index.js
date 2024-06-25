const urlCurrent = "http://localhost:8080/user/current";
const urlLogout = "http://localhost:8080/user/logout";

document.querySelector(".redBtn").addEventListener("click", (e) => {
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId != "anonymousUser") {
        console.log("세션 유지");
        window.location.href = "courseHistory.html";
      } else {
        window.location.href = "#sub";
      }
    })
    .catch((error) => {
      console.log("urlCurrent 에러 발생", error);
    });
});

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId != "anonymousUser") {
        console.log("세션 유지");
        if (
          response.status == 200 &&
          response.data.authority[0].authority != "ROLE_ADMIN"
        ) {
          console.log(response.data.userId + "님, 환영합니다.");
          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
          document.querySelector(".navMenuAdmin").classList.add("hidden");
        } else if (
          response.status == 200 &&
          response.data.authority[0].authority == "ROLE_ADMIN"
        ) {
          console.log(response.data.userId + "`(｡•̀ᴗ-)✧☆ 관리자 모드 ON!");
          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
          document.querySelector(".navMenuAdmin").classList.remove("hidden");
        }
      }
    })
    .catch((error) => {
      console.log(" urlCurrent 에러 발생", error);
    });
}

document.querySelector(".logout").addEventListener("click", () => {
  // 로그아웃 버튼
  if (confirm("로그아웃 하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
        if (response.status == 200) {
          alert = "로그아웃 되었습니다.";
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

sessionCurrent();
