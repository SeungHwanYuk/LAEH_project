package LAEH.LAEH_project.service;


import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Subscribe;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.SubscribeRepository;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubscribeService {

    private SubscribeRepository subscribeRepository;
    private UserRepository userRepository;

    @Autowired
    public SubscribeService(SubscribeRepository subscribeRepository, UserRepository userRepository) {
        this.subscribeRepository = subscribeRepository;
        this.userRepository = userRepository;
    }

    public Subscribe saveSubscribe(Subscribe subscribe) {
        // 구매확정 바로 직전, 현재시간을 저장함
        subscribe.setSubscribeStartDate(LocalDate.now());
        subscribeRepository.save(subscribe);

        return subscribe;

    }


    // 현재 세션 유저 이름으로 구매한 게임 찾기
    public List<Subscribe> getSubscribeListByCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }
        String userId = authentication.getName();
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("User", "ID", userId);
        }
        return subscribeRepository.findByUserId(userOptional.get());
    }


}

