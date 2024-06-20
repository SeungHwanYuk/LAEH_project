// const url = "http://localhost:8080/post";

// const urlCurrent = "http://localhost:8080/user/current";

// function sessionCurrent() {
//   // 로그인 유지 확인 코드
//   axios
//     .get(urlCurrent, { withCredentials: true })
//     .then((response) => {
//       console.log("데이터", response);
//       if (response.data.userId == "anonymousUser") {
//         alert("로그인이 필요합니다.");
//         window.location.href = "login.html";
//       } else {
//         //   if (response.data.userId != "anonymousUser") {
//         console.log("세션 유지");
//         if (response.status == 200) {
//           console.log(response.data.userId + "님, 환영합니다.");
//           document.querySelector(".logout").classList.remove("hidden");
//           document.querySelector(".login").classList.add("hidden");
//           document.querySelector(".join").classList.add("hidden");
//         }
//       }
//     })
//     .catch((error) => {
//       console.log("에러 발생", error);
//     });
// }

// sessionCurrent();

const url = "http://localhost:8080/board/all";

function getPostToBoard() {
axios
.get(url,{withCredentials:true})
.then((response) =>{
  console.log("데이터 : " , response.data);
  displayPost(response.data)
 

})
.catch((error) =>{
  console.log("에러 발생 : ", error);
})
}
getPostToBoard()


function displayPost(data) {
  const tbody = document.querySelector(".boardBody");
  let totalPrice = 0;

  data.forEach((data) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const num = document.createElement("td");
    const postTitle = document.createElement("td");
    const userId = document.createElement("td");
    const postContent = document.createElement("td");
    // const search = document.createElement("td");


    // 클래스 이름 생성
  
    
    // 태그 속성 추가

    num.textContent = data.board.boardNumber;
    postTitle.textContent = data.postTitle;
    userId.textContent = data.userId.userId;
    postContent.textContent = data.postDate;
    // search.textContent= data.search;


    // appendChild 부모,자식 위치 설정
    tr.appendChild(num);
    tr.appendChild(postTitle);
    tr.appendChild(userId);
    tr.appendChild(postContent);
    // tr.appendChild(search);
    tbody.appendChild(tr);
  });
}