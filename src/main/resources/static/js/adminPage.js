const urlLogin = "http://localhost:8080/user/login";
const urlCurrent = "http://localhost:8080/user/current";
const urlLogout = "http://localhost:8080/user/logout";

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId == "anonymousUser") {
        alert("어떠케들어왔어!!!!!!!!!!!나가아아아아ㅏ아아아ㅏ아아앙!");
        window.location.href = "index.html";
      } else if (
        response.status == 200 &&
        response.data.authority[0].authority != "ROLE_ADMIN"
      ) {
        alert("관리자가 아니시네요?? 나가아아아앙ㄲㄲㄲㄲㄲㄲㄲ!!!!!!!!");
        window.location.href = "index.html";
      } else if (
        response.status == 200 &&
        response.data.authority[0].authority == "ROLE_ADMIN"
      ) {
        console.log(response.data.userId + " 관리자입니다!");
        document.querySelector(".logout").classList.remove("hidden");
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".join").classList.add("hidden");
        document.querySelector(".navMenuAdmin").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
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
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

sessionCurrent();
