package LAEH.LAEH_project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "영상리뷰")
public class ReviewContents {

    @Id
    @Column(name = "영상리뷰번호")
    private String ContentsReviewId;

    @ManyToOne
    @JoinColumn(name = "사용자아이디")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "영상번호")
    private Contents contentsId;

    @Column(name = "리뷰내용")
    private String reviewText;

    @Column(name = "리뷰등록일")
    private LocalDate reviewDate;

}
