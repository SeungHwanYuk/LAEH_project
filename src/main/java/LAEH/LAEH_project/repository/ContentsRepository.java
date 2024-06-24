package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


public interface ContentsRepository extends JpaRepository<Contents, Long> {
//    Optional<Contents> findByLectureId(String lectureId);
    Optional<Contents> findByLectureId (Lecture lecture);

    Optional<Contents> findByContentsId(long contentsId);

    @Query("SELECT c FROM Contents c " +
            "JOIN c.lectureId l " +
            "JOIN l.teacherId t " +
            "JOIN t.userId u " +
            "WHERE u.userId = :teacherId")
    List<Contents> findContentsByTeacherId(@Param("teacherId") String teacherId);


}
