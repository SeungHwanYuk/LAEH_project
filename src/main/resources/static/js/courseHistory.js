const url = "http://localhost:8080";
const urlSubscribeList = "http://localhost:8080/subscribe/current";
const urlCurrent = "http://localhost:8080/user/current";
const urlBuyAll = "http://localhost:8080/subscribe/buy/list";
const urlBuyContents = "http://localhost:8080/subscribe/buy";
const urlLogout = "http://localhost:8080/user/logout";

// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get();
// console.log("Class ID : ", id);

// 첫 페이지 진입시 실행코드
document.querySelector(".historyTextP01").classList.add("historyTextFocus");

// 주소에 'action'을 담아올 시 click 이벤트 바로 적용 [classDetail.js/73]
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");
  // action 값에 따라 특정 작업 수행
  if (action === "clickCourseHistoryTab") {
    // #courseHistoryTabMenu02 요소 클릭
    const courseHistoryTabMenu02 = document.querySelector(
      "#courseHistoryTabMenu02"
    );
    if (courseHistoryTabMenu02) {
      courseHistoryTabMenu02.click();
    }
  }
});
sessionCheckAndGetAllSubscribeList();
//

document
  .querySelector("#courseHistoryTabMenu01")
  .addEventListener("click", (e) => {
    // 모든 자식 삭제 (페이지 초기화)
    let removeNodes = document.querySelector(".subscribeBody");
    while (removeNodes.firstChild) {
      removeNodes.removeChild(removeNodes.firstChild);
    }
    //

    console.log("tab01 내가듣는강좌 clicked!!");

    document.querySelector(".historyTextP01").classList.add("historyTextFocus");
    document
      .querySelector(".historyTextP02")
      .classList.remove("historyTextFocus");

    document.querySelector(".myCourseWrap01").classList.remove("hidden");
    document.querySelector(".myCourseWrap02").classList.add("hidden");
    sessionCheckAndGetAllSubscribeList();
  });

document
  .querySelector("#courseHistoryTabMenu02")
  .addEventListener("click", (e) => {
    // 모든 자식 삭제 (페이지 초기화)
    let removeNodes = document.querySelector(".wishListBody");
    while (removeNodes.firstChild) {
      removeNodes.removeChild(removeNodes.firstChild);
    }
    //

    console.log("tab02 위시리스트 clicked!!");

    document.querySelector(".historyTextP02").classList.add("historyTextFocus");
    document
      .querySelector(".historyTextP01")
      .classList.remove("historyTextFocus");

    document.querySelector(".myCourseWrap01").classList.add("hidden");
    document.querySelector(".myCourseWrap02").classList.remove("hidden");
    sessionCheckAndgetWishList();
  });

// 위시리스트로 이름 수정 필요 0620
function sessionCheckAndgetWishList() {
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response.data);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else if (response.status == 200) {
        const userId = response.data.userId;
        const authority = response.data.authority[0].authority;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (!cartItems || cartItems.length == 0) {
          document.querySelector(".wishListTh").classList.remove("hidden");
          document.querySelector(".purchaseBtn").classList.add("hidden");
          document.querySelector(".deleteAllBtn").classList.add("hidden");
        } else if (cartItems) {
          displayWishList(cartItems, userId);
          console.log("카트아이템", cartItems);
          const data = cartItems.map((contents) => {
            console.log("컨텐츠 아이디 추측 : ", contents.contentsId);

            // purchase객체를 만들어서 리턴
            return {
              contentsId: contents.contentsId,
              userId: userId,
            };
          });
          console.log("맵 데이터 :", data);
          document
            .querySelector(".purchaseBtn")
            .addEventListener("click", () => {
              if (confirm("환불안댐!!!")) {
                axios
                  .post(urlBuyAll, data, {
                    withCredentials: true,
                  })
                  .then((response) => {
                    console.log("데이터 : ", response);
                    localStorage.removeItem(userId);
                    alert("구매해주셔서 감사합니다.");
                    window.location.href = "courseHistory.html";
                  })
                  .catch((error) => {
                    console.log(" urlBuyAll 에러 발생 : 환불안댄다니까", error);
                  });
              }
            });
        }
      }
    })
    .catch((error) => {
      console.log(" urlCurrent 에러 발생 : ", error);
    });
}

function displayWishList(contents, userId) {
  const tbody = document.querySelector(".wishListBody");
  let totalPrice = 0;
  contents.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const deltd = document.createElement("td");
    const imgtd = document.createElement("td");
    const title = document.createElement("td");
    const lectureId = document.createElement("td");
    const price = document.createElement("td");
    const img = document.createElement("img");
    const deleteBtn = document.createElement("button");
    // 클래스 이름 생성
    imgtd.classList.add("imgtd");
    img.classList.add("image");
    deleteBtn.classList.add("deleteBtn");
    tr.classList.add("wishTr");
    // 태그 속성 추가
    img.src = data.contentsImage;
    title.textContent = data.contentsName;
    // lectureId.textContent = data.lectureId.lectureId;
    // price.textContent = data.price + "원";
    price.textContent = "무료";
    deleteBtn.textContent = "삭제";
    // appendChild 부모,자식 위치 설정
    imgtd.appendChild(img);
    deltd.appendChild(deleteBtn);
    tr.appendChild(imgtd);
    tr.appendChild(title);
    // tr.appendChild(lectureId);
    tr.appendChild(price);
    tr.appendChild(deltd);
    tbody.appendChild(tr);
  });

  // document.querySelector(".totalPrice").textContent = "총 " + totalPrice + "원";
  // document.querySelector(".totalPrice").textContent = "공짜입니다아ㅏ아아아";

  // 전체 삭제 코드
  document.querySelector(".deleteAllBtn").addEventListener("click", () => {
    if (confirm("다 지운당?")) {
      localStorage.clear();
      window.location.reload();
    }
  });

  // 삭제코드
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  console.log(deleteBtns);
  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      if (confirm("위시리스트에서 삭제하시겠습니까?")) {
        const deletedData = contents.toSpliced(index, 1);
        console.log("deletedData :", deletedData);
        const deletedArr = JSON.stringify(deletedData);
        console.log("deletedArr :", deletedArr);
        localStorage.setItem(userId, deletedArr);
        // 모든 자식 삭제 (페이지 초기화)
        let removeNodes = document.querySelector(".wishListBody");
        while (removeNodes.firstChild) {
          removeNodes.removeChild(removeNodes.firstChild);
        }
        //

        sessionCheckAndgetWishList();
      }
    });
  });
}

// 구독 목록
function displaySubscribe(contents) {
  const tbody = document.querySelector(".subscribeBody");

  contents.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const imgtd = document.createElement("td");
    const title = document.createElement("td");
    const deltd = document.createElement("td");
    const text = document.createElement("td");
    const img = document.createElement("img");
    const deleteBtn = document.createElement("button");

    // 클래스 이름 생성
    tr.classList.add("historyTr");
    imgtd.classList.add("imgtd");
    img.classList.add("image");
    deleteBtn.classList.add("deleteBtn");

    // 태그 속성 추가
    img.src = data.contentsId.contentsImage;
    title.textContent = data.contentsId.contentsName;
    text.textContent = data.contentsId.lectureDesc;
    deleteBtn.textContent = "구독취소";

    // appendChild 부모,자식 위치 설정
    imgtd.appendChild(img);
    deltd.appendChild(deleteBtn);
    tr.appendChild(imgtd);
    tr.appendChild(title);
    tr.appendChild(text);
    tbody.appendChild(tr);
    tr.addEventListener("click", (e) => {
      window.location.href =
        "lecturePlayer.html?id=" + data.contentsId.contentsId;
    });
  });
}

function sessionCheckAndGetAllSubscribeList() {
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
          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
        }
        const userId = response.data.userId;

        axios
          .get(urlSubscribeList, { withCredentials: true })
          .then((response) => {
            console.log("urlSubscribeList 데이터 : ", response);
            if (response.data.length == 0) {
              document.querySelector(".subscribeTh").classList.remove("hidden");
            }
            displaySubscribe(response.data);
          })
          .catch((error) => {
            console.log("urlSubscribeList 리스트에러 : ", error);
          });
      }
    })
    .catch((error) => {
      console.log(" urlCurrent 에러 발생", error);
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
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

// 자동줄바꿈

const tx = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

// 높이를 자동으로 맞춰 확장하게끔.

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}
