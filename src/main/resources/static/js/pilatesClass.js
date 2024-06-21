const url = "http://localhost:8080/contents/all";
const urlLogout = "http://localhost:8080/user/logout";
const urlCurrent = "http://localhost:8080/user/current";
const urlLectureId = "http://localhost:8080/contents/listContents/lecture/P"; // 강의 아이디로 영상 검색
const urlLectureIdsortedClickCount =
  "http://localhost:8080/contents/listContents/popular/P"; // 조회수별 정렬

axios
  .get(urlLectureId) // 기본 최신날짜순
  .then((response) => {
    console.log("응답 Response: ", response);
    displayContents(response.data);
  })
  .catch((error) => {
    console.log("에러 발생: ", error);
  });

function displayContents(contentsData) {
  console.log(contentsData.length);
  if (contentsData.length > 0) {
    const lecture = document.querySelector(".lecture");
    contentsData.forEach((data) => {
      const content = document.createElement("div");
      content.classList.add("content");
      const img = document.createElement("img");
      img.classList.add("image");
      img.src = data.contentsImage;
      content.appendChild(img);

      const contentsText = document.createElement("p");
      contentsText.classList.add("contentsText");
      const contentsName = document.createElement("p");
      contentsName.classList.add("contentsName");
      const contentsClickedCount = document.createElement("p");
      contentsClickedCount.classList.add("contentsClickedCount");

      contentsText.textContent = data.contentsText;
      contentsName.textContent = data.contentsName;
      contentsClickedCount.textContent =
        "조회수 : " + data.contentsClickedCount;

      content.appendChild(contentsText);
      content.appendChild(contentsName);
      content.appendChild(contentsClickedCount);

      content.addEventListener("click", () => {
        // console.log("click!!!!");
        window.location.href = "classDetail.html?id=" + data.contentsId;
      });
      lecture.appendChild(content);
    });
  }
}

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
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
      console.log("에러 발생", error);
      alert("로그인이 필요합니다.");
      s;
      href = "login.html";
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
          window.location.reload;
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

sessionCurrent();
