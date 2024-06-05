package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "강의리뷰")
public class ReviewLecture {
    @Id
    @Column(name = "강의리뷰번호")
    private String lectureReviewId;

    @ManyToOne
    @JoinColumn(name = "사용자아이디")
    private User userId;

    @Column(name = "리뷰내용")
    private String reviewText;
    @Column(name = "리뷰등록일")
    private LocalDate reviewDate;
}
