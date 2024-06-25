package LAEH.LAEH_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/login")
    public String loginForm() {
        return "login_form";
    }

    @GetMapping("/articles")
    public String article() {
        return "article";
    }

    @GetMapping("/LAEH_project/index.html")
    public String index() {return "index";}

//    @GetMapping("/LAEH_project/singleProduct.html")
//    public String singleProduct() {return "singleProduct";}
    @GetMapping("/LAEH_project/login.html")
    public String login() {return "login";}

    @GetMapping("/LAEH_project/join.html")
    public String join() {return "join";}

    @GetMapping("/LAEH_project/healthClass.html")
    public String healthClass() {return "healthClass";}

    @GetMapping("/LAEH_project/yogaClass.html")
    public String yogaClass() {return "yogaClass";}

    @GetMapping("/LAEH_project/pilatesClass.html")
    public String pilatesClass() {return "pilatesClass";}

    @GetMapping("/LAEH_project/classDetail.html")
    public String classDetail() {return "classDetail";}

    @GetMapping("/LAEH_project/signupSuccess.html")
    public String signupSuccess() {return "signupSuccess";}

    @GetMapping("/LAEH_project/findId.html")
    public String findId() {return "findId";}

    @GetMapping("/LAEH_project/board.html")
    public String board() {return "board";}

    @GetMapping("/LAEH_project/calorieDetail.html")
    public String calorieDetail() {return "calorieDetail";}

    @GetMapping("/LAEH_project/calorieSearch.html")
    public String calorieSearch() {return "calorieSearch";}

    @GetMapping("/LAEH_project/findPassword.html")
    public String findPassword() {return "findPassword";}

    @GetMapping("/LAEH_project/lecturePlayer.html")
    public String lecturePlayer() {return "lecturePlayer";}

    @GetMapping("/LAEH_project/myPage.html")
    public String myPage() {return "myPage";}

    @GetMapping("/LAEH_project/Payment.html")
    public String Payment() {return "Payment";}

    @GetMapping("/LAEH_project/PaymentCheck.html")
    public String PaymentCheck() {return "PaymentCheck";}

    @GetMapping("/LAEH_project/PaymentPopup.html")
    public String PaymentPopup() {return "PaymentPopup";}

    @GetMapping("/LAEH_project/review.html")
    public String review() {return "review";}

    @GetMapping("/LAEH_project/courseHistory.html")
    public String courseHistory() {return "courseHistory";}

    @GetMapping("/LAEH_project/editProfile.html")
    public String editProfile() {return "editProfile";}

    @GetMapping("/LAEH_project/dailyChart.html")
    public String dailyChart() {return "dailyChart";}

    @GetMapping("/LAEH_project/cart.html")
    public String cart() {return "cart";}

    @GetMapping("/LAEH_project/boardPost.html")
    public String boardPost() {return "boardPost";}

    @GetMapping("/LAEH_project/adminPage.html")
    public String adminPage() {return "adminPage";}

    @GetMapping("/LAEH_project/userInfoCheck.html")
    public String userInfoCheck() {return "userInfoCheck";}

    @GetMapping("/LAEH_project/teacherInfoCheck.html")
    public String teacherInfoCheck() {return "teacherInfoCheck";}

    @GetMapping("/LAEH_project/writeAdmin.html")
    public String writeAdmin() {return "writeAdmin";}

    @GetMapping("/LAEH_project/lectureAdmin.html")
    public String lectureAdmin() {return "lectureAdmin";}

    @GetMapping("/LAEH_project/eventPage.html")
    public String eventPage() {return "eventPage";}

    @GetMapping("/LAEH_project/boardRead.html")
    public String boardRead() {return "boardRead";}

    @GetMapping("/LAEH_project/boardEdit.html")
    public String boardEdit() {return "boardEdit";}

    @GetMapping("/LAEH_project/contentsByTeacherBody.html")
    public String contentsByTeacherBody() {return "contentsByTeacherBody";}

}