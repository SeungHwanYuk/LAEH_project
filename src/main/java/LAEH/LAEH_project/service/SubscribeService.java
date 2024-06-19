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


    // 한개만 구독
    public Subscribe saveSubscribe(Subscribe subscribe) {
        subscribe.setSubscribeStartDate(LocalDate.now());
        subscribeRepository.save(subscribe);

        return subscribe;
    }


    // 장바구니 리스트 구독
    public List<Subscribe> savePurchaseListToSubscribe(List<Subscribe> purchaseList) {
        for (int i = 0; i < purchaseList.size(); i++) {
            purchaseList.get(i).setSubscribeStartDate(LocalDate.now());
            subscribeRepository.save(purchaseList.get(i));
        }
        return purchaseList;
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

