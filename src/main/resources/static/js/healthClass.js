const url = "http://localhost:8080/contents/all";
const urlLectureId = "http://localhost:8080/contents/listContents/H"; // 강의 아이디로 영상 출력 ( 기본 date 오름차 순 )
const urlLectureIdsortedClickCount =
  "http://localhost:8080/contents/listContents/popular/H"; // 조회수별 정렬

axios
  .get(urlLectureId)
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
