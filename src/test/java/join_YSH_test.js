const urlSignup = "http://localhost:8080/user/signup";

// const genders = {
//   MEN: "남자",
//   WOMEN: "여자",
// };
// Object.freeze(genders);

let newUserId = "";
let newPassword = "";
let newUserEmail = "";
let newUserName = "";
let newUserGender = "";
let newUserNickname = "";
let newUserPhoneNum = "";

document.querySelector("#newUserId").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserId = e.target.value;
});

document.querySelector("#newPassword").addEventListener("change", (e) => {
  console.log(e.target.value);
  newPassword = e.target.value;
});
document.querySelector("#newUserEmail").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserEmail = e.target.value;
});
document.querySelector("#newUserName").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserName = e.target.value;
});
document.querySelector("#newUserGender").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserGender = e.target.value;
});
document.querySelector("#newUserNickname").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserNickname = e.target.value;
});
document.querySelector("#newUserPhoneNum").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserPhoneNum = e.target.value;
});

// 회원가입

document.querySelector(".signupInputBtn").addEventListener("click", () => {
  const data = {
    userId: newUserId,
    password: newPassword,
    userEmail: newUserEmail,
    userName: newUserName,
    gender: newUserGender,
    userNickname: newUserNickname,
    phoneNum: newUserPhoneNum,
  };

  axios
    .post(urlSignup, data, { withCredentials: true })
    .then((response) => {
      if (data.userId != "" && data.password != "") {
        console.log("데이터 : ", response);
        alert("회원가입 되었습니다.");
      } else {
        // if (data.userId == "" && data.password == "") {
        alert("아이디와 패스워드는 필수사항 입니다.");
      }
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
});

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.status == 200) {
        console.log("세션 유지");
        if (response.status == 200) {
          document.querySelector("singup-box p").textContent =
            response.data.userId + "님, 환영합니다.";
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
}

sessionCurrent();
