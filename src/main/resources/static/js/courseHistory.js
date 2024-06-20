const url = "http://localhost:8080";
const urlSubscribeList = "http://localhost:8080/subscribe/current";
const urlCurrent = "http://localhost:8080/user/current";
const urlBuyAll = "http://localhost:8080/subscribe/buy/list";
const urlBuyContents = "http://localhost:8080/subscribe/buy";

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
    let removeNodes = document.querySelector(".WishListBody");
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
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response.data);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else if (response.status == 200) {
        const userId = response.data.userId;
        const authority = response.data.authority[0].authority;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (cartItems) {
          displayWishList(cartItems, userId);
          console.log("카트아이템", cartItems);
          const data = cartItems.map((contents) => {
            console.log("컨텐츠 아이디 추측 : ", contents);
            let contentsId = contents;
            // purchase객체를 만들어서 리턴
            return {
              contentsId: contentsId,
              userId: {
                userId: userId,
                authority: { authorityName: authority },
              },
            };
          });
          console.log("맵 데이터 :", data);
          document
            .querySelector(".purchaseBtn")
            .addEventListener("click", () => {
              if (confirm("환불안댐!!!")) {
                axios
                  .post(urlBuyContents, data1, {
                    withCredentials: true,
                  })
                  .then((response) => {
                    console.log("데이터 : ", response);
                    // localStorage.removeItem(userId);
                    // alert("구매해주셔서 감사합니다.");
                    // window.location.reload();
                  })
                  .catch((error) => {
                    console.log("에러 발생 : 환불안댄다니까", error);
                  });
              }
            });
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
}

function displayWishList(contents, userId) {
  const tbody = document.querySelector(".WishListBody");
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
    tr.classList.add("historyTr");
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

    totalPrice = totalPrice + data.price;
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
        let removeNodes = document.querySelector(".WishListBody");
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
    const text = document.createElement("td");
    const img = document.createElement("img");
    tr.classList.add("historyTr");

    // 클래스 이름 생성
    imgtd.classList.add("imgtd");
    img.classList.add("image");

    // 태그 속성 추가
    img.src = data.contentsId.contentsImage;
    title.textContent = data.contentsId.contentsName;
    text.textContent = data.contentsId.lectureDesc;

    // appendChild 부모,자식 위치 설정
    imgtd.appendChild(img);
    tr.appendChild(imgtd);
    tr.appendChild(title);
    tr.appendChild(text);
    tbody.appendChild(tr);
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
            console.log(response);
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
