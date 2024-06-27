const urlAllTeacher = "http://localhost:8080/teacher/all";
const urlContentsByTeacher =
  "http://localhost:8080/contents/listContents/teacher/";

axios
  .get(urlAllTeacher, { withCredentials: true })
  .then((response) => {
    console.log("데이터 : ", response.data);
    displayAllTeacherList(response.data);
  })
  .catch((error) => {
    console.log("urlAllTeacher 에러 발생 : ", error);
  });

function displayAllTeacherList(data) {
  const tbody = document.querySelector(".teacherInfoBody");

  data.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const teacherId = document.createElement("td");
    const userId = document.createElement("td");
    const teacherNickname = document.createElement("td");
    const lectureCategory = document.createElement("td");
    const teacherJoinDate = document.createElement("td");
    const imgtd = document.createElement("td");
    const img = document.createElement("img");

    // 클래스 이름 생성
    imgtd.classList.add("imgtd");

    tr.classList.add("teacherInfoTr");
    // 태그 속성 추가
    img.src = data.teacherPicture;
    teacherId.textContent = data.teacherId;
    userId.textContent = data.userId.userId;
    teacherNickname.textContent = data.teacherNickname;
    lectureCategory.textContent = data.lectureCategory;
    teacherJoinDate.textContent = data.teacherJoinDate;

    // appendChild 부모,자식 위치 설정
    imgtd.appendChild(img);
    tr.appendChild(imgtd);
    tr.appendChild(teacherId);
    tr.appendChild(userId);
    tr.appendChild(teacherNickname);
    tr.appendChild(lectureCategory);
    tr.appendChild(teacherJoinDate);
    tbody.appendChild(tr);

    tr.addEventListener("click", (e) => {
      document
        .querySelector(".contentsByTeacherTitle")
        .classList.remove("hidden");
      let removeNodes = document.querySelector(".contentsByTeacherBody");
      while (removeNodes.firstChild) {
        removeNodes.removeChild(removeNodes.firstChild);
      }
      document
        .querySelector(".contentsByTeacherTable")
        .classList.remove("hidden");
      let teacher = data.userId.userId;
      console.log("teacher : ", teacher);
      axios
        .get(urlContentsByTeacher + teacher, { withCredentials: true })
        .then((response) => {
          console.log("urlContentsByTeacher 데이터 : ", response.data);
          displayContents(response.data);
        })
        .catch((error) => {
          console.log("urlContentsByTeacher 에러 발생 : ", error);
        });
    });
  });
}

// 강의하고 있는 목록
function displayContents(contents) {
  const tbody = document.querySelector(".contentsByTeacherBody");

  contents.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const img = document.createElement("img");
    const imgtd = document.createElement("td");
    const title = document.createElement("td");
    const text = document.createElement("td");
    const contentsSrc = document.createElement("td");
    const contentsTime = document.createElement("td");
    const contentsClickedCount = document.createElement("td");
    const contentsUploadDate = document.createElement("td");

    // 클래스 이름 생성
    imgtd.classList.add("imgtd");
    img.classList.add("image");
    tr.classList.add("contentsTr");

    // 태그 속성 추가
    img.src = data.contentsImage;
    title.textContent = data.contentsName;
    text.textContent = data.lectureDesc;
    contentsSrc.textContent = data.contentsSrc;
    contentsTime.textContent = data.contentsTime;
    contentsClickedCount.textContent = data.contentsClickedCount;
    contentsUploadDate.textContent = data.contentsUploadDate;

    // appendChild 부모,자식 위치 설정
    imgtd.appendChild(img);
    tr.appendChild(imgtd);
    tr.appendChild(title);
    tr.appendChild(text);
    tr.appendChild(contentsSrc);
    tr.appendChild(contentsTime);
    tr.appendChild(contentsClickedCount);
    tr.appendChild(contentsUploadDate);
    tbody.appendChild(tr);

    tr.addEventListener("click", (e) => {
      if (confirm("상세 페이지로 가시겠습니까?")) {
        window.location.href = "lecturePlayer.html?id=" + data.contentsId;
      }
    });
  });
}
