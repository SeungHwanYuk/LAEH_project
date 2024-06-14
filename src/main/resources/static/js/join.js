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
    .post(urlSignup, data, { withCredentials: true })
    .then((response) => {
      if (data.userId != "" && data.password != "") {
        console.log("데이터 : ", response);
        // alert("회원가입 되었습니다.");
        window.location.href = "signupSuccess.html";
      } else if (data.userId == "" && data.password == "") {
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
