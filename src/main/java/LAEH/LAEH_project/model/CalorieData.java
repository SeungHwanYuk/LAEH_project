package LAEH.LAEH_project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "성분정리표")
public class CalorieData {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "음식명")
    private String foodName;
    @Column(name = "1인분칼로리(kcal)")
    private double cal;
    @Column(name = "탄수화물(g)")
    private double carbohydrate;
    @Column(name = "단백질(g)")
    private double protein;
    @Column(name = "지방(g)")
    private double fat;
    @Column(name = "콜레스트롤(g)")
    private double cholesterol;
    @Column(name = "식이섬유(g)")
    private double dietaryFiber;
    @Column(name = "나트륨(g)")
    private double sodium;
    @Column(name = "등록일")
    private LocalDate date;
}
