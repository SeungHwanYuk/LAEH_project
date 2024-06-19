package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.dto.MemoDto;
import LAEH.LAEH_project.model.Memo;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memo")
public class MemoController {

    MemoService memoService;

    @Autowired
    public MemoController(MemoService memoService) {
        this.memoService = memoService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Memo>> getMemoByUserId(@PathVariable String userId) {
        return new ResponseEntity<>(memoService.getMemoByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<MemoDto> saveMemo(@RequestBody MemoDto memoDto) {
        return new ResponseEntity<>(memoService.saveMemo(memoDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{memoId}")
    public ResponseEntity<String> deleteMemo(@PathVariable long memoId) {
        return new ResponseEntity<>(memoService.deleteMemo(memoId),HttpStatus.OK);
    }


}
