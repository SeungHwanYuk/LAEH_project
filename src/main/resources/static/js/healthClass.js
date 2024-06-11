const url = "http://localhost:8080/contents";

axios
  .get(url)
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
    // healthClass.index 태그 이름 생성
    const lecture = document.querySelector(".lecture");
    contentsData.array.forEach((data) => {
      const content = document.createElement("div");
      content.classList.add("content");
      const img = document.createElement("img");
      img.classList.add("image");
      img.src = data.contentsImage;
      contents.appendChild(img);

      const contentsName = document.createElement("p");
      const contentsText = document.createElement("p");
      contentsName.textContent = "강의 제목" + data.contentsName;
      contentsText.textContent = "강의 내용" + data.contentsText;
      contents.appendChild(contentsName);
      contents.appendChild(contentsText);

      contents.addEventListener("click", () => {
        console.log("click!!!!");
      });
    });
  }
}
