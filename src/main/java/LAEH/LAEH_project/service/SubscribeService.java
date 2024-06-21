package LAEH.LAEH_project.service;


import LAEH.LAEH_project.dto.PostDto;
import LAEH.LAEH_project.dto.SubscribeDto;
import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.*;
import LAEH.LAEH_project.repository.ContentsRepository;
import LAEH.LAEH_project.repository.SubscribeRepository;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class SubscribeService {

    private SubscribeRepository subscribeRepository;
    private UserRepository userRepository;

    private ContentsRepository contentsRepository;

    @Autowired
    public SubscribeService(SubscribeRepository subscribeRepository, UserRepository userRepository, ContentsRepository contentsRepository) {
        this.subscribeRepository = subscribeRepository;
        this.userRepository = userRepository;
        this.contentsRepository = contentsRepository;
    }

    // 한개만 구독
//    public Subscribe saveSubscribe(Subscribe subscribe) {
//        subscribe.setSubscribeStartDate(LocalDate.now());
//        subscribeRepository.save(subscribe);
//
//        return subscribe;
//    }


    // 장바구니 리스트 구독
    public List<Subscribe> savePurchaseListToSubscribe(List<Subscribe> purchaseList) {
        for (int i = 0; i < purchaseList.size(); i++) {
            purchaseList.get(i).setSubscribeStartDate(LocalDate.now());
            subscribeRepository.save(purchaseList.get(i));
        }
        return purchaseList;
    }

    public SubscribeDto saveSubscribe(SubscribeDto subscribeDto) {
        Contents contents = contentsRepository.findById(subscribeDto.getContentsId())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 getContentsId."));
        User user = userRepository.findById(subscribeDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디를 확인해주세요."));
        Subscribe subscribe = new Subscribe();
        subscribe.setUserId(user);
        subscribe.setContentsId(contents);
        subscribe.setSubscribeStartDate(LocalDate.now());
        Subscribe saveSubscribe = subscribeRepository.save(subscribe);
        return subscribeDto.toSubscribeDtoFromSubscribe(saveSubscribe);
    }

    public List<SubscribeDto> saveSubscribeList(List<SubscribeDto> subscribeDto) {
        for (int i = 0; i < subscribeDto.size(); i++) {
            Contents contents = contentsRepository.findById(subscribeDto.get(i).getContentsId())
                    .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 getContentsId."));
            User user = userRepository.findById(subscribeDto.get(i).getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("아이디를 확인해주세요."));
            Subscribe subscribe = new Subscribe();
            subscribe.setUserId(user);
            subscribe.setContentsId(contents);
            subscribe.setSubscribeStartDate(LocalDate.now());
            Subscribe saveSubscribe = subscribeRepository.save(subscribe);
            subscribeDto.get(i).toSubscribeDtoFromSubscribe(saveSubscribe);
        }
        return subscribeDto;
    }

    // 써니 작업 유저아이디로 구독한 영상찾기
    public List<Subscribe> getListSubscribeByUserId(String userId) {
//        Optional<Contents> contentsOptional = contentsRepository.findByLectureId(lectureId);
//        if (contentsOptional.isPresent()) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            return subscribeRepository.findAll()
                    .stream()
                    .filter(subscribe -> subscribe.getUserId().equals(userOptional.get()))
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Subscribe", "ID", userId);
        }
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


