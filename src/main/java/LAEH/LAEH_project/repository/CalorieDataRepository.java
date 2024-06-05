package LAEH.LAEH_project.repository;

import LAEH.LAEH_project.model.CalorieData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalorieDataRepository extends JpaRepository<CalorieData, Long> {

    List<CalorieData> findByFoodName(String foodName);
}
