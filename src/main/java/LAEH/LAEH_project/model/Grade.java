package LAEH.LAEH_project.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "등급")
public class Grade {
    @Id
    @Column(name = "등급명")
    private String levelName;

    @Column(name = "등급하한가")
    private int lowLimit;

    @Column(name = "등급상한가")
    private int highLimit;

    @Column(name = "할인율")
    private int discountPercent;
}
