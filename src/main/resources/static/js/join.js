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

// 1. 아이디 입력창 정보 가져오기
let elInputUsername = document.querySelector("#newUserId"); // input#username
// 2. 성공 메시지 정보 가져오기
let elSuccessMessage = document.querySelector(".successMessage"); // div.successMessage.hidden
// 3. 실패 메시지 정보 가져오기 (글자수 제한 4~12글자)
let elFailureMessage = document.querySelector(".lengthMessage"); // div.lengthMessage.hidden
// 4. 실패 메시지2 정보 가져오기 (영어 또는 숫자)
let elFailureMessageTwo = document.querySelector(".conditionErrorMessage"); // div.conditionErrorMessage.hidden

let elInputPassword = document.querySelector("#newPassword"); // input#password
// 2. 비밀번호 확인 입력창 정보 가져오기
let elInputPasswordRetype = document.querySelector("#checkPassword"); // input#password-retype
// 3. 실패 메시지 정보 가져오기 (비밀번호 불일치)
let elMismatchMessage = document.querySelector(".mismatchMessage"); // div.mismatchMessage.hidden
// 4. 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
let elStrongPasswordMessage = document.querySelector(
  ".conditionWarningMessage"
); // div.conditionWarningMessage.hidden

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
  // 값을 입력한 경우
  if (elInputUsername.value.length !== 0) {
    // 영어 또는 숫자 외의 값을 입력했을 경우
    if (onlyNumberAndEnglish(elInputUsername.value) === false) {
      elSuccessMessage.classList.add("hidden");
      elFailureMessage.classList.add("hidden");
      elFailureMessageTwo.classList.remove("hidden"); // 영어 또는 숫자만 가능합니다
    }
    // 글자 수가 4~12글자가 아닐 경우
    else if (idLength(elInputUsername.value) === false) {
      elSuccessMessage.classList.add("hidden"); // 성공 메시지가 가려져야 함
      elFailureMessage.classList.remove("hidden"); // 아이디는 4~12글자이어야 합니다
      elFailureMessageTwo.classList.add("hidden"); // 실패 메시지2가 가려져야 함
    }
    // 조건을 모두 만족할 경우
    else if (
      idLength(elInputUsername.value) ||
      onlyNumberAndEnglish(elInputUsername.value)
    ) {
      elSuccessMessage.classList.remove("hidden"); // 사용할 수 있는 아이디입니다
      elFailureMessage.classList.add("hidden"); // 실패 메시지가 가려져야 함
      elFailureMessageTwo.classList.add("hidden"); // 실패 메시지2가 가려져야 함
    }
  }
  // 값을 입력하지 않은 경우 (지웠을 때)
  // 모든 메시지를 가린다.
  else {
    elSuccessMessage.classList.add("hidden");
    elFailureMessage.classList.add("hidden");
    elFailureMessageTwo.classList.add("hidden");
  }
};

elInputPassword.onkeyup = function () {
  // console.log(elInputPassword.value);
  // 값을 입력한 경우
  if (elInputPassword.value.length !== 0) {
    if (strongPassword(elInputPassword.value)) {
      elStrongPasswordMessage.classList.add("hidden"); // 실패 메시지가 가려져야 함
    } else {
      elStrongPasswordMessage.classList.remove("hidden"); // 실패 메시지가 보여야 함
    }
  }
  // 값을 입력하지 않은 경우 (지웠을 때)
  // 모든 메시지를 가린다.
  else {
    elStrongPasswordMessage.classList.add("hidden");
  }
};

elInputPasswordRetype.onkeyup = function () {
  // console.log(elInputPasswordRetype.value);
  if (elInputPasswordRetype.value.length !== 0) {
    if (isMatch(elInputPassword.value, elInputPasswordRetype.value)) {
      elMismatchMessage.classList.add("hidden"); // 실패 메시지가 가려져야 함
    } else {
      elMismatchMessage.classList.remove("hidden"); // 실패 메시지가 보여야 함
    }
  } else {
    elMismatchMessage.classList.add("hidden"); // 실패 메시지가 가려져야 함
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
      } else {
        if (data.userId == "" && data.password == "") {
          alert("아이디와 패스워드는 필수사항 입니다.");
        }
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
