package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.Memo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface MemoRepository extends JpaRepository<Memo, Long> {
}
