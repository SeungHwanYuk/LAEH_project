package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.model.Teacher;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    private TeacherService teacherService;
    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    
    // 강사 전부 불러오기
    @GetMapping("/all")
    public ResponseEntity<List<Teacher>> getAllTeacher() {
        return new ResponseEntity<>(teacherService.getAllTeacher(), HttpStatus.OK);
    }

    // 컨텐츠 ID로



}
