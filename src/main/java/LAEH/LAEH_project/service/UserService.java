package LAEH.LAEH_project.service;

import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UserService {

    private UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    public User saveUser(User user) {
    user.setCreatedAt(LocalDateTime.now());
    return userRepository.save(user);
    }

    public List<User> getUser() {
        return userRepository.findAll();
    }
}
