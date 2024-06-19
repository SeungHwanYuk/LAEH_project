const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlCurrent = "http://localhost:8080/user/current";

let userId = "";
let password = "";

document.querySelector(".userId").addEventListener("change", (e) => {
  console.log(e.target.value);
  userId = e.target.value;
});

document.querySelector(".password").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector(".loginBtn").addEventListener("click", () => {
  // 로그인 버튼
  const data = {
    userId: userId,
    password: password,
  };
  axios
    .post(urlLogin, data, { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response);
      sessionCurrent();
      alert("로그인이 완료되었습니다.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
      alert("아이디 혹은 패스워드를 확인해주세요.");
    });
});

document.querySelector(".logout").addEventListener("click", () => {
  // 로그아웃 버튼
  if (confirm("로그아웃 하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
        if (response.status == 200) {
          alert = "로그아웃 되었습니다.";
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

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

function enterkey() {
  if (window.event.keyCode == 13) {
    // 로그인 버튼
    const data = {
      userId: userId,
      password: password,
    };
    axios
      .post(urlLogin, data, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
        sessionCurrent();
        alert("로그인이 완료되었습니다.");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.log("에러 발생 : ", error);
        alert("아이디 혹은 패스워드를 확인해주세요.");
      });
    // window.location.href = "index.html";
    console.log("click enter");
  }
}
sessionCurrent();
