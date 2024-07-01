package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.dto.BaseResponse;
import LAEH.LAEH_project.dto.SessionDto;
import LAEH.LAEH_project.dto.UserDto;
import LAEH.LAEH_project.enumstatus.ResultCode;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.UserDetailService;
import LAEH.LAEH_project.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
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
    public ResponseEntity<BaseResponse<String>> saveUser(@Valid @RequestBody UserDto userDto) {
        return new ResponseEntity<>(
                new BaseResponse<>(ResultCode.SUCCESS.name(),
                        userService.saveUser(userDto),
                        ResultCode.SUCCESS.getMsg()),HttpStatus.OK);
    }


    // 권한명 "ROLE_TEACHER" 로 선생님 전부 찾기
    @GetMapping("/teacher")
    private ResponseEntity<List<User>> getAllTeacher() {
        return new ResponseEntity<>(userService.getAllTeacher(),HttpStatus.OK);
    }

    // 유저의 모든 정보 표시 ( 암호화된 비밀번호 포함 )
    @GetMapping("all")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.getUser(), HttpStatus.OK);
    }


    // Dto로 유저 정보 표시. 비밀번호는 null ( 이외의 보안이 필요한 정보도 숨김 가능 )
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
    public ResponseEntity<BaseResponse<User>> updateUserById(@Valid @PathVariable String id,
                                               @RequestBody UserDto userDto) {
        return new ResponseEntity<>(
                new BaseResponse<>(
                        ResultCode.SUCCESS.name(),
                        userService.updateUserById(id , userDto),
                        ResultCode.SUCCESS.getMsg()),HttpStatus.OK);
    }
}
