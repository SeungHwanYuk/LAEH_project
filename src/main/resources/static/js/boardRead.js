const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const urlpostID = "http://localhost:8080/post/postId/" + id;
const urlLogin = "http://localhost:8080/user/login";
const urlCurrent = "http://localhost:8080/user/current";
const urlLogout = "http://localhost:8080/user/logout";
const urlWrite = "http://localhost:8080/post/write";


let postId;
let contentsId = id;
let postUserId = "";

axios
.get(urlpostID)
.then((response)=>{
  console.log("데이터 : ", response);
// 제목
let postTitle = document.getElementById('boardReadPostTitle');
postTitle.textContent = response.data.postTitle;

// 개시번호
let postId = document.getElementById('boardReadboardId');
postId.textContent = response.data.postId;

// 글쓴이
let userId = document.getElementById('boardReaduserId');
userId.textContent = response.data.userId.userId;
postUserId = response.data.userId.userId;
console.log(postUserId, "글쓴이 아이디");

// 날짜
let postDate = document.getElementById('boardReadDate');
postDate.textContent = response.data.postDate.substring(0, 10);

// 내용
let postContent = document.getElementById('boardReadContent');
postContent.textContent = response.data.postContent;
})

.catch((error)=>{
  console.log("에러 발생 : ", error);
})




//수정

document.querySelector(".boardReadedit").addEventListener("click", () => {
      window.location.href = "boardEdit.html?id=" + id;
});








// 관리자의 댓글
function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (
        response.status == 200 &&
        response.data.authority[0].authority == "ROLE_ADMIN"
      ) {
        console.log(response.data.userId + "사마... 도죠요로시쿠");
        document.querySelector(".logout").classList.remove("hidden");
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".join").classList.add("hidden");
        document.querySelector(".navMenuAdmin").classList.remove("hidden");
        document.querySelector(".boardReadComent").classList.remove("hidden");
      }


      console.log(response.data.userId, postUserId);
      if(response.data.userId === postUserId) {
        document.querySelector(".boardReadedit").classList.remove("hidden");
      }
      console.log(response.data.userId == postUserId, "같냐??");

















    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
    
    
  }
  
  document
    .querySelector(".boardReadComentBtn").addEventListener("click", () => {
      console.log("클릭된다고");
  if (confirm("등록하시겠습니까?")) {
    const data = {
      postComent: title
    };
    axios
    .post(urlWrite, data, { withCredentials: true })
    .then((response) => {
      console.log("등록이 완료되었습니다.", response);
      alert("등록완료");
      window.location.reload();
    })
    .catch((error) => {
      console.log("에러발생: ", error);
    });
  }
})

sessionCurrent()