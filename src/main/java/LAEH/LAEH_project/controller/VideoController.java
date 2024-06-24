package LAEH.LAEH_project.controller;


import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.model.Video;
import LAEH.LAEH_project.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/video")
public class VideoController {

    @Autowired
    private VideoService videoService;



    // 영상아이디로 동영상 불러오기
    @GetMapping("/listVideo/contents/{contentsId}")
    public ResponseEntity<List<Video>> getListVideoByContents(@PathVariable long contentsId) {
        return new ResponseEntity<>(videoService.getListVideoByContents(contentsId), HttpStatus.OK);
    }

}
