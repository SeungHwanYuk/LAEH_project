package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "강의")
public class Lecture {

    @Id
    @Column(name = "강의번호")
    private String lectureId;

    @ManyToOne
    @JoinColumn(name = "강사번호")
    private Teacher teacherId;

    @Column(name = "강의명")
    private String lectureName;

    @Column(name = "총영상길이")
    private Time contentsTimeAll;

    @Column(name = "종목")
    private LectureCategory lectureCategory;
}
