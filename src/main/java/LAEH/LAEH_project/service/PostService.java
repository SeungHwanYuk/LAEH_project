package LAEH.LAEH_project.service;

import LAEH.LAEH_project.dto.PostDto;
import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Board;
import LAEH.LAEH_project.model.Post;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.BoardRepository;
import LAEH.LAEH_project.repository.PostRepository;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {
    PostRepository postRepository;

    UserRepository userRepository;

    BoardRepository boardRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, BoardRepository boardRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
    }

    public PostDto savePost(PostDto postDto){
        Board board = boardRepository.findById(postDto.getBoardNumber())
                .orElseThrow(()->new IllegalArgumentException("유효하지 않은 게시판아이디입니다."));
        User user= userRepository.findById(postDto.getUserId())
                .orElseThrow(()-> new IllegalArgumentException("아이디를 확인해주세요."));
        Post post = new Post();
        post.setBoard(board);
        post.setUserId(user);
        post.setPostTitle(postDto.getPostTitle());
        post.setPostContent(postDto.getPostContent());
        post.setPostComent(postDto.getPostComent());
        Post savePost = postRepository.save(post);
        return postDto.toPostDtoFromPost(savePost);
    }
    public Post savePostComment(long postId, PostDto postDto){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            optionalPost.get().setPostComent(postDto.getPostComent());
            postRepository.save(optionalPost.get());
            return optionalPost.get();
        } else {
            throw new ResourceNotFoundException("Post", "ID", postId);
        }
    }

    public List<Post> getAllPost (){
        return postRepository.findAll();
    }
    public List<Post> getAllPostByReverse (){
        return postRepository.findAll()
                .reversed();
    }
    public Post getPostByPostId(long postId){
        Optional<Post> postOptional = postRepository.findById(postId);
        if(postOptional.isPresent()) {
            return postOptional.get();
        } else {
            throw new ResourceNotFoundException("postId가","없떠요",postId);
        }
    }
    
    
    // 게시판 글 삭제
    public String deletePostByPostId(long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if(postOptional.isPresent()) {
            postRepository.deleteById(postId);
            return "Deleted";
        } else {
            throw new ResourceNotFoundException("PostId", "ID", postId);
        }
    }


}
