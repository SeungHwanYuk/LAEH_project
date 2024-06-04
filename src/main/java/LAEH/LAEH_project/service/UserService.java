package LAEH.LAEH_project.service;

import LAEH.LAEH_project.model.Authority;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User saveUser(User user) {
        Authority authority =new Authority();
        authority.setAuthorityName("ROLE_USER");

        User users = new User(  // 패스워드 암호화 임시코드
                user.getUserId(),
                user.getAuthority(),
                bCryptPasswordEncoder.encode(user.getPassword()),
                user.getUserEmail(),
                user.getUsername(),
                user.getUserNickname(),
                user.getPhoneNum(),
                user.getLectureCategory(),
                LocalDateTime.now());
    return userRepository.save(users);
    }

    public List<User> getUser() {
        return userRepository.findAll();
    }
}
