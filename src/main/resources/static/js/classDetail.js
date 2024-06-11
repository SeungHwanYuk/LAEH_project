const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const url = "http://localhost:8080/contents/" + id;

axios
  .get(url)
  .then((response) => {
    console.log("데이터 : " + response.data);
    displayContents(response.data);
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

function displayContents(data) {
  const contents = document.querySelector(".contents");
  // const contents = document.createElement("div");
  const img = document.createElement("img");
  const contentsName = document.createElement("p");
  const contentsText = document.createElement("p");

  // contents.classList.add("contents");
  img.classList.add("image");

  img.src = data.contentsImage;
  contentsName.textContent = "수업 제목 : " + data.contentsName;
  contentsText.textContent = "수업 내용 : " + data.contentsText;

  contents.appendChild(img);
  contents.appendChild(contentsName);
  contents.appendChild(contentsText);
}
