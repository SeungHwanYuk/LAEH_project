package LAEH.LAEH_project.model;

import LAEH.LAEH_project.model.Enum.LectureCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "강사")
public class Teacher {

    @Id
    @Column(name = "강사번호")
    private String teacherId;
    @ManyToOne
    @JoinColumn(name = "강사아이디")
    private User userId;
    @Column(name = "강사닉네임")
    private String teacherNickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "담당종목")
    private LectureCategory lectureCategory; // ???????

    @Column(name = "강사등록일")
    private LocalDate teacherJoinDate;

    
    // 윤별 작업
    @Column(name = "강사사진")
    private String teacherPicture;

}
