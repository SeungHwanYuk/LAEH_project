const urlSignup = "/user/signup";
const urlAll = "/user/allbydto";
const urlCurrent = "/user/current";

// const genders = {
//   MEN: "남자",
//   WOMEN: "여자",
// };
// Object.freeze(genders);

let newUserId = "";
let newPassword = "";
let newUserEmail = "";
let newUserName = "";
let newUserGender = "male";
let newUserNickname = "";
let newUserPhoneNum = "";

// --------------유효성검사(20240614윤별작업)-----------------
// ID
// 1.4~12글자 이내
// 2.영어 또는 숫자
// PW
// 1.8글자 이상
// 2.영문 숫자 특수문자 포함
// 3.비밀번호 확인 시 일치

let elInputUsername = document.querySelector("#newUserId");

let elSuccessMessage = document.querySelector(".successMessage");

let elFailureMessage = document.querySelector(".lengthMessage");

let elFailureMessageTwo = document.querySelector(".conditionErrorMessage");

let elInputPassword = document.querySelector("#newPassword");

let elInputPasswordRetype = document.querySelector("#checkPassword");

let elMismatchMessage = document.querySelector(".mismatchMessage");

let elStrongPasswordMessage = document.querySelector(
  ".conditionWarningMessage"
);

function idLength(value) {
  // if (value.length >= 4 && value.length <= 12) {
  //   return true;
  // } else {
  //   return false;
  // }
  return value.length >= 4 && value.length <= 12;
}

function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    str
  );
}

function isMatch(password1, password2) {
  return password1 === password2;
}

elInputUsername.onkeyup = function () {
  if (elInputUsername.value.length !== 0) {
    if (onlyNumberAndEnglish(elInputUsername.value) === false) {
      elSuccessMessage.classList.add("hidden");
      elFailureMessage.classList.add("hidden");
      elFailureMessageTwo.classList.remove("hidden");
      userId.focus();
      return false;
    } else if (idLength(elInputUsername.value) === false) {
      elSuccessMessage.classList.add("hidden");
      elFailureMessage.classList.remove("hidden");
      elFailureMessageTwo.classList.add("hidden");
    } else if (
      idLength(elInputUsername.value) ||
      onlyNumberAndEnglish(elInputUsername.value)
    ) {
      elSuccessMessage.classList.remove("hidden");
      elFailureMessage.classList.add("hidden");
      elFailureMessageTwo.classList.add("hidden");
    }
  } else {
    elSuccessMessage.classList.add("hidden");
    elFailureMessage.classList.add("hidden");
    elFailureMessageTwo.classList.add("hidden");
  }
};

elInputPassword.onkeyup = function () {
  if (elInputPassword.value.length !== 0) {
    if (strongPassword(elInputPassword.value)) {
      elStrongPasswordMessage.classList.add("hidden");
    } else {
      elStrongPasswordMessage.classList.remove("hidden");
    }
  } else {
    elStrongPasswordMessage.classList.add("hidden");
  }
};

elInputPasswordRetype.onkeyup = function () {
  if (elInputPasswordRetype.value.length !== 0) {
    if (isMatch(elInputPassword.value, elInputPasswordRetype.value)) {
      elMismatchMessage.classList.add("hidden");
    } else {
      elMismatchMessage.classList.remove("hidden");
    }
  } else {
    elMismatchMessage.classList.add("hidden");
  }
};

// ----------------------

document.querySelector("#newUserId").addEventListener("change", (e) => {
  console.log(e.target.value);
  newUserId = e.target.value;
});

document.querySelector("#newPassword").addEventListener("change", (e) => {
  console.log(e.target.value);
  newPassword = e.target.value;
});
let checkPassword = "";
document.querySelector("#checkPassword").addEventListener("change", (e) => {
  console.log(e.target.value);
  checkPassword = e.target.value;
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

document.querySelector(".loginBtn").addEventListener("click", () => {
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
    .get(urlAll)
    .then((response) => {
      console.log("데이터 : ", response.data);

      // response.data.forEach((e) => {
      // console.log(data.userId);
      // console.log(e.userId);
      // console.log(e.password);
      // console.log(checkPassword);
      // if (data.userId != e.userId && data.password == checkPassword) {
      //   axios
      //     .post(urlSignup, data, { withCredentials: true })
      //     .then((response) => {
      //       // if (data.userId != "" && data.password != "") {}
      //       alert(`회원가입 되었습니다., ${response.data}`);
      //       window.location.href = "signupSuccess.html";
      //     })
      //     .catch((error) => {
      //       console.log("에라 발생 : ", error);
      //     });
      // }

      for (let i = 0; i < response.data.length; i++) {
        let test = response.data[i];

        if (
          data.userId != test.userId &&
          data.password == checkPassword &&
          idLength(data.userId)
        ) {
          console.log("asdasd");
          axios
            .post(urlSignup, data, { withCredentials: true })
            .then((response) => {
              alert(`회원가입 되었습니다., ${response.data}`);
              window.location.href = "signupSuccess.html";
            })
            .catch((error) => {
              console.error("에러 발생:", error.response.data);
            });
          return data;
        } else {
          // alert("입력하신 아이디가 이미 존재합니다.");
          // alert("오류");
          break;
        }
      }

      if (data.userId == "" && data.password == "" && data.userName == "") {
        alert("필수입력란을 확인해주세요.");
      } else if (!isMatch(data.password, checkPassword)) {
        alert("비밀번호가 일치하지 않습니다.");
      }
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
});
// });

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.status == 200) {
        console.log("세션 유지");
        if (response.status == 200) {
          // document.querySelector(".singup-box p").textContent =
          //   response.data.userId + "님, 환영합니다.";
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
}

// function sessionCurrent() {
//   // 로그인 유지 확인 코드
//   axios
//     .get(urlCurrent, { withCredentials: true })
//     .then((response) => {
//       console.log("데이터", response);
//       if (response.data.userId == "anonymousUser") {
//         alert("로그인이 필요합니다.");
//         window.location.href = "login.html";
//       } else {
//         //   if (response.data.userId != "anonymousUser") {
//         console.log("세션 유지");
//         if (response.status == 200) {
//           console.log(response.data.userId + "님, 환영합니다.");
//           document.querySelector(".logout").classList.remove("hidden");
//           document.querySelector(".login").classList.add("hidden");
//           document.querySelector(".join").classList.add("hidden");
//         }
//       }
//     })
//     .catch((error) => {
//       console.log("에러 발생", error);
//     });
// }

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

sessionCurrent();
