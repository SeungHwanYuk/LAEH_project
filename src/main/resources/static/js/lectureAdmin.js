const urlLectureDate = "http://localhost:8080/contents/listContents/lecture/"; // + {lectureId}
const urlLecturePopular =
  "http://localhost:8080/contents/listContents/popular/"; // + {lectureId}
const urlLectureContentsNum =
  "http://localhost:8080/contents/listContents/contentsNum/"; // + {lectureId}

let absoluteBtnHealth = document.querySelector("#absoluteBtnHealth");
let absoluteBtnYoga = document.querySelector("#absoluteBtnYoga");
let absoluteBtnPilates = document.querySelector("#absoluteBtnPilates");
let lectureIdByBtn = "";

absoluteBtnHealth.addEventListener("click", (e) => {
  // 머릿글 바꾸기
  document.querySelector(".subjectName").textContent =
    absoluteBtnHealth.textContent;
  // select "클릭"시 마다 초기값으로 설정
  document.querySelector("#sortContents").value = "date";
  lectureIdByBtn = e.target.value;
  console.log("absoluteBtnHealth 클릭 : ", lectureIdByBtn);
  getContentsByLectureId(lectureIdByBtn);
});
absoluteBtnYoga.addEventListener("click", (e) => {
  // 머릿글 바꾸기
  document.querySelector(".subjectName").textContent =
    absoluteBtnYoga.textContent;
  // select "클릭"시 마다 초기값으로 설정
  document.querySelector("#sortContents").value = "date";
  lectureIdByBtn = e.target.value;
  console.log("absoluteBtnYoga 클릭 : ", lectureIdByBtn);
  getContentsByLectureId(lectureIdByBtn);
});
absoluteBtnPilates.addEventListener("click", (e) => {
  // 머릿글 바꾸기
  document.querySelector(".subjectName").textContent =
    absoluteBtnPilates.textContent;
  // select "클릭"시 마다 초기값으로 설정
  document.querySelector("#sortContents").value = "date";
  lectureIdByBtn = e.target.value;
  console.log("absoluteBtnPilates 클릭 : ", lectureIdByBtn);
  getContentsByLectureId(lectureIdByBtn);
});

function getContentsByLectureId(lectureIdByBtn) {
  // 모든 자식 삭제 (페이지 초기화)
  let removeNodes = document.querySelector(".lecture");
  while (removeNodes.firstChild) {
    removeNodes.removeChild(removeNodes.firstChild);
  }
  axios
    .get(urlLectureDate + lectureIdByBtn, { withCredentials: true }) // 기본 최신날짜순
    .then((response) => {
      console.log("응답 Response: ", response);
      displayContents(response.data);
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
}
// select 선택
document.querySelector("#sortContents").addEventListener("change", (e) => {
  // 모든 자식 삭제 (페이지 초기화)
  let removeNodes = document.querySelector(".lecture");
  while (removeNodes.firstChild) {
    removeNodes.removeChild(removeNodes.firstChild);
  }
  //
  if (e.target.value == "date") {
    axios
      .get(urlLectureDate + lectureIdByBtn, { withCredentials: true }) // 최신날짜순
      .then((response) => {
        console.log(" urlLecture 데이터 : ", response.data);
        let contentsData = response.data;
        displayContents(contentsData);
      })
      .catch((error) => {
        console.log(" urlLecture 에러 발생 : ", error);
      });
  } else if (e.target.value == "popular") {
    axios
      .get(urlLecturePopular + lectureIdByBtn, { withCredentials: true }) // 인기순
      .then((response) => {
        console.log("응답 Response: ", response);
        displayContents(response.data);
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  } else if (e.target.value == "contentsNum") {
    axios
      .get(urlLectureContentsNum + lectureIdByBtn, { withCredentials: true }) // 영상번호순
      .then((response) => {
        console.log("응답 Response: ", response);
        displayContents(response.data);
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  }
});

function displayContents(contentsData) {
  console.log(contentsData.length);
  if (contentsData.length > 0) {
    const lecture = document.querySelector(".lecture");
    contentsData.forEach((data) => {
      const content = document.createElement("div");
      const img = document.createElement("img");
      const contentsText = document.createElement("p");
      const contentsName = document.createElement("p");
      const contentsClickedCount = document.createElement("p");
      const contentsNumber = document.createElement("p");
      const contentsAllTime = document.createElement("p");
      const contentsUploadDate = document.createElement("p");
      const contentsTeacher = document.createElement("p");

      content.classList.add("content");
      img.classList.add("image");
      contentsText.classList.add("contentsText");
      contentsName.classList.add("contentsName");
      contentsClickedCount.classList.add("contentsClickedCount");
      contentsNumber.classList.add("contentsClickedCount"); // 클래스 이름 조회수랑 같음 수정필요 0626
      contentsAllTime.classList.add("contentsClickedCount"); // 클래스 이름 조회수랑 같음 수정필요 0626
      contentsUploadDate.classList.add("contentsClickedCount"); // 클래스 이름 조회수랑 같음 수정필요 0626
      contentsTeacher.classList.add("contentsClickedCount"); // 클래스 이름 조회수랑 같음 수정필요 0626

      img.src = data.contentsImage;
      contentsText.textContent = data.contentsText;
      contentsName.textContent = data.contentsName;
      contentsClickedCount.textContent =
        "조회수 : " + data.contentsClickedCount;
      contentsNumber.textContent = "영상 번호 : " + data.contentsId;
      contentsAllTime.textContent = "총 영상길이 : " + data.contentsTime;
      contentsUploadDate.textContent = "등록일 : " + data.contentsUploadDate;
      contentsTeacher.textContent =
        "담당 강사 : " + data.lectureId.teacherId.teacherNickname;

      content.appendChild(img);
      content.appendChild(contentsText);
      content.appendChild(contentsName);
      content.appendChild(contentsClickedCount);
      content.appendChild(contentsNumber);
      content.appendChild(contentsAllTime);
      content.appendChild(contentsUploadDate);
      content.appendChild(contentsTeacher);

      content.addEventListener("click", () => {
        alert("수정페이지 개발중");
      });
      lecture.appendChild(content);
    });
  }
}

// const url = "http://localhost:8080/teacher/all";

// axios
//   .get(url)
//   .then((response) => {
//     console.log("데이터: ", response.data);
//   })
//   .catch((error) => {
//     console.log("오류 발생: 멍충 ", error);
//   });

// function displaylectures(datas) {
//   if (datas.length > 0) {
//     const contents = document.querySelector(".contents");
//     datas.forEach((data) => {
//       // 태그 요소 생성
//       const lecture = document.createElement("div");
//       const img = document.createElement("img");
//       const title = document.createElement("p");
//       const lectureUrl = document.createElement("p");
//       const major = document.createElement("p");
//       const price = document.createElement("p");

//       // 클래스 이름 생성
//       lecture.classList.add("lecture");
//       img.classList.add("image");

//       // 태그 속성 추가
//       img.src = data.image;
//       title.textContent = "강좌명: " + data.lectureTitle;
//       major.textContent = "전공: " + data.major;
//       price.textContent = "가격: " + data.price + " 원";

//       // appendChild 자식위치 설정
//       lecture.appendChild(img);
//       lecture.appendChild(title);
//       lecture.appendChild(major);
//       lecture.appendChild(price);
//       lecture.style.minWidth = `487px`;

//       lecture.addEventListener("click", () => {
//         window.location.href = "lectureDetail.html?id=" + data.lectureId;
//       });
//       contents.appendChild(lecture);
//     });
//   }
// }
