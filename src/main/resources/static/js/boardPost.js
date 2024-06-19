// const post = document.querySelector("#post");

// const submiHandler = (e) => {
//   const title = e.target.title.value;
//   const detail = e.target.detail.value;

//   console.log(title);
//   console.log(detail);
// }
// post.addEventListener("title",submiHandler);


const url = "http://localhost:8080/post/write"

let title = "";
let content = "";
let userId = "";
let board = "";

document.querySelector(".boardPageInput").addEventListener("change",(e)=>{
  console.log(e.target.value);
  title = e.target.value;
})
document.querySelector(".boardPageInputTextarea").addEventListener("change",(e)=>{
  console.log(e.target.value);
  content = e.target.value;
})
document.querySelector(".boardPageInpuUserId").addEventListener("change",(e)=>{
  console.log(e.target.value);
  userId = e.target.value;
})
document.querySelector(".boardPageInpuFilter").addEventListener("change",(e)=>{
  console.log(e.target.value);
  board = e.target.value;
})



document.querySelector(".boardPageInputSubmit").addEventListener("click",()=>{
  const data ={
    postTitle : title,
    postContent : content,
    userId: userId,
    boardNumber : board
  }
  axios
  .post(url,data, {withCredentials: true})
  .then((response)=>{
    console.log("앙기모띠",response);
    alert("등록완료");
    // window.location.href="board.html"
    
  })
  .catch((error)=>{
    console.log("에러발생: ", error)
  })
})

function sessionCurrent() {
  // 로그인 유지 확인 코드
  axios
    .get(urlCurrent, { withCredentials: true })
    .then((response) => {
      console.log("데이터", response);
      if (response.data.userId != "anonymousUser") {
        console.log("세션 유지");
        if (response.status == 200) {
          console.log(response.data.userId + "님, 환영합니다.");
 
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생", error);
    });
}

