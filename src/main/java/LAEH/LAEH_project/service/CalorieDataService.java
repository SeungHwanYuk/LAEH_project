package LAEH.LAEH_project.service;

import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.CalorieData;
import LAEH.LAEH_project.repository.CalorieDataRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CalorieDataService {

    private CalorieDataRepository calorieDataRepository;

    @Autowired
    public CalorieDataService(CalorieDataRepository calorieDataRepository) {
        this.calorieDataRepository = calorieDataRepository;
    }

    public List<CalorieData> getCalDataByName(String foodName) {
        return calorieDataRepository.findByFoodName(foodName);
    }

    public List<CalorieData> searchFoodName(String foodName) {
        return calorieDataRepository.findAll()
                .stream()
                .filter(calorieData -> calorieData.getFoodName().contains(foodName))
                .collect(Collectors.toList());
    }

}
