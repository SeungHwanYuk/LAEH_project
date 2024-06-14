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

    @GetMapping("/LAEH_project/classDetail.html")
    public String classDetail() {return "classDetail";}

    @GetMapping("/LAEH_project/signupSuccess.html")
    public String signupSuccess() {return "signupSuccess";}
}