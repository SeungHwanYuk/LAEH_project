const urlCurrent = "/user/current";
const urlSignup = "/user/signup";

const urlLogin = "/user/login";
const urlLogout = "/user/logout";

const urlAll = "/user/allbydto";

// 회원정보 수정 승환 0620
let currentUserId = "";
let newPassword = "";
let newUserEmail = "";
let newUserName = "";
let newUserGender = "male";
let newUserNickname = "";
let newUserPhoneNum = "";

// --------------유효성검사(20240620 윤별꺼 긁어옴)-----------------
// ID
// 1.4~12글자 이내
// 2.영어 또는 숫자
// PW
// 1.8글자 이상
// 2.영문 숫자 특수문자 포함
// 3.비밀번호 확인 시 일치

let elInputUsername = currentUserId;

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

// document.querySelector("#newUserId").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   newUserId = e.target.value;
// });

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
    userId: currentUserId,
    password: newPassword,
    userEmail: newUserEmail,
    userName: newUserName,
    gender: newUserGender,
    userNickname: newUserNickname,
    phoneNum: newUserPhoneNum,
  };
  console.log(data.userId);
  const urlUserUpdate = "/user/update/" + data.userId;
  axios
    .get(urlAll)
    .then((response) => {
      console.log("데이터 : ", response);

      for (let i = 0; i < response.data.length; i++) {
        let test = response.data[i];

        if (data.password == checkPassword) {
          console.log("data : ", data);
          axios
            .put(urlUserUpdate, data, { withCredentials: true })
            .then((response) => {
              alert(`수정 되었습니다., ${response.data}`);
              window.location.href = "myPage.html";
            })
            .catch((error) => {
              console.error("urlSignup 에러 발생:", error.response.data);
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

// 읽기전용 유저아이디 승환 0625
let readonlyUserId = document.getElementById("currentUserId");

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
          console.log("readonlyUserId 데이터 :", readonlyUserId);
          currentUserId = response.data.userId;
          readonlyUserId.placeholder = currentUserId;

          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
          // document.querySelector(".signupGroup").textContent =
          // response.data.userId;
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
      alert("로그인이 필요합니다.");
      href = "login.html";
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
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});
sessionCurrent();
