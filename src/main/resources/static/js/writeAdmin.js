const urlPostReverse = "http://localhost:8080/board/all/reverse";
const urlPostDelete = "http://localhost:8080/post/deletePost/";

axios
  .get(urlPostReverse, { withCredentials: true })
  .then((response) => {
    console.log(" urlPostReverse 데이터 : ", response.data);
    displayAllPostList(response.data);
  })
  .catch((error) => {
    console.log("urlPostReverse 에러 발생 : ", error);
  });

function displayAllPostList(data) {
  const tbody = document.querySelector(".postListBody");

  data.forEach((data, index) => {
    // 태그 요소 생성
    const tr = document.createElement("tr");
    const deltd = document.createElement("td");
    const postId = document.createElement("td");
    const postTitle = document.createElement("td");
    const postContent = document.createElement("td");
    const postDate = document.createElement("td");
    const userId = document.createElement("td");
    const board = document.createElement("td");
    const postComent = document.createElement("td");
    const deleteBtn = document.createElement("button");
    // 클래스 이름 생성

    tr.classList.add("postListTr");
    deleteBtn.classList.add("deleteBtn");

    // 태그 속성 추가
    postId.textContent = data.postId;
    postTitle.textContent = data.postTitle;
    postContent.textContent = data.postContent;
    postDate.textContent = data.postDate.substring(0, 19);
    userId.textContent = data.userId.userId;
    board.textContent = data.board.boardTitle;
    postComent.textContent = data.postComent;
    deleteBtn.textContent = "삭제";
    // appendChild 부모,자식 위치 설정

    tr.appendChild(postId);
    tr.appendChild(board);
    tr.appendChild(userId);
    tr.appendChild(postTitle);
    tr.appendChild(postContent);
    tr.appendChild(postDate);
    tr.appendChild(postComent);
    deltd.appendChild(deleteBtn);
    tr.appendChild(deltd);
    tbody.appendChild(tr);

    deleteBtn.addEventListener("click", (e) => {
      if (confirm("게시글을 삭제 하시겠습니까?")) {
        axios
          .delete(urlPostDelete + data.postId, { withCredentials: true })
          .then((response) => {
            console.log(" urlPostDelete 데이터 : ", response);
            window.location.reload();
          })
          .catch((error) => {
            console.log(" urlPostDelete 에러 발생 : ", error);
          });
      }
    });
  });
}
