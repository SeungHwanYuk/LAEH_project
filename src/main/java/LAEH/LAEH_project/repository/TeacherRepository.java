package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Teacher;
import LAEH.LAEH_project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, String > {
    Optional<Teacher> findByTeacherId(String userId);
}
