package LAEH.LAEH_project.controller;

import LAEH.LAEH_project.model.CalorieData;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.service.CalorieDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CalorieDataController {
    private CalorieDataService calorieDataService;

    @Autowired
    public CalorieDataController(CalorieDataService calorieDataService) {
        this.calorieDataService = calorieDataService;
    }

    @GetMapping("/cal/{foodName}")
    public ResponseEntity<List<CalorieData>> getCalDataByName(@PathVariable String foodName) {
        return new ResponseEntity<>(calorieDataService.getCalDataByName(foodName), HttpStatus.OK);
    }

    @GetMapping("/cal/contain/{foodName}")
    public ResponseEntity<List<CalorieData>> searchFoodName(@PathVariable String foodName) {
        return new ResponseEntity<>(calorieDataService.searchFoodName(foodName), HttpStatus.OK);
    }
}
