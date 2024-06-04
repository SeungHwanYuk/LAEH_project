package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.getUser(), HttpStatus.OK);
    }

}
