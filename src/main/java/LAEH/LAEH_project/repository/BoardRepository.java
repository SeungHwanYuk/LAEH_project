package LAEH.LAEH_project.repository;


import LAEH.LAEH_project.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface BoardRepository extends JpaRepository<Board, Long>{

}
