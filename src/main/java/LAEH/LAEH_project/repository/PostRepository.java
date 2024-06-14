package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
