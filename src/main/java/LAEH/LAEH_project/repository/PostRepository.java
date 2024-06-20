package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Board;
import LAEH.LAEH_project.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

//    Optional<Post> findByBoardId(long boardId);

}
