package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

import java.sql.Time;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "영상")
public class Contents {

    @Id
    @Column(name = "영상번호")
    private String contentsId;

    @Column(name = "영상소스")
    private String contentsSrc;

    @ManyToOne
    @JoinColumn(name = "강의번호")
    private Lecture lectureId;

    @Column(name = "영상제목")
    private String contentsName;
    @Column(name = "영상길이")
    private Time contentsTime;
    @Column(name = "내용")
    private String contentsText;
    @Column(name = "영상등록일")
    private LocalDate contentsUploadDate;

    @Column(name = "컨텐츠이미지")
    private String contentsImage;

    // 윤별 작업
    @Column(name = "강의소개")
    private String lectureDesc;
}
