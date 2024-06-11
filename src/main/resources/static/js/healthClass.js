const url = "http://localhost:8080/contents";

axios
  .get(url)
  .then((response) => {
    console.log("응답 Response: ", response);
    displayClassDetail(response.data);
  })
  .catch((error) => {
    console.log("에러 발생: ", error);
  });

function displayClassDetail(contentsData) {
  console.log(contentsData.length);
  if (contentsData.length > 0) {
    const lecture = document.querySelector(".lecture");
    contentsData.forEach((data) => {
      const contents = document.createElement("div");
      contents.classList.add("contents");
      const img = document.createElement("img");
      img.classList.add("contentsImage");
      img.src = data.contentsImage;
      const contentsName = document.createElement("p");
      contentsName.textContent = "강의 제목" + data.contentsName;
      contents.appendChild(contentsName);
      contents.addEventListener("click", () => {
        window.location.href = "classDetail.html?id" + data.id;
      });
      lecture.appendChild(content);
    });
  }
}
