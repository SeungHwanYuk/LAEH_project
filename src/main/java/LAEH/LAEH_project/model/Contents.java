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
}
