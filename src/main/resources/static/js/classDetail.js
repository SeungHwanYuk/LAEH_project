const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const url = "http://localhost:8080/contents/" + id;

axios
  .get(url)
  .then((response) => {
    console.log("데이터 : " + response.data);
    displayClassDetail(response.data);
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

function displayClassDetail(data) {
  const content = document.querySelector(".content");
  const lecture = document.createElement("div");
  const contentsImage = document.createElement("img");
  const title = document.createElement("p");

  content.classList.add("content");
  contentsImage.classList.add("image");

  contentsImage.src = data.contentsImage;
  title.textContent = "수업 제목 : " + data.contentsName;

  content.appendChild(contentsImage);
  content.appendChild(title);
}
