package LAEH.LAEH_project.controller;

import LAEH.LAEH_project.dto.PostDto;
import LAEH.LAEH_project.dto.UserDto;
import LAEH.LAEH_project.model.Post;
import LAEH.LAEH_project.model.Subscribe;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @DeleteMapping("/deletePost/{postId}")
    public ResponseEntity<String> deletePostByPostId(@PathVariable long postId) {
        return new ResponseEntity<>(postService.deletePostByPostId(postId),HttpStatus.OK);
    }

    @PutMapping("/postComment/{postId}")
    public ResponseEntity<Post> commentPostById(@PathVariable long postId,
                                               @RequestBody PostDto postDto) {
        return new ResponseEntity<>(postService.savePostComment(postId, postDto),HttpStatus.OK);
    }




}
