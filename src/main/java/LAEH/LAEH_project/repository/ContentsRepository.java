package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Contents;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContentsRepository extends JpaRepository<Contents, String> {
//    Optional<Contents> findByLectureId(String lectureId);
}
