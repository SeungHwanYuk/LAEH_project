const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "http://localhost:8080/board/all";
const freeBoardurl = "http://localhost:8080/post/freeBoard/" + id;
const urlPostReverse = "http://localhost:8080/board/all/reverse";
const urlWrite = "http://localhost:8080/post/write";
const urlCurrent = "http://localhost:8080/user/current";

let title = "";
let text = "";
let userId = "";
let board = 1;

console.log("게시판 번호는 : ", board);
document.querySelector(".boardPageInput").addEventListener("change", (e) => {
  console.log(e.target.value);
  title = e.target.value;
});
document
  .querySelector(".boardPageInputTextarea")
  .addEventListener("change", (e) => {
    console.log(e.target.value);
    text = e.target.value;
  });

document
  .querySelector(".boardPageInputFilter")
  .addEventListener("change", (e) => {
    console.log(e.target.value);
    board = e.target.value;
  });

document
  .querySelector(".boardPageSubmitButton")
  .addEventListener("click", () => {
    if (confirm("등록하시겠습니까?")) {
      const data = {
        postTitle: title,
        postContent: text,
        userId: userId,
        boardNumber: board,
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
  });

function getPostToBoard() {
  axios
    .get(urlPostReverse, { withCredentials: true })
    .then((response) => {
      console.log("데이터 : ", response.data);
      let boardID1 = [];
      let boardID2 = [];
      let boardID3 = [];

      response.data.forEach((post) => {
        if (post.board.boardNumber === 1) {
          boardID1.push(post);
        } else if (post.board.boardNumber === 2) {
          boardID2.push(post);
        } else {
          boardID3.push(post);
        }
      });

      // 기본 게시판 불러오기 (처음에는 자유게시판으로 설정)
      displayPost(boardID1);

      // 탭 클릭 시 이벤트 추가
      document
        .querySelector("#boardTabMenu01")
        .addEventListener("click", () => {
          document
            .querySelector(".boardSearchTitle")
            .classList.remove("hidden");
          document.querySelector(".boardSearchQna").classList.add("hidden");
          document.querySelector(".boardSearchFaq").classList.add("hidden");
          document
            .querySelector(".boardPageTextBarGrop")
            .classList.remove("hidden");
          displayPost(boardID1);
        });

      document
        .querySelector("#boardTabMenu02")
        .addEventListener("click", () => {
          document.querySelector(".boardSearchTitle").classList.add("hidden");
          document.querySelector(".boardSearchQna").classList.remove("hidden");
          document.querySelector(".boardSearchFaq").classList.add("hidden");
          document
            .querySelector(".boardPageTextBarGrop")
            .classList.remove("hidden");
          displayPost(boardID2);
        });

      document
        .querySelector("#boardTabMenu03")
        .addEventListener("click", () => {
          document.querySelector(".boardSearchTitle").classList.add("hidden");
          document.querySelector(".boardSearchQna").classList.add("hidden");
          document.querySelector(".boardSearchFaq").classList.remove("hidden");
          document
            .querySelector(".boardPageTextBarGrop")
            .classList.add("hidden");
          displayPost(boardID3);
        });
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
}

const tbody = document.querySelector(".boardBody");
function displayPost(data) {
  // 기존의 게시물 삭제
  const basic = document.querySelectorAll(".basic");
  basic.forEach((e) => e.remove());

  // 게시물 표시
  data.forEach((post) => {
    const tr = document.createElement("tr");
    tr.classList.add("basic");

    const num = document.createElement("td");
    num.textContent = post.postId;

    const postTitle = document.createElement("td");
    postTitle.textContent = post.postTitle;

    const userId = document.createElement("td");
    userId.textContent = post.userId.userId;

    const postContent = document.createElement("td");
    postContent.textContent = post.postDate.substring(0, 10);

    tr.appendChild(num);
    tr.appendChild(postTitle);
    tr.appendChild(userId);
    tr.appendChild(postContent);

    tbody.appendChild(tr);
  });
}

// 페이지 로드 시 실행
window.addEventListener("load", () => {
  getPostToBoard();
});

// 글쓰기 버튼 클릭 시 모달 보이기

document.querySelector("#writePostButton").addEventListener("click", () => {
  sessionCurrent();
  document.querySelector(".boardPage").classList.remove("hidden");
  document.querySelector(".boardAndPostGrop").classList.add("hidden");
});

document
  .querySelector("#boardPageCloseButton")
  .addEventListener("click", () => {
    if (confirm("닫으시겠습니까?")) {
      // $('#boardPagewritePost').modal('show'); // Bootstrap 모달 보이기
      document.querySelector(".boardPage").classList.add("hidden");
      document.querySelector(".boardAndPostGrop").classList.remove("hidden");
    }
  });

// $("#boardPagewritePost").modal("hide"); // Bootstrap 모달 닫기
// 작성 완료 버튼 클릭 시 동작
// document
//   .querySelector("#boardPageSubmitButton")
//   .addEventListener("click", () => {
//     // 여기에 작성 완료 처리를 추가할 수 있습니다.
//     // 예를 들어, 입력된 데이터를 가져와서 서버에 전송하는 등의 동작을 수행합니다.
//     // 모달 닫기
//   });

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId == "anonymousUser") {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      } else {
        //   if (response.data.userId != "anonymousUser") {
        console.log("세션 유지");
        if (response.status == 200) {
          console.log(response.data.userId + "님, 환영합니다.");
          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
        }
      }
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
          alert = "로그아웃 되었습니다.";
          window.location.reload;
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});
