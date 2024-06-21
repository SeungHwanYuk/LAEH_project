package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.model.Lecture;
import LAEH.LAEH_project.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lecture")
public class LectureController {

    private LectureService lectureService;

    @Autowired
    public LectureController(LectureService lectureService) {
        this.lectureService = lectureService;
    }

    // 강의 전부 불러오기
    @GetMapping("/all")
    public ResponseEntity<List<Lecture>> getAllLecture() {
        return new ResponseEntity<>(lectureService.getAllLecture(), HttpStatus.OK);
    }
}
