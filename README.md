# Hello PT

> 바쁜 사회인들을 위한 온라인 헬스 클래스 웹페이지

<br>

# 프로젝트 소개

<br>

>온라인 헬스 클래스를 바탕으로 여가 시간이 부족한 현대인들을 위하여 기획함
>
>종목에 따른 선생님이 개인 PT를 온라인으로 피드백 할 수 있도록 에듀테크 과정에 맞게 설계함

<br>

## 기술 스택

<br>

백엔드
- java

<br>

프론트엔드 
- html, css , javascript

<br>

개발 툴
- VScode, intelliJ, adobe photoshop, figma, postman
  
<br>

DB
- MariaDB
  - DBeaver
 
<br>

- 개발환경 : Windows, macOS

<br>

## 프로젝트 구조
<br>

### 백엔드

```

main
 ┣ java
 ┃ ┗ LAEH
 ┃ ┃ ┗ LAEH_project
 ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┣ SecurityConfig.java
 ┃ ┃ ┃ ┃ ┗ WebConfig.java
 ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┣ BoardController.java
 ┃ ┃ ┃ ┃ ┣ CalorieDataController.java
 ┃ ┃ ┃ ┃ ┣ ContentsController.java
 ┃ ┃ ┃ ┃ ┣ LectureController.java
 ┃ ┃ ┃ ┃ ┣ MemoController.java
 ┃ ┃ ┃ ┃ ┣ PostController.java
 ┃ ┃ ┃ ┃ ┣ SubscribeController.java
 ┃ ┃ ┃ ┃ ┣ TeacherController.java
 ┃ ┃ ┃ ┃ ┣ UserController.java
 ┃ ┃ ┃ ┃ ┣ VideoController.java
 ┃ ┃ ┃ ┃ ┗ ViewController.java
 ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ BaseResponse.java
 ┃ ┃ ┃ ┃ ┣ MemoDto.java
 ┃ ┃ ┃ ┃ ┣ PostDto.java
 ┃ ┃ ┃ ┃ ┣ SessionDto.java
 ┃ ┃ ┃ ┃ ┣ SubscribeDto.java
 ┃ ┃ ┃ ┃ ┗ UserDto.java
 ┃ ┃ ┃ ┣ 📂enumstatus
 ┃ ┃ ┃ ┃ ┗ ResultCode.java
 ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┣ CustomExceptionHandler.java
 ┃ ┃ ┃ ┃ ┣ InvalidRequestException.java
 ┃ ┃ ┃ ┃ ┣ MyAccessDeniedHandler.java
 ┃ ┃ ┃ ┃ ┣ MyAuthenticationEntryPoint.java
 ┃ ┃ ┃ ┃ ┗ ResourceNotFoundException.java
 ┃ ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┃ ┣ 📂Enum
 ┃ ┃ ┃ ┃ ┃ ┣ Gender.java
 ┃ ┃ ┃ ┃ ┃ ┗ LectureCategory.java
 ┃ ┃ ┃ ┃ ┣ Authority.java
 ┃ ┃ ┃ ┃ ┣ Board.java
 ┃ ┃ ┃ ┃ ┣ CalorieData.java
 ┃ ┃ ┃ ┃ ┣ Contents.java
 ┃ ┃ ┃ ┃ ┣ Grade.java
 ┃ ┃ ┃ ┃ ┣ LearnedContents.java
 ┃ ┃ ┃ ┃ ┣ Lecture.java
 ┃ ┃ ┃ ┃ ┣ LectureDetail.java
 ┃ ┃ ┃ ┃ ┣ Liked.java
 ┃ ┃ ┃ ┃ ┣ Memo.java
 ┃ ┃ ┃ ┃ ┣ Post.java
 ┃ ┃ ┃ ┃ ┣ ReviewContents.java
 ┃ ┃ ┃ ┃ ┣ ReviewLecture.java
 ┃ ┃ ┃ ┃ ┣ Subscribe.java
 ┃ ┃ ┃ ┃ ┣ Teacher.java
 ┃ ┃ ┃ ┃ ┣ User.java
 ┃ ┃ ┃ ┃ ┗ Video.java
 ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┣ AuthorityRepository.java
 ┃ ┃ ┃ ┃ ┣ BoardRepository.java
 ┃ ┃ ┃ ┃ ┣ CalorieDataRepository.java
 ┃ ┃ ┃ ┃ ┣ ContentsRepository.java
 ┃ ┃ ┃ ┃ ┣ GradeRepository.java
 ┃ ┃ ┃ ┃ ┣ LearnedContentsRepository.java
 ┃ ┃ ┃ ┃ ┣ LectureDetailRepository.java
 ┃ ┃ ┃ ┃ ┣ LectureRepository.java
 ┃ ┃ ┃ ┃ ┣ MemoRepository.java
 ┃ ┃ ┃ ┃ ┣ PostRepository.java
 ┃ ┃ ┃ ┃ ┣ ReviewContentsRepository.java
 ┃ ┃ ┃ ┃ ┣ ReviewLectureRepository.java
 ┃ ┃ ┃ ┃ ┣ SubscribeRepository.java
 ┃ ┃ ┃ ┃ ┣ TeacherRepository.java
 ┃ ┃ ┃ ┃ ┣ UserRepository.java
 ┃ ┃ ┃ ┃ ┗ VideoRepository.java
 ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┣ BoardService.java
 ┃ ┃ ┃ ┃ ┣ CalorieDataService.java
 ┃ ┃ ┃ ┃ ┣ ContentsService.java
 ┃ ┃ ┃ ┃ ┣ LectureService.java
 ┃ ┃ ┃ ┃ ┣ MemoService.java
 ┃ ┃ ┃ ┃ ┣ PostService.java
 ┃ ┃ ┃ ┃ ┣ SubscribeService.java
 ┃ ┃ ┃ ┃ ┣ TeacherService.java
 ┃ ┃ ┃ ┃ ┣ UserDetailService.java
 ┃ ┃ ┃ ┃ ┣ UserService.java
 ┃ ┃ ┃ ┃ ┗ VideoService.java
 ┃ ┃ ┃ ┗ LaehProjectApplication.java
 ┃ ┗ application.properties

```

### 프론트 엔드

```

main
 ┗ resources
 ┃ ┣ static
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┣ board.css
 ┃ ┃ ┃ ┣ boardEdit.css
 ┃ ┃ ┃ ┣ boardRead.css
 ┃ ┃ ┃ ┣ classDetail.css
 ┃ ┃ ┃ ┣ dailyChart.css
 ┃ ┃ ┃ ┣ eventpage.css
 ┃ ┃ ┃ ┣ join.css
 ┃ ┃ ┃ ┣ lecturePlayer.css
 ┃ ┃ ┃ ┣ login.css
 ┃ ┃ ┃ ┣ style.css
 ┃ ┃ ┃ ┣ teacherInfoCheck.css
 ┃ ┃ ┃ ┣ userInfoCheck.css
 ┃ ┃ ┃ ┗ writeAdmin.css
 ┃ ┃ ┣ 📂html
 ┃ ┃ ┃ ┣ cart.html
 ┃ ┃ ┃ ┣ classDetail.html
 ┃ ┃ ┃ ┣ healthClass.html
 ┃ ┃ ┃ ┣ index.html
 ┃ ┃ ┃ ┣ join.html
 ┃ ┃ ┃ ┣ login.html
 ┃ ┃ ┃ ┣ pilatesClass.html
 ┃ ┃ ┃ ┗ yogaClass.html
 ┃ ┃ ┣ 📂image
 ┃ ┃ ┃ ┣ .
 ┃ ┃ ┃ ┣ .
 ┃ ┃ ┃ ┗ .
 ┃ ┃ ┣ 📂js
 ┃ ┃ ┃ ┣ adminPage.js
 ┃ ┃ ┃ ┣ board.js
 ┃ ┃ ┃ ┣ boardEdit.js
 ┃ ┃ ┃ ┣ boardRead.js
 ┃ ┃ ┃ ┣ calorieDetail.js
 ┃ ┃ ┃ ┣ caloriePage.js
 ┃ ┃ ┃ ┣ cart.js
 ┃ ┃ ┃ ┣ classDetail.js
 ┃ ┃ ┃ ┣ cookie.js
 ┃ ┃ ┃ ┣ courseHistory.js
 ┃ ┃ ┃ ┣ dailyChart.js
 ┃ ┃ ┃ ┣ editProfile.js
 ┃ ┃ ┃ ┣ healthClass.js
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┣ join.js
 ┃ ┃ ┃ ┣ lectureAdmin.js
 ┃ ┃ ┃ ┣ lecturePlayer.js
 ┃ ┃ ┃ ┣ login.js
 ┃ ┃ ┃ ┣ myPage.js
 ┃ ┃ ┃ ┣ Payment.js
 ┃ ┃ ┃ ┣ PaymentCheck.js
 ┃ ┃ ┃ ┣ paymentPopup.js
 ┃ ┃ ┃ ┣ pilatesClass.js
 ┃ ┃ ┃ ┣ reivew.js
 ┃ ┃ ┃ ┣ session.js
 ┃ ┃ ┃ ┣ teacherInfoCheck.js
 ┃ ┃ ┃ ┣ teacherInfoDetail.js
 ┃ ┃ ┃ ┣ userInfoCheck.js
 ┃ ┃ ┃ ┣ writeAdmin.js
 ┃ ┃ ┃ ┗ yogaClass.js
 ┃ ┣ 📂templates
 ┃ ┃ ┣ adminPage.html
 ┃ ┃ ┣ board.html
 ┃ ┃ ┣ boardEdit.html
 ┃ ┃ ┣ boardRead.html
 ┃ ┃ ┣ calorieDetail.html
 ┃ ┃ ┣ calorieSearch.html
 ┃ ┃ ┣ cart.html
 ┃ ┃ ┣ classDetail.html
 ┃ ┃ ┣ contentsByteacherBody.html
 ┃ ┃ ┣ courseHistory.html
 ┃ ┃ ┣ dailyChart.html
 ┃ ┃ ┣ editProfile.html
 ┃ ┃ ┣ eventPage.html
 ┃ ┃ ┣ findId.html
 ┃ ┃ ┣ findPassword.html
 ┃ ┃ ┣ healthClass.html
 ┃ ┃ ┣ index.html
 ┃ ┃ ┣ join.html
 ┃ ┃ ┣ lectureAdmin.html
 ┃ ┃ ┣ lecturePlayer.html
 ┃ ┃ ┣ login.html
 ┃ ┃ ┣ myPage.html
 ┃ ┃ ┣ Payment.html
 ┃ ┃ ┣ PaymentCheck.html
 ┃ ┃ ┣ PaymentPopUp.html
 ┃ ┃ ┣ pilatesClass.html
 ┃ ┃ ┣ reivew.html
 ┃ ┃ ┣ signupSuccess.html
 ┃ ┃ ┣ teacherInfoCheck.html
 ┃ ┃ ┣ userInfoCheck.html
 ┃ ┃ ┣ wishList.html
 ┃ ┃ ┣ writeAdmin.html
 ┃ ┃ ┗ yogaClass.html

 ```
<br>

## 폴더 구조

<br>

- css, html, js 폴더를 따로 관리하여 가독성을 늘림
- templates의 정적 페이지를 백엔드의 ViewController가 보여주는 방식으로 설계함

<br>

