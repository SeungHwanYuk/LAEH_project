// 장바구니

// 망해써
const urlBuyAll = "http://localhost:8080/subscribe/buy/list";
const urlBuyContents = "http://localhost:8080/subscribe/buy";

// 위시리스트로 이름 수정 필요 0620
function sessionCurrent() {
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
          displayCart(cartItems, userId);
          console.log("카트아이템", cartItems);
          const data = cartItems.map((contents) => {
            console.log("컨텐츠 아이디 추측 : ", contents);
            // purchase객체를 만들어서 리턴
            return {
              contentsId: contents,
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
                  .post(urlBuyContents, data, {
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

function displayCart(contents, userId) {
  const tbody = document.querySelector(".cartBody");
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
    // 태그 속성 추가
    img.src = data.contentsImage;
    title.textContent = data.contentsName;
    lectureId.textContent = data.lectureId.lectureId;
    price.textContent = data.price + "원";
    deleteBtn.textContent = "삭제";
    // appendChild 부모,자식 위치 설정
    imgtd.appendChild(img);
    deltd.appendChild(deleteBtn);
    tr.appendChild(imgtd);
    tr.appendChild(title);
    tr.appendChild(lectureId);
    tr.appendChild(price);
    tr.appendChild(deltd);
    tbody.appendChild(tr);

    totalPrice = totalPrice + data.price;
  });
  document.querySelector(".totalPrice").textContent = "총 " + totalPrice + "원";
  document.querySelector(".deleteAllBtn").addEventListener("click", () => {
    if (confirm("다 지운당?")) {
      localStorage.clear();
      window.location.reload();
    }
  });

  // 06.03 선생님 솔루션 (axios 삭제 및 ...deletedData 수정)
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  console.log(deleteBtns);
  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      if (confirm("장바구니에서 삭제하시겠습니까?")) {
        const deletedData = contents.toSpliced(index, 1);
        console.log("deletedData :", deletedData);
        const deletedArr = JSON.stringify(deletedData);
        console.log("deletedArr :", deletedArr);
        localStorage.setItem(userId, deletedArr);
        window.location.reload();
      }
    });
  });
}

sessionCurrent();
