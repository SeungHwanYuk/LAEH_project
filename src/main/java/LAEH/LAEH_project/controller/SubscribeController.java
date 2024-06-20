package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.dto.SubscribeDto;
import LAEH.LAEH_project.model.Subscribe;
import LAEH.LAEH_project.repository.SubscribeRepository;
import LAEH.LAEH_project.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subscribe")
public class SubscribeController {

    private SubscribeService subscribeService;

    @Autowired
    public SubscribeController(SubscribeService subscribeService) {
        this.subscribeService = subscribeService;
    }



    // 구독
    @PostMapping("/buy")
    @PreAuthorize("hasAnyRole('ADMIN','USER','TEACHER')")
    public ResponseEntity<SubscribeDto> saveSubscribe(@RequestBody SubscribeDto subscribeDto){
        return new ResponseEntity<>(subscribeService.saveSubscribe(subscribeDto), HttpStatus.CREATED);
    }

    @PostMapping("/buy/list")
    @PreAuthorize("hasAnyRole('ADMIN','USER','TEACHER')")
    public ResponseEntity<List<SubscribeDto>> saveSubscribeList(@RequestBody List<SubscribeDto> subscribeDto){
        return new ResponseEntity<>(subscribeService.saveSubscribeList(subscribeDto),HttpStatus.OK);
    }

    // 현재 세션 구독목록
    @GetMapping("/current")
    public List<Subscribe> getSubscribeListByCurrentUser() {
        return subscribeService.getSubscribeListByCurrentUser();
    }

}
