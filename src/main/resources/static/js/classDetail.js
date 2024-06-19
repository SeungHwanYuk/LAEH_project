const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const url = "http://localhost:8080/contents/" + id;
const urlUpdateCount = "http://localhost:8080/contents/count/" + id;
const urlBuyContents = "http://localhost:8080/subscribe/buy";

let userId;
let contentsId = id;
axios
  .get(url)
  .then((response) => {
    console.log("데이터 : " + response.data);

    displayContents(response.data);
    displayLectureImg(response.data.lectureId);
    contentsClickedCount(response.data.lectureId);
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

function displayContents(data) {
  const content = document.querySelector(".content");
  // const content = document.createElement("div");
  const img = document.createElement("img");
  const contentsName = document.createElement("p");
  const contentsText = document.createElement("p");
  const lectureDesc = document.createElement("p");
  // const lectureInfoImg = document.createElement("img");

  // content.classList.add("contents");
  img.classList.add("detailImage");
  contentsText.classList.add("classDetailDesc");
  contentsName.classList.add("classDetailTitle");
  lectureDesc.classList.add("classDetailInfo");
  // lectureInfoImg.add("lectureInfoImg");

  img.src = data.contentsImage;
  contentsText.textContent = data.contentsText;
  contentsName.textContent = data.contentsName;
  lectureDesc.textContent = data.lectureDesc;
  // lectureInfoImg.src = data.lectureInfoImg;

  content.appendChild(img);
  content.appendChild(contentsText);
  content.appendChild(contentsName);
  content.appendChild(lectureDesc);
  // content.appendChild(lectureInfoImg);

  document.querySelector(".addCartBtn").addEventListener("click", () => {
    if (confirm("장바구니?")) {
      buyOne();
    }
  });
  // sessionCurrent(data);
}

function buyOne() {
  const data2 = {
    contentsId: { contentsId: contentsId },
    userId: { userId: userId },
  };
  console.log("data2 : ", data2);
  axios
    .post(urlBuyContents, data2, { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response.data);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else {
        console.log("세션유지urlBuyContents성공");
      }
    })
    .catch((error) => {
      console.log("에러 발생이지만 DB에는 정상적으로 들어감 : ", error);
    });
}

// 구매
// function sessionCurrent(data) {
//   axios
//     .post(urlBuyContents, data, { withCredentials: true })
//     .then((response) => {
//       console.log("데이터 : ", response.data);
//       if (response.data.userId == "anonymousUser") {
//         alert("로그인이 필요합니다.");
//         window.location.href = "login.html";
//       } else {
//         console.log("세션유지, 구매 완료");
//       }
//     })
//     .catch((error) => {
//       console.log("에러 발생 : ", error);
//     });
// }

// 장바구니 담기 // 0619 리스트 저장 시 수정필요
function sessionCurrent(data) {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response.data);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else {
        console.log("세션유지");
        const userId = response.data.userId;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (!cartItems) {
          cartItems = [];
        }
        cartItems.push(data);
        localStorage.setItem(userId, JSON.stringify(cartItems));
        alert("장바구니에 담겼습니다.");
      }
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
      alert("로그인이 필요합니다.");
      href = "login.html";
    });
}

// 조회 수 카운트
function contentsClickedCount(data) {
  axios
    .put(urlUpdateCount, data)
    .then((response) => {
      console.log("데이타 : ", response.data);
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
}

// 상세페이지의 강의이미지 불러오기
function displayLectureImg(data) {
  let strH = "H";
  let strY = "Y";
  let strP = "P";
  const lectureId = data.lectureId;
  // console.log(lectureId);
  const detailImageWrap = document.querySelector(".detailImageWrap");
  if (lectureId == strH) {
    detailImageWrap.querySelector(".detailImage01").classList.remove("hidden");
  } else {
    if (lectureId == strP) {
      // 필라테스 이미지 히든 삭제
      detailImageWrap
        .querySelector(".detailImage03")
        .classList.remove("hidden");
    } else {
      if (lectureId == strY) {
        // 요가 이미지 히든 삭제
        detailImageWrap
          .querySelector(".detailImage02")
          .classList.remove("hidden");
      }
    }
  }
}

const urlCurrent = "http://localhost:8080/user/current";

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      userId = response.data.userId;
      console.log("데이터", response);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else {
        //   if (response.data.userId != "anonymousUser") {
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
    });
}
sessionCurrent();
