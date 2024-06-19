const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const url = "http://localhost:8080/contents/" + id;
const urlUpdateCount = "http://localhost:8080/contents/count/" + id;

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
    if (confirm("장바구니에 담으시겠습니까?")) {
      sessionCurrent(data);
    }
  });
}

// 장바구니 담기
function sessionCurrent(data) {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response.data);
      if (response.data.userId != "anonymousUser") {
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
