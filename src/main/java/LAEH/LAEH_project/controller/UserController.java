package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.dto.SessionDto;
import LAEH.LAEH_project.dto.UserDto;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.UserDetailService;
import LAEH.LAEH_project.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private UserDetailService userDetailService;
    private AuthenticationManager authenticationManager;
    private HttpServletRequest httpServletRequest;

    @Autowired
    public UserController(UserService userService, UserDetailService userDetailService, AuthenticationManager authenticationManager, HttpServletRequest httpServletRequest) {
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.authenticationManager = authenticationManager;
        this.httpServletRequest = httpServletRequest;
    }

    @PostMapping("signup")
    public ResponseEntity<String> saveUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.saveUser(userDto), HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.getUser(), HttpStatus.OK);
    }

    @GetMapping("allbydto")
    public ResponseEntity<List<UserDto>> getAllUserByDto() {
        return new ResponseEntity<>(userService.getAllUserByDto(), HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto,
                                        HttpServletRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUserId(), userDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 세션 생성
        HttpSession session = request.getSession(false); // true : 세선이 없으면 새로 생성
        // 세션에 인증 객체 저장
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext());

        return ResponseEntity.ok("Success");
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if ( session != null) {
            session.invalidate();
        }
        return "로그아웃되었습니다.";
    }

    @GetMapping("current")
    public SessionDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("유저의 권한이없습니다");
        }
        SessionDto sessionDto = new SessionDto();
        sessionDto.setUserId(authentication.getName());
        sessionDto.setAuthority(authentication.getAuthorities());
        return sessionDto;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable String id,
                                               @RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateUserById(id , userDto),HttpStatus.OK);
    }
}
