const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const urlCurrent = "http://localhost:8080/user/current";
const urlSubscribeCurrent = "http://localhost:8080/subscribe/current";
const url = "http://localhost:8080/contents/" + id;
const urlUpdateCount = "http://localhost:8080/contents/count/" + id;
const urlBuyContents = "http://localhost:8080/subscribe/buy";
const urlLogout = "http://localhost:8080/user/logout";

let userId;
let contentsId = id;
axios
  .get(url)
  .then((response) => {
    console.log("데이터 : ", response.data);

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

  document.querySelector(".addWishListBtn").addEventListener("click", () => {
    sessionCheckAndAddWishList(data);
  });

  document.querySelector(".lecturePlayerBtn").addEventListener("click", (e) => {
    window.location.href = "lecturePlayer.html?id=" + id;
  });

  document.querySelector(".SubscribeBtn").addEventListener("click", () => {
    if (confirm("구독하시겠습니까?")) {
      buyOne();
    }
  });
}

// 위시리스트로 가야하는데...................................승환 0620
// 성공 0625 [courseHistory.js/16]
document.querySelector(".myWishListBtn").addEventListener("click", (e) => {
  window.location.href = "courseHistory.html?action=clickCourseHistoryTab";
});

// 한개만 구매
// 0619 리스트로 저장 시 수정필요
// 0620 리스트 저장 코드 따로만들어서 해결
function buyOne() {
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      let userId = response.data.userId;
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else {
        console.log("세션유지urlCurrent성공");
      }
      const data2 = {
        contentsId: contentsId,
        userId: userId,
      };
      console.log("data2 : ", data2);
      axios
        .post(urlBuyContents, data2, { withCredentials: true })
        .then((response) => {
          console.log("데이터 : ", response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(" urlBuyContents 에러 발생 : ", error);
        });
    })
    .catch((error) => {
      console.log("urlCurrent에러 발생 : ", error);
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

// 위시리스트 담기
function sessionCheckAndAddWishList(data) {
  // 하트 위시리스트 토글
  console.log("위시리스트 클릭시 ", data, data.contentsId);

  document.addEventListener("DOMContentLoaded", function () {
    const isAdded = localStorage.getItem(contentsId) === data.contentsId;

    // 토글 상태에 따라 버튼과 하트 아이콘을 설정합니다.
    if (isAdded) {
      addButton.classList.add("added");
      heartIcon.classList.add("fas");
    } else {
      addButton.classList.remove("added");
      heartIcon.classList.remove("fas");
    }
  });
  const addButton = document.querySelector(".addWishListBtn");
  const heartIcon = addButton.querySelector("i.fa-heart");

  // 페이지 로드 시 로컬 스토리지에서 토글 상태를 가져와 적용합니다.
  // 토글된 상태를 가져옵니다.
  const isAdded = addButton.classList.toggle("added");

  // 토글된 상태를 로컬 스토리지에 저장합니다.

  // 토글된 상태에 따라 하트 아이콘의 색상을 변경합니다.
  heartIcon.classList.toggle("fas");

  //////////////////////////////////////////////////
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
        alert("위시리스트에 추가되었습니다.");
      }
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
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

function sessionSubscribeCurrent() {
  axios
    .get(urlSubscribeCurrent, { withCredentials: true })
    .then((response) => {
      console.log(" sessionSubscribeCurrent 데이터1 : ", response);
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].contentsId.contentsId == id) {
          document.querySelector(".SubscribeBtn").classList.add("hidden");
          document
            .querySelector(".lecturePlayerBtn")
            .classList.remove("hidden");
          break;
        }
      }
    })
    .catch((error) => {
      console.log("urlSubscribeCurrent 에러발생 : ", error);
    });
}

// // 하트 위시리스트 토글

// const addButton = document.querySelector(".addWishListBtn");
// const heartIcon = addButton.querySelector("i.fa-heart");

// // 페이지 로드 시 로컬 스토리지에서 토글 상태를 가져와 적용합니다.
// document.addEventListener("DOMContentLoaded", function () {
//   const isAdded = localStorage.getItem("wishlistAdded") === "true";

//   // 토글 상태에 따라 버튼과 하트 아이콘을 설정합니다.
//   if (isAdded) {
//     addButton.classList.add("added");
//     heartIcon.classList.add("fas");
//   } else {
//     addButton.classList.remove("added");
//     heartIcon.classList.remove("fas");
//   }
// });

// // 클릭 이벤트 리스너를 추가합니다.
// addButton.addEventListener("click", function () {
//   // 토글된 상태를 가져옵니다.
//   const isAdded = addButton.classList.toggle("added");

//   // 토글된 상태를 로컬 스토리지에 저장합니다.
//   localStorage.setItem("wishlistAdded", isAdded);

//   // 토글된 상태에 따라 하트 아이콘의 색상을 변경합니다.
//   heartIcon.classList.toggle("fas");
// });

// //////////////////////////////////////////////////

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log(" sessionCurrent 데이터", response);
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
      console.log("urlCurrent 에러 발생", error);
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
          alert("로그아웃 되었습니다.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

sessionCurrent();
sessionSubscribeCurrent();
