const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const urlEditId = "http://localhost:8080/post/postId/" + id;

let editId;
let contentsId = id;

axios
.get(urlEditId)
.then((response)=>{
  console.log("데이터 : ", response.data);
  let title = document.querySelector("#boardEditTitleInput");
  let text = document.querySelector("#boardEditContentInput");

  title.textContent = response.data.postTitle;
  text.textContent = response.data.postContent;


})

.catch((error)=>{
  console.log("에러 발생 : ", error);
})