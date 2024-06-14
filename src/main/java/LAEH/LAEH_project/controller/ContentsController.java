package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.service.ContentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contents")
public class ContentsController {

    private ContentsService contentsService;

    @Autowired
    public ContentsController(ContentsService contentsService) {
        this.contentsService = contentsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Contents>> getAllContents() {
        return new ResponseEntity<>(contentsService.getAllContents(), HttpStatus.OK);};

    @GetMapping("/listContents/{lectureId}")
    public ResponseEntity<List<Contents>> getListContents(@PathVariable String lectureId) {
        return new ResponseEntity<>(contentsService.getListContents(lectureId), HttpStatus.OK);
    }

    @PutMapping("/{contentsId}")
    public ResponseEntity<Contents> clickCountBycontentsId(@PathVariable String contentsId) {
        return new ResponseEntity<>(contentsService.clickCountBycontentsId(contentsId), HttpStatus.OK);
    }



    // 윤별 작업 (ID별 강좌 조회)
    @GetMapping("/{id}")
    public ResponseEntity<Contents> getContentsById(@PathVariable String id) {
        return new ResponseEntity<>(contentsService.getContentsById(id), HttpStatus.OK);
    }

//    @GetMapping("/{lectureId}")
//    public ResponseEntity<Contents> getContentsByLectureId(@PathVariable String lectureId){
//        return new ResponseEntity<>(contentsService.getContentsByLectureId(lectureId), HttpStatus.OK);
//    }

}
