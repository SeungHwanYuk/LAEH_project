// 강의 영상창
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("contents ID : ", id);

const urlCurrent = "http://localhost:8080/user/current";
const urlVideoList = "http://localhost:8080/video/listVideo/contents/" + id;
const urlLogout = "http://localhost:8080/user/logout";

//
const urlContentsAll = "http://localhost:8080/contents/all";

let userId;
let contentsId = id;
let newYoutubeUrl = "";

// 강의 아이디로 동영상 불러오기
axios
  .get(urlVideoList, { withCredentials: true })
  .then((response) => {
    console.log(" urlVideoList 데이터 : ", response.data);
    displayVideo(response.data);
  })
  .catch((error) => {
    console.log("에러 발생 : ", error);
  });

// 비디오 화면표시와 다음 영상링크 자동표시
function displayVideo(arrayNewYoutubeUrl) {
  var player = videojs("video-container", {
    autoplay: false,
    controls: true,
    // fluid: true,

    techOrder: ["youtube"],
    sources: [],
  });
  var youtubeVideoLink = arrayNewYoutubeUrl[0].videoSrc;
  player.src({
    src: youtubeVideoLink,
    type: "video/youtube",
  });
  const subVideoBody = document.querySelector(".subVideoBody");
  arrayNewYoutubeUrl.forEach((data, index) => {
    //
    const check = document.createElement("span");
    const lecImg = document.createElement("img");

    const subVideo = document.createElement("div");
    const videoText = document.createElement("p");

    //
    check.classList.add("videoUnCheck");
    check.classList.add("hidden");
    videoText.classList.add("videoText");
    lecImg.classList.add("videoImg");
    subVideo.classList.add("subVideo");
    //

    check.textContent = `√`;
    videoText.textContent = ": " + data.videoDesc;
    lecImg.src = "/image/Group_60.png";

    //
    subVideo.appendChild(check);
    subVideo.appendChild(lecImg);

    subVideo.appendChild(videoText);

    subVideoBody.appendChild(subVideo);
    subVideoBody.firstChild
      .querySelector(".videoUnCheck")
      .classList.remove("hidden");
    subVideoBody.firstChild.querySelector(".videoImg").classList.add("hidden");

    // 만약 왼쪽의 url과 오른쪽 정보의 url이 일치하면 체크표시
    axios
      .get(urlContentsAll)
      .then((response) => {
        console.log(" urlContents 전체 데이터 : ", response.data);
        // lecImg.src = response.data.contentsImage;
        // if()
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });

    // 클릭시 해당 인덱스의 영상 링크(src)를 플레이어로 수정/전송후 출력
    subVideo.addEventListener("click", (e) => {
      subVideo.querySelector(".videoUnCheck").classList.remove("hidden");
      subVideo.querySelector(".videoImg").classList.add("hidden");
      console.log("subVideo 클릭 인덱스 : ", data.videoSrc);
      youtubeVideoLink = data.videoSrc;
      videojs("video-container", player);
      player.src({
        src: youtubeVideoLink,
        type: "video/youtube",
      });
    });
  });
}

// 메인 동영상 백업 0627 12:37
// function displayVideo(newYoutubeUrl) {

//     var player = videojs("video-container", {
//       autoplay: false,
//       controls: true,
//       fluid: true,
//       techOrder: ["youtube"],
//       sources: [],
//     });
//     var youtubeVideoLink = newYoutubeUrl;

//     player.src({
//       src: youtubeVideoLink,
//       type: "video/youtube",
//     });
// }

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
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.log("에러 발생", error);
      });
  }
});

sessionCurrent();
