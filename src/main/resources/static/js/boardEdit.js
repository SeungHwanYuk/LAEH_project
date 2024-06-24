const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Class ID : ", id);

const urleditID = "http://localhost:8080/post/edit/" + id;

let editId;
let contentsId = id;

axios
.get(urleditID)
.then((response)=>{
  console.log("데이터 : ", response.data);

    // 제목 입력 폼 채우기
    let editTitleInput = document.getElementById('.boardEditTitleInput');
    editTitleInput.value = response.data.postTitle;

    // 내용 입력 폼 채우기
    let editContentInput = document.getElementById('.boardEditContentInput');
    editContentInput.value = response.data.postContent;

})

.catch((error)=>{
  console.log("에러 발생 : ", error);
})