axios
  .get(url)
  .then((response) => {
    console.log("데이터: ", response.data);
    displaylectures(response.data);
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

function displaylectures(datas) {
  if (datas.length > 0) {
    const contents = document.querySelector(".contents");
    datas.forEach((data) => {
      // 태그 요소 생성
      const lecture = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const lectureUrl = document.createElement("p");
      const major = document.createElement("p");
      const price = document.createElement("p");

      // 클래스 이름 생성
      lecture.classList.add("lecture");
      img.classList.add("image");

      // 태그 속성 추가
      img.src = data.image;
      title.textContent = "강좌명: " + data.lectureTitle;
      major.textContent = "전공: " + data.major;
      price.textContent = "가격: " + data.price + " 원";

      // appendChild 자식위치 설정
      lecture.appendChild(img);
      lecture.appendChild(title);
      lecture.appendChild(major);
      lecture.appendChild(price);
      lecture.style.minWidth = `487px`;

      lecture.addEventListener("click", () => {
        window.location.href = "lectureDetail.html?id=" + data.lectureId;
      });
      contents.appendChild(lecture);
    });
  }
}
