const urlCurrent = "http://localhost:8080/user/current";
const urlsaveMemo = "http://localhost:8080/memo/save";
const urldeleteMemo = "http://localhost:8080/memo/delete/"; // {memoId}
const urlListMemoByUserId = "http://localhost:8080/memo/user/"; // {userId}
const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlSearchCalorie = "http://localhost:8080/cal/contain/"; // {foodName}

let currentUserId;
let memoText = "";
let foodNameText = "";

document.querySelector("#carlorieTabMenu01").addEventListener("click", (e) => {
  console.log("tab01 일기장 clicked!!");

  document.querySelector(".carlorieWrap01").classList.remove("hidden");
  document.querySelector(".carlorieWrap02").classList.add("hidden");
  document.querySelector(".historyTextP01").classList.add("historyTextFocus");
  document
    .querySelector(".historyTextP02")
    .classList.remove("historyTextFocus");
});

document.querySelector("#carlorieTabMenu02").addEventListener("click", (e) => {
  console.log("tab02 칼로리 검색 clicked!!");

  document.querySelector(".carlorieWrap01").classList.add("hidden");
  document.querySelector(".carlorieWrap02").classList.remove("hidden");
  document.querySelector(".historyTextP02").classList.add("historyTextFocus");
  document
    .querySelector(".historyTextP01")
    .classList.remove("historyTextFocus");
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
        window.location.reload();
      })
      .catch((error) => {
        console.log("urlsaveMemo 에러발생", error);
      });
  }
});

// 음식명으로 칼로리 검색 // 엔터키???????????작동안댐 ㅠㅠㅠ
function enterkey() {
  if (window.event.keyCode == 13) {
    // 모든 자식 삭제 (페이지 초기화)
    let removeNodes = document.querySelector(".calorieBody");
    while (removeNodes.firstChild) {
      removeNodes.removeChild(removeNodes.firstChild);
    }
    //
    axios
      .get(urlSearchCalorie + foodNameText, { withCredentials: true })
      .then((response) => {
        document.querySelector(".calorieTable").classList.remove("hidden");
        console.log("데이터 : ", response);
        displayCalorieList(response.data);
      })
      .catch((error) => {
        console.log("urlsaveMemo 에러발생", error);
        alert("정보를 입력해주세요.");
      });
  }
}

document.querySelector(".foodSearchBtn").addEventListener("click", (e) => {
  // 모든 자식 삭제 (페이지 초기화)
  let removeNodes = document.querySelector(".calorieBody");
  while (removeNodes.firstChild) {
    removeNodes.removeChild(removeNodes.firstChild);
  }
  //
  axios
    .get(urlSearchCalorie + foodNameText, { withCredentials: true })
    .then((response) => {
      document.querySelector(".calorieTable").classList.remove("hidden");
      console.log("데이터 : ", response);
      displayCalorieList(response.data);
    })
    .catch((error) => {
      console.log("urlsaveMemo 에러발생", error);
      alert("정보를 입력해주세요.");
    });
});

function displayCalorieList(foods) {
  const tbody = document.querySelector(".calorieBody");
  foods.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const foodName = document.createElement("td");
    const cal = document.createElement("td");
    const carbohydrate = document.createElement("td");
    const protein = document.createElement("td");
    const fat = document.createElement("td");
    const cholesterol = document.createElement("td");
    const dietaryFiber = document.createElement("td");
    const sodium = document.createElement("td");
    // 클래스 이름 생성

    tr.classList.add("calorieTr");
    // 태그 속성 추가
    foodName.textContent = data.foodName;
    cal.textContent = data.cal;
    carbohydrate.textContent = data.carbohydrate;
    protein.textContent = data.protein;
    fat.textContent = data.fat;
    cholesterol.textContent = data.cholesterol;
    dietaryFiber.textContent = data.dietaryFiber;
    sodium.textContent = data.sodium;
    // appendChild 부모,자식 위치 설정

    tr.appendChild(foodName);
    tr.appendChild(cal);
    tr.appendChild(carbohydrate);
    tr.appendChild(protein);
    tr.appendChild(fat);
    tr.appendChild(cholesterol);
    tr.appendChild(dietaryFiber);
    tr.appendChild(sodium);
    tbody.appendChild(tr);
  });
}

// 아이디별 메모 가져오기
function getListMemoByUserId(userId) {
  axios
    .get(urlListMemoByUserId + userId, { withCredentials: true })
    .then((response) => {
      console.log(" urlListMemoByUserId 데이터 : ", response.data);
      displayMemoList(response.data);
    })
    .catch((error) => {
      console.log(" urlListMemoByUserId 에러발생 : ", error);
    });
}

function displayMemoList(memos) {
  // 모든 자식 삭제 (페이지 초기화)
  let removeNodes = document.querySelector(".memoBody");
  while (removeNodes.firstChild) {
    removeNodes.removeChild(removeNodes.firstChild);
  }
  //
  const tbody = document.querySelector(".memoBody");
  memos.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const memoNum = document.createElement("td");
    const memoText = document.createElement("td");
    const memoDateTime = document.createElement("td");

    // 클래스 이름 생성

    tr.classList.add("memoTr");
    // 태그 속성 추가
    memoNum.textContent = index + 1;
    memoText.textContent = data.memoText;
    memoDateTime.textContent = data.memoDateTime.substring(0, 10);

    // appendChild 부모,자식 위치 설정
    tr.appendChild(memoNum);
    tr.appendChild(memoText);
    tr.appendChild(memoDateTime);
    tbody.appendChild(tr);
  });
}

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
          getListMemoByUserId(currentUserId);
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
}

// 로그아웃 버튼
document.querySelector(".logout").addEventListener("click", () => {
  if (confirm("로그아웃 하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
        if (response.status == 200) {
          alert = "로그아웃 되었습니다.";
          window.location.href = "login.html";
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

sessionCurrent();
