const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const url = "http://localhost:8080/contents/" + id;

axios
  .get(url)
  .then((response) => {
    console.log("데이터 : " + response.data);
    displayContents(response.data);
    displayLectureImg(response.data);
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
}

function displayLectureImg(data) {
  const strH = H;
  const strY = Y;
  const strP = Y;
  console.log(data.lectureId);

  const detailImageWrap = document.querySelector(".detailImageWrap");
  if (data.lectureId == strH) {
    detailImageWrap.querySelector(".detailImage01").classList.remove(".hidden");
  } else if (data.lectureId == strP) {
    // 필라테스 이미지 히든 삭제
    detailImageWrap.querySelector(".detailImage03").classList.remove(".hidden");
  } else if (data.lectureId == strY) {
    // 요가 이미지 히든 삭제
    detailImageWrap.querySelector(".detailImage02").classList.remove(".hidden");
  } else {
    console.log("암것도없는디?");
  }
}
