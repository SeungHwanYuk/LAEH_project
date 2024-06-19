package LAEH.LAEH_project.controller;


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
    public ResponseEntity<Subscribe> saveSubscribe(@RequestBody Subscribe subscribe){
        return new ResponseEntity<>(subscribeService.saveSubscribe(subscribe), HttpStatus.CREATED);
    }

    @PostMapping("/buy/list")
    @PreAuthorize("hasAnyRole('ADMIN','USER','TEACHER')")
    public List<Subscribe> savePurchaseListToSubscribe(@RequestBody List<Subscribe> purchaseList){
        return subscribeService.savePurchaseListToSubscribe(purchaseList);
    }

    // 현재 세션 구독목록
    @GetMapping("/current")
    public List<Subscribe> getSubscribeListByCurrentUser() {
        return subscribeService.getSubscribeListByCurrentUser();
    }

}
