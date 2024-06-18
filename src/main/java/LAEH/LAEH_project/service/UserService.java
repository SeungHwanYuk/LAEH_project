package LAEH.LAEH_project.service;

import LAEH.LAEH_project.dto.UserDto;
import LAEH.LAEH_project.exception.ResourceNotFoundException;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public String saveUser(UserDto userDto) {
        Authority authority =new Authority();
        authority.setAuthorityName("ROLE_USER");

    User users = new User(
             userDto.getUserId(),
             authority,
             bCryptPasswordEncoder.encode(userDto.getPassword()),
             userDto.getUserEmail(),
             userDto.getUserName(),
             userDto.getGender(),
             userDto.getUserNickname(),
             userDto.getPhoneNum(),
             LocalDateTime.now());
    return userRepository.save(users).getUserId();
    }



    public List<User> getUser() {
        return userRepository.findAll();
    }

    public List<UserDto> getAllUserByDto() {
        List<User> userList = userRepository.findAll();
        List<UserDto> userDtoList = new ArrayList<>();
        for (int i = 0; i < userList.size(); i++) {
            UserDto userDto = new UserDto();
            userDtoList.add(userDto.toUserDtoFromUser(userList.get(i)));
        }
        return userDtoList;
    }


    // 회원 정보 수정
    public User updateUserById(String id, UserDto userDto) {
        Optional<User> user1 = userRepository.findById(id);
        if (user1.isPresent()) {
            user1.get().setUserEmail(userDto.getUserEmail());
            user1.get().setUserName(userDto.getUserName());
            user1.get().setUserNickname(userDto.getUserNickname());
            user1.get().setGender(userDto.getGender());
            user1.get().setPassword(userDto.getPassword());
            user1.get().setPhoneNum(userDto.getPhoneNum());
            userRepository.save(user1.get());
            return user1.get();
        } else {
            throw new ResourceNotFoundException("User", "ID", id);
        }
    }
}
