const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const boardNumber = urlParams.get("action");

const url = "http://localhost:8080/board/all";
const freeBoardurl = "http://localhost:8080/post/freeBoard/" + id;
const urlPostReverse = "http://localhost:8080/board/all/reverse";
const urlWrite = "http://localhost:8080/post/write";
const urlCurrent = "http://localhost:8080/user/current";
const urlLogout = "http://localhost:8080/user/logout";

let title = "";
let text = "";
let userId = "";
let board = 0;
let boardName = "";
let sessionUserId = "";

let freeBoardTabIndex = document.getElementById("boardTabMenu01");
let QnABoardTabIndex = document.getElementById("boardTabMenu02");
let FAQTabIndex = document.getElementById("boardTabMenu03");

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

// // 페이지 로드시 자동 클릭 명령
// document.addEventListener("DOMContentLoaded", () => {
//   if (boardNumber == 1) {
//     document.querySelector("#boardTabMenu01").click();
//   } else {
//     if (boardNumber == 2) {
//       document.querySelector("#boardTabMenu02").click();
//     } else {
//       if (boardNumber == 3) {
//         document.querySelector("#boardTabMenu03").click();
//       }
//     }
//   }
// });

// // 자유게시판이 눌려 있어야 해
// window.addEventListener("load",()=>{
//   document.querySelector("#boardTabMenu01").click()
// })

// 중복이라 주석처리 0625 승환
// document
//   .querySelector(".boardPageSubmitButton")
//   .addEventListener("click", () => {
//     if (confirm("등록하시겠습니까?")) {
//       const data = {
//         postTitle: title,
//         postContent: text,
//         userId: userId,
//         boardNumber: board + 1,
//       };
//       axios
//         .post(urlWrite, data, { withCredentials: true })
//         .then((response) => {
//           console.log("등록이 완료되었습니다.", response);
//           alert("등록완료");
//           window.location.reload();
//         })
//         .catch((error) => {
//           console.log("에러발생: ", error);
//         });
//     }
//   });

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
          document.querySelector(".boardpageWrap").classList.remove("hidden");
          document
            .querySelector(".boardPageTextBarGrop")
            .classList.remove("hidden");
          displayPost(boardID1);
          board = freeBoardTabIndex.tabIndex;
          boardName = boardID1[0].board.boardTitle;
          console.log("board클릭시", boardName);
        });

      document
        .querySelector("#boardTabMenu02")
        .addEventListener("click", () => {
          document.querySelector(".boardSearchTitle").classList.add("hidden");
          document.querySelector(".boardSearchQna").classList.remove("hidden");
          document.querySelector(".boardSearchFaq").classList.add("hidden");
          document.querySelector(".boardpageWrap").classList.remove("hidden");
          document
            .querySelector(".boardPageTextBarGrop")
            .classList.remove("hidden");
          displayPost(boardID2);
          board = QnABoardTabIndex.tabIndex;
          boardName = boardID2[0].board.boardTitle;
          console.log("board클릭시", boardID2, board, boardName);
        });

      document
        .querySelector("#boardTabMenu03")
        .addEventListener("click", () => {
          document.querySelector(".boardSearchTitle").classList.add("hidden");
          document.querySelector(".boardSearchQna").classList.add("hidden");
          document.querySelector(".boardSearchFaq").classList.remove("hidden");
          document.querySelector(".boardpageWrap").classList.add("hidden");
          document
            .querySelector(".boardPageTextBarGrop")
            .classList.add("hidden");
          displayPost(boardID3);
          board = FAQTabIndex.tabIndex;
          boardName = boardID3[0].board.boardTitle;
          console.log("board클릭시", boardID3, board, boardName);
        });
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
}

let boardPageInputFilter = document.querySelector(".boardPageInputFilter");
boardPageInputFilter.value = boardName;
console.log("boardPageInputFilter : ", boardPageInputFilter);

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

    tr.addEventListener("click", (e) => {
      console.log(sessionUserId);
      setCookie("userId", sessionUserId, 1);
      window.location.href = `boardRead.html?id=${post.postId}&board=${post.board.boardNumber}`;
    });
  });
}

// 글쓰기 버튼 클릭 시 모달 보이기

document.querySelector("#writePostButton").addEventListener("click", () => {
  writeSessionCurrent();
  document.querySelector(".boardPage").classList.remove("hidden");
  document.querySelector(".boardAndPostGrop").classList.add("hidden");
  document.querySelector(".boardpageWrap").classList.add("hidden");
  document.querySelector("#writePostButton").classList.add("hidden");
});

document
  .querySelector("#boardPageCloseButton")
  .addEventListener("click", () => {
    if (confirm("닫으시겠습니까?")) {
      // $('#boardPagewritePost').modal('show'); // Bootstrap 모달 보이기
      document.querySelector(".boardPage").classList.add("hidden");
      document.querySelector(".boardAndPostGrop").classList.remove("hidden");
      document.querySelector(".boardpageWrap").classList.add("hidden");
      document.querySelector("#writePostButton").classList.remove("hidden");
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

// 현재 사용자 ID 가져오는 함수
function getCurrentUserId() {
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      const userId = response.data.userId;
      // 숨은 입력 필드에 사용자 ID 설정
      document.querySelector(".boardPageInputUserId").value = userId;
    })
    .catch((error) => {
      console.log("사용자 ID 가져오기 에러:", error);
    });
}

// 글쓰는 등록 버튼 클릭 시 아이디 자동 저장용
document.querySelector("#writePostButton").addEventListener("click", () => {
  // 현재 사용자 ID 가져오기
  getCurrentUserId();
});

// 등록 버튼 클릭 시
document
  .querySelector(".boardPageSubmitButton")
  .addEventListener("click", () => {
    if (confirm("등록하시겠습니까?")) {
      // 입력된 데이터와 사용자 ID를 포함하여 데이터 전송
      const title = document.querySelector(".boardPageInput").value;
      const text = document.querySelector(".boardPageInputTextarea").value;
      const userId = document.querySelector(".boardPageInputUserId").value;

      const data = {
        postTitle: title,
        postContent: text,
        userId: userId,
        boardNumber: board + 1, // 필요한 경우 게시판 번호 추가
      };

      // 서버에 데이터 전송
      axios
        .post(urlWrite, data, { withCredentials: true })
        .then((response) => {
          console.log("등록이 완료되었습니다.", response);
          alert("등록완료");
          window.location.reload();
        })
        .catch((error) => {
          console.log("에러발생:", error);
        });
    }
  });

// 페이지 로드 시 실행
window.addEventListener("load", () => {
  getPostToBoard();
});

// ---------------------------------------------------------------------
// 페이지네이션 0625 승환

// const COUNT_PER_PAGE = 6; // 한 페이지 당 최대 6개의 요소를 보여줄 것

// const getTotalPageCount = () => {
//   return Math.ceil(data.length / COUNT_PER_PAGE);
// };

// // 페이지 번호 버튼 wrapper에 필요한 페이지 번호 버튼을 추가한다
// const numberButtonWrapper = document.querySelector(".numberButtonWrapper");

// const setPageButtons = () => {
//   numberButtonWrapper.innerHTML = ""; // 페이지 번호 wrapper 내부를 비워줌

//   for (let i = 1; i <= getTotalPageCount(); i++) {
//     numberButtonWrapper.innerHTML += `<span class="number-button"> ${i} </span>`;
//   }
// };

// // 인수로 이동할 페이지 번호를 넘겨주면 n번째 글부터 n+5번째 글까지 보여주도록 한다.
// // 즉, 3번 페이지일 경우 13번째 글부터 18번째 글까지 보여주면 된다.
// // 함수를 호출하면서 인수로 넣어준 pageNumber를 currentPage 변수에 담는다.
// // 그리고 ul 요소를 가져와서 li 요소를 만든 다음 append 한다.

// const ul = document.querySelector("ul");
// let currentPage = 1;

// const setPageOf = (pageNumber) => {
//   ul.innerHTML = "";

//   for (
//     let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
//     i <= COUNT_PER_PAGE * (pageNumber - 1) + 6 && i <= data.length;
//     i++
//   ) {
//     const li = document.createElement("li");

//     // 컨테이너
//     const postContainer = document.createElement("div");
//     postContainer.className = "post-container";

//     // 글 번호
//     const postNumber = document.createElement("p");
//     postNumber.className = "post-number";

//     // 글 제목
//     const postTitle = document.createElement("p");
//     postTitle.className = "post-title";

//     postNumber.textContent = data[i - 1].postNumber;
//     postTitle.textContent = data[i - 1].title; // 페이지 번호는 1부터 시작하지만 배열 인덱스는 0부터 시작하므로 -1 해 준다.

//     postContainer.append(postNumber, postTitle); // 컨테이너 구성
//     li.append(postContainer); // li 구성
//     ul.append(li); // ul에 li 자식 요소로 넣어주기
//   }
// };

// // querySelectorAll로 모든 페이지 번호 버튼들을 가져와 click 이벤트 리스너를 달아주었다.
// // 클릭 이벤트 발생 시 number로 형변환한 다음,
// // 해당 페이지를 셋팅하기 위해 setPageOf 함수를 호출한다
// const pageNumberButtons = document.querySelectorAll(".number-button");
// pageNumberButtons.forEach((numberButton) => {
//   numberButton.addEventListener("click", (e) => {
//     setPageOf(+e.target.innerHTML);
//   });
// });

// 페이지 네이션 끝 --------------------------------------------------------------

function writeSessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId == "anonymousUser") {
        alert("로그인 해주세요.");
        window.location.href = "login.html";
      }
      if (response.data.userId != "anonymousUser") {
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
      console.log("urlCurrent 에러 발생", error);
    });
}

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId != "anonymousUser") {
        console.log("세션 유지");
        sessionUserId = response.data.userId;
        if (response.status == 200) {
          console.log(response.data.userId + "님, 환영합니다.");
          document.querySelector(".logout").classList.remove("hidden");
          document.querySelector(".login").classList.add("hidden");
          document.querySelector(".join").classList.add("hidden");
        }
      }
    })
    .catch((error) => {
      console.log("urlCurrent 에러 발생", error);
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

sessionCurrent();
