package LAEH.LAEH_project.model;


import LAEH.LAEH_project.model.Enum.LectureCategory;
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
    private String lectureId; // 렉쳐 아이디로 컨텐츠찾기

    @ManyToOne
    @JoinColumn(name = "강사번호")
    private Teacher teacherId;

    @Column(name = "강의명")
    private String lectureName;

    @Column(name = "총영상길이")
    private Time contentsTimeAll;

    @Enumerated(EnumType.STRING)
    @Column(name = "종목")
    private LectureCategory lectureCategory;

    @Column(name = "강의내용")
    private String lectureText;

    @Column(name = "썸네일이미지")
    private String thumbnailImage;
}
