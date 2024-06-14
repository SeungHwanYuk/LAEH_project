package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LectureRepository extends JpaRepository<Lecture, String > {
    Optional<Lecture> findByLectureId(String lectureId);
}
