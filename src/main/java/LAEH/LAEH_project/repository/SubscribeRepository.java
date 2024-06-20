package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.dto.SubscribeDto;
import LAEH.LAEH_project.model.Subscribe;
import LAEH.LAEH_project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long > {

    List<Subscribe> findByUserId(User user);

}
