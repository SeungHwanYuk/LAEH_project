const urlParams = new URLSearchParams(window.location.search);
const boardNumber = urlParams.get("board");
const id = urlParams.get("id");
console.log("Class ID, boardNumber : ", id, boardNumber);

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

document.addEventListener("DOMContentLoaded", () => {
  if (boardNumber == 2) {
    document.getElementById("boardTabMenu01").classList.add("hidden");
    document.getElementById("boardTabMenu02").classList.remove("hidden");
    document.getElementById("boardTabMenu03").classList.add("hidden");
  } else if (boardNumber == 1) {
    document.getElementById("boardTabMenu01").classList.remove("hidden");
    document.getElementById("boardTabMenu02").classList.add("hidden");
    document.getElementById("boardTabMenu03").classList.add("hidden");
    document.querySelector(".commentBody").classList.add("hidden");
  } else if (boardNumber == 3) {
    document.getElementById("boardTabMenu01").classList.add("hidden");
    document.getElementById("boardTabMenu02").classList.add("hidden");
    document.getElementById("boardTabMenu03").classList.remove("hidden");
    document.querySelector(".commentBody").classList.add("hidden");
  }
});

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

    // 댓글
    let postComent = document.getElementById("commentText");
    postComent.textContent = response.data.postComent;
    console.log("postComent : ", response.data.postComent);

    postUserId = getCookie("userId");
    console.log("userId", postUserId, response.data.userId.userId);
    if (response.data.userId.userId === postUserId) {
      document.querySelector(".boardReadedit").classList.remove("hidden");
    }
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

// 목록버튼 클릭시 해당 게시판 이동
document.querySelector(".boardReadOn").addEventListener("click", (e) => {
  console.log("boardNumber : ", boardNumber);
  window.location.href = `board.html?action=${boardNumber}`;
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

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);

      if (response.data.userId != "anonymousUser") {
        console.log(response.data.userId + "님, 환영합니다.");
        document.querySelector(".logout").classList.remove("hidden");
        document.querySelector(".login").classList.add("hidden");
        document.querySelector(".join").classList.add("hidden");
      }
      if (
        response.status == 200 &&
        response.data.authority[0].authority == "ROLE_ADMIN"
      ) {
        console.log(response.data.userId + " 관리자님 어서오세요!");

        document.querySelector(".navMenuAdmin").classList.remove("hidden");
        if (boardNumber == 2) {
          document.querySelector(".boardReadComent").classList.remove("hidden");
        }
      }
      // 쿠키 체크
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

document.querySelector(".logout").addEventListener("click", () => {
  // 로그아웃 버튼
  if (confirm("로그아웃 하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
        if (response.status == 200) {
          alert("로그아웃 되었습니다.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

// axios
//   .get(urlpostID)
//   .then((response) => {
//     console.log("댓글 데이터 : ", response);
//     let comments = response.data; // 서버에서 받아온 댓글 데이터

//     // 댓글을 표시할 요소 선택
//     let commentContainer = document.getElementById("boardReadComent");

//     // 댓글 데이터를 HTML에 추가
//     comments.forEach((comment) => {
//       let commentElement = document.createElement("div");
//       commentElement.classList.add("comment"); // 필요에 따라 CSS 클래스 추가
//       commentElement.textContent = comment.content; // 댓글 내용을 텍스트로 설정

//       commentContainer.appendChild(commentElement); // 댓글을 컨테이너에 추가
//     });
//   })
//   .catch((error) => {
//     console.log(" urlComment 댓글 에러발생 : ", error);
//   });

function saveComment() {
  const data = {
    postComent: comment,
  };
  axios
    .put(urlComment, data, { withCredentials: true })
    .then((response) => {
      console.log(" urlComment 데이터 : ", response);
      window.location.reload();
    })
    .catch((error) => {
      console.log("urlComment 에러 발생 : ", error);
    });
}

sessionCurrent();

// 자동줄바꿈

const tx = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

// 높이를 자동으로 맞춰 확장하게끔.

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}
