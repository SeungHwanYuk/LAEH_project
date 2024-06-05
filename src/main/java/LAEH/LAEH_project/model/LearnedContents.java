package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "진도율")
public class LearnedContents {

    @OneToOne
    @JoinColumn(name = "구독번호")
    private Subscribe subscribeId;

    @Column(name = "저장시점")
    private int contentsLearnedPoint;


    // 진도율
}
