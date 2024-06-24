package LAEH.LAEH_project.controller;

import LAEH.LAEH_project.dto.PostDto;
import LAEH.LAEH_project.model.Post;
import LAEH.LAEH_project.model.Subscribe;
import LAEH.LAEH_project.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;
    @PostMapping("/write")
    public ResponseEntity<PostDto> savePost(@RequestBody PostDto postDto){
        PostDto savePost = postService.savePost(postDto);
        return new ResponseEntity<>(savePost,
                HttpStatus.OK);
    }

    @GetMapping("/postId/{postId}")
    public ResponseEntity<Post> getPostByPostId(@PathVariable long postId) {
        return new ResponseEntity<>(postService.getPostByPostId(postId),HttpStatus.OK);
    }



}
