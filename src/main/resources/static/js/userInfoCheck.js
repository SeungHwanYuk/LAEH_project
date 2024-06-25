const urlAllUser = "http://localhost:8080/user/all";
const urlSubscribe = "http://localhost:8080/subscribe/";

axios
  .get(urlAllUser, { withCredentials: true })
  .then((response) => {
    console.log("데이터 : ", response.data);
    displayAllUserList(response.data);
  })
  .catch((error) => {
    console.log("urlAllUser 에러 발생 : ", error);
  });

function displayAllUserList(data) {
  const tbody = document.querySelector(".userInfoBody");

  data.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const userId = document.createElement("td");
    const authority = document.createElement("td");
    const userEmail = document.createElement("td");
    const userName = document.createElement("td");
    const gender = document.createElement("td");
    const userNickname = document.createElement("td");
    const phoneNum = document.createElement("td");
    const createdAt = document.createElement("td");
    // 클래스 이름 생성

    tr.classList.add("userInfoTr");
    // 태그 속성 추가
    userId.textContent = data.userId;
    authority.textContent = data.authority.authorityName;
    userEmail.textContent = data.userEmail;
    userName.textContent = data.username;
    gender.textContent = data.gender;
    userNickname.textContent = data.userNickname;
    phoneNum.textContent = data.phoneNum;
    createdAt.textContent = data.createdAt.substring(0, 16);
    // appendChild 부모,자식 위치 설정

    tr.appendChild(authority);
    tr.appendChild(userId);
    tr.appendChild(userName);
    tr.appendChild(userNickname);
    tr.appendChild(gender);
    tr.appendChild(userEmail);
    tr.appendChild(phoneNum);
    tr.appendChild(createdAt);
    tbody.appendChild(tr);

    tr.addEventListener("click", (e) => {
      axios
        .get(urlSubscribe + data.userId, { withCredentials: true })
        .then((response) => {
          if (response.data == "") {
            console.log("구독한 목록이 없습니다.");
          }
          console.log(" urlSubscribe 데이터 : ", response.data);
        })
        .catch((error) => {
          console.log(" urlSubscribe 에러 발생 : ", error);
        });
    });
  });
}
