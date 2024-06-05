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
@Table(name = "강의세부")
public class LectureDetail {

    @Id
    @Column(name = "강의세부고유번호")
    private int LearnedContentsId;

    @ManyToOne
    @JoinColumn(name = "강의번호")
    private Lecture lectureId;

    @Column(name = "구독료")
    private int lecturePrice;

    @Column(name = "강의설명")
    private String lectureText;

}
