const urlCurrent = "http://localhost:8080/user/current";
const urlsaveMemo = "http://localhost:8080/memo/save";
const urlSearchCalorie = "http://localhost:8080/cal/contain/";

let currentUserId;
let memoText = "";
let foodNameText = "";

document.querySelector("#carlorieTabMenu01").addEventListener("click", (e) => {
  console.log("tab01 일기장 clicked!!");

  document.querySelector(".carlorieWrap01").classList.remove("hidden");
  document.querySelector(".carlorieWrap02").classList.add("hidden");
});

document.querySelector("#carlorieTabMenu02").addEventListener("click", (e) => {
  console.log("tab02 칼로리 검색 clicked!!");

  document.querySelector(".carlorieWrap01").classList.add("hidden");
  document.querySelector(".carlorieWrap02").classList.remove("hidden");
});

document.querySelector("#newMemoText").addEventListener("change", (e) => {
  console.log(e.target.value);
  memoText = e.target.value;
});
document.querySelector("#newFoodNameText").addEventListener("change", (e) => {
  console.log(e.target.value);
  foodNameText = e.target.value;
});

// 메모 저장
document.querySelector(".memoSaveBtn").addEventListener("click", (e) => {
  if (confirm("메모를 등록할거냐 묻고있다.")) {
    let data = {
      userId: currentUserId,
      memoText: memoText,
    };
    axios
      .post(urlsaveMemo, data, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
      })
      .catch((error) => {
        console.log("urlsaveMemo 에러발생", error);
      });
  }
});

// 음식명으로 칼로리 검색
document.querySelector(".foodSearchBtn").addEventListener("click", (e) => {
  axios
    .get(urlSearchCalorie + foodNameText, { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response);
    })
    .catch((error) => {
      console.log("urlsaveMemo 에러발생", error);
    });
});

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
          currentUserId = response.data.userId;
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
