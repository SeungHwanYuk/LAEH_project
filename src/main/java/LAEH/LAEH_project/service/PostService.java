package LAEH.LAEH_project.service;

import LAEH.LAEH_project.dto.PostDto;
import LAEH.LAEH_project.model.Board;
import LAEH.LAEH_project.model.Post;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.BoardRepository;
import LAEH.LAEH_project.repository.PostRepository;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BoardRepository boardRepository;

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

        Post savePost = postRepository.save(post);
        return postDto.toPostDtoFromPost(savePost);
    }

}
