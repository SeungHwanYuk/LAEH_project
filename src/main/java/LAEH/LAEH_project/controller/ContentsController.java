package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.repository.ContentsRepository;
import LAEH.LAEH_project.service.ContentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/contents")
public class ContentsController {

    // 영상 등록시 조회수 null로 못하게 막을것!

    private ContentsService contentsService;

    @Autowired
    public ContentsController(ContentsService contentsService) {
        this.contentsService = contentsService;
    }

    // 영상 전부 불러오기
    @GetMapping("/all")
    public ResponseEntity<List<Contents>> getAllContents() {
        return new ResponseEntity<>(contentsService.getAllContents(), HttpStatus.OK);
    }

    // H, Y, P 강의 ID로 영상찾기 
    @GetMapping("/listContents/lecture/{lectureId}")
    public ResponseEntity<List<Contents>> getListContents(@PathVariable String lectureId) {
        return new ResponseEntity<>(contentsService.getListContents(lectureId), HttpStatus.OK);
    }

    
    // 선생님 아이디로 컨텐츠 찾기
    @GetMapping("/listContents/teacher/{teacherId}")
    public ResponseEntity<List<Contents>> getListContentsByTeacherId(@PathVariable String teacherId) {
        return new ResponseEntity<>(contentsService.findContentsByTeacherId(teacherId), HttpStatus.OK);
    }


    // 영상 번호순 정렬
    @GetMapping("/listContents/contentsNum/{lectureId}")
    public ResponseEntity<List<Contents>> getListContentsSortedById(@PathVariable String lectureId) {
        return new ResponseEntity<>(contentsService.getListContentsSortedById(lectureId), HttpStatus.OK);
    }


    // 조회수 높은순 정렬
    @GetMapping("/listContents/popular/{lectureId}")
    public ResponseEntity<List<Contents>> getListContentsSortedClick(@PathVariable String lectureId) {
        return new ResponseEntity<>(contentsService.getListContentsSortedClick(lectureId), HttpStatus.OK);
    }

    // 조회수 올리기
    @PutMapping("/count/{contentsId}")
    public ResponseEntity<Contents> clickCountByContentsId(@PathVariable long contentsId) {
        return new ResponseEntity<>(contentsService.clickCountByContentsId(contentsId), HttpStatus.OK);
    }

    // 영상 저장
    @PostMapping("/save")
    public ResponseEntity<Contents> saveContents(@RequestBody Contents contents) {
        return new ResponseEntity<>(contentsService.saveContents(contents), HttpStatus.OK);
    }




    // 윤별 작업 (영상ID별 강좌 조회)
    @GetMapping("/{id}")
    public ResponseEntity<Contents> getContentsById(@PathVariable long id) {
        return new ResponseEntity<>(contentsService.getContentsById(id), HttpStatus.OK);
    }

}
