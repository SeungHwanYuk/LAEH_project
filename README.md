<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=header" />

### Hello PT


<br>

> 바쁜 사회인들을 위한 온라인 헬스 클래스 웹페이지

<br>

# 배포

<br>

**https://seunghwanyuk.github.io/LAEH_project/src/main/resources/templates/**

<br>

# 프로젝트 소개

<br>

>온라인 헬스 클래스를 바탕으로 여가 시간이 부족한 현대인들을 위하여 기획함
>
>종목에 따른 선생님이 개인 PT를 온라인으로 피드백 할 수 있도록 에듀테크 과정에 맞게 설계함

<br>

개발기간

<br>

2024-06-03 ~ 2024-06-28 

<br>

팀원 구성
<br>

육승환 ysh54244902@gmail.com github.com/SeungHwanYuk
<br>

송진경 rudwlsthd123@naver.com github.com/bobo459
<br>

윤 별 ydb0717@gmail.com github.com/star0717
<br>

## 기술 스택

<br>

백엔드
- Java
- SpringBoot(v3.3.0)
- Spring Security(v3.3.0) , Lombok
- JPA

<br>

프론트엔드 
- html, css , JavaScript
- video.js (v8.10.0), axios (v1.7.2)

<br>

개발 툴
- VScode, intelliJ, adobe photoshop, figma, postman
  
<br>

DB
- MariaDB
  - DBeaver
 
<br>

개발환경
- Windows, macOS

<br>

## 프로젝트 구조

### 백엔드

<details>
  <summary>펼치기</summary>

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

</details>

### 프론트 엔드

<details>
  <summary>펼치기</summary>

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

</details>



#### 폴더 구조

- css, html, js 폴더를 따로 관리하여 가독성을 늘림
- templates의 정적 페이지를 백엔드의 ViewController가 보여주는 방식으로 설계함

<br>

## ERD
![project_TBeaver](https://github.com/user-attachments/assets/635e4dc2-18af-4d14-8e3c-c4be584339b6)

<br>

## 역할분담

<br>

#### 육승환

<br>

*기초 서버구조 설계 <br>
RestAPI 설계 및 테스트 <br>
데이터 정제 및 정규화 <br>
java, javascript, html, css 구현 및 테스트* 

<br>

기능구현
- 로그인, 로그아웃, 회원가입
- 회원정보 수정, 수강이력, 데일리차트 (칼로리 검색)
- 구독하기, 위시리스트 추가 및 삭제
- 동영상 플레이어
- 게시글 수정, 삭제
- 관리자 권한
  
<br>

#### 송진경

<br>

- 프로젝트 와이어프레임 제작
- 게시판 설계
- 이미지 제작
- javascript, html, css 구현 및 테스트

<br>

#### 윤 별

<br>

- 전체 퍼블리싱 담당 및 일부 이미지 제작
- 외부 데이터 수집 및 자료조사
- 유효성 검사 테스트
- javascript, html, css 구현 및 테스트

<br>


## 페이지 기능

<br>

작성중 !!

<br>

## HelloPT 실행법

<br>

1. Java(백엔드 서버)를 실행시켜 테이블을 생성 해주세요. 
> Main의 `PocatRushApplication` 실행 (서버 실행)

<br>

2. DB를 만든 후 dump파일을 restore 해주세요.
> - MariaDB를 설치 후 `laeh_project`로 새로운 이름의 DB 생성
> - dump 폴더의 `최신날짜.spl` 선택 후 restore

<br>

3. VScode의 GoLive(extensions)를 이용하거나, 


<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=footer" />
