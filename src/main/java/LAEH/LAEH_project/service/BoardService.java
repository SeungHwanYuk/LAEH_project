package LAEH.LAEH_project.service;

import LAEH.LAEH_project.dto.PostDto;
import LAEH.LAEH_project.model.Board;
import LAEH.LAEH_project.model.Post;
import LAEH.LAEH_project.repository.BoardRepository;
import LAEH.LAEH_project.repository.PostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BoardService {
PostRepository postRepository;

BoardRepository boardRepository;
    @Autowired
    public BoardService(PostRepository postRepository, BoardRepository boardRepository) {
        this.postRepository = postRepository;
        this.boardRepository = boardRepository;
    }


    public List<Post> getPostByFreeBoard(Board boardId){
        return postRepository.findAll()
                .stream()
                .filter(post -> post.getBoard().equals(boardId))
                .collect(Collectors.toList());
    }

}
