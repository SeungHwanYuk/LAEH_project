package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.annotation.DateTimeFormat;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "영상번호")
    private long contentsId;

    @Column(name = "영상썸네일소스")
    private String contentsSrc;

    @ManyToOne
    @JoinColumn(name = "강의번호")
    private Lecture lectureId;

    @Column(name = "영상제목")
    private String contentsName;

    @DateTimeFormat(pattern = "HH:mm:ss")
    @Column(name = "총영상길이")
    private Time contentsTime;

    @Column(name = "내용")
    private String contentsText;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "영상등록일")
    private LocalDate contentsUploadDate;

    @Column(name = "컨텐츠이미지")
    private String contentsImage;

    @Column(name = "조회수")
    private long contentsClickedCount;

    // 윤별 작업
    @Column(name = "강의소개")
    private String lectureDesc;
    
    // 삭제
//    @Column(name = "강의소개이미지")
//    private String lectureInfoImg;
}
