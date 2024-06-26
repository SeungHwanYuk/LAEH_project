const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const urlpostID = "http://localhost:8080/post/postId/" + id;
const urlLogin = "http://localhost:8080/user/login";
const urlCurrent = "http://localhost:8080/user/current";
const urlLogout = "http://localhost:8080/user/logout";
const urlWrite = "http://localhost:8080/post/write";
const urlComment = "http://localhost:8080/post/postComment/" + id;

let postId;
let contentsId = id;
let postUserId = "";
let comment = "";

axios
  .get(urlpostID)
  .then((response) => {
    console.log("데이터 : ", response);
    // 제목
    let postTitle = document.getElementById("boardReadPostTitle");
    postTitle.textContent = response.data.postTitle;

    // 개시번호
    let postId = document.getElementById("boardReadboardId");
    postId.textContent = response.data.postId;

    // 글쓴이
    let userId = document.getElementById("boardReaduserId");
    userId.textContent = response.data.userId.userId;
    postUserId = response.data.userId.userId;
    console.log(postUserId, "글쓴이 아이디");

    // 날짜
    let postDate = document.getElementById("boardReadDate");
    postDate.textContent = response.data.postDate.substring(0, 10);

    // 내용
    let postContent = document.getElementById("boardReadContent");
    postContent.textContent = response.data.postContent;

    postUserId = getCookie("userId");
    console.log("userId", postUserId, response.data.userId.userId);
    if (response.data.userId.userId === postUserId) {
      document.querySelector(".boardReadedit").classList.remove("hidden");
    }
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

// 게시글 수정 버튼
document.querySelector(".boardReadedit").addEventListener("click", () => {
  window.location.href = "boardEdit.html?id=" + id;
});

document
  .querySelector(".boardReadComentText")
  .addEventListener("change", (e) => {
    console.log(e.target.value);
    comment = e.target.value;
  });

document.querySelector(".boardReadComentBtn").addEventListener("click", (e) => {
  console.log("클릭된다고");
  saveComment();
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

      postUserId = getCookie("postId");
      console.log("postUserId", postUserId);
      if (response.data.userId === postUserId) {
        document.querySelector(".boardReadedit").classList.remove("hidden");
      }
      console.log(response.data.userId == postUserId, "같냐??");
    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
}

function saveComment() {
  const data = {
    postComent: comment,
  };
  axios
    .put(urlComment, data, { withCredentials: true })
    .then((response) => {
      console.log(" urlComment 데이터 : ", response);
    
    })
    .catch((error) => {
      console.log("urlComment 에러 발생 : ", error);
    });
}

//sessionCurrent()
