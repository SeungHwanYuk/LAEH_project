package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "게시글")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "게시글번호")
    private long postId;

    @Column(name = "글제목", length = 150, nullable = false)
    private String postTitle;

    @Column(name = "글내용",length = 5000)
    private String postContent;

    @Column(name = "등록일자", nullable = false)
    private LocalDateTime postDate;

    @ManyToOne
    @JoinColumn(name = "사용자아이디", nullable = false)
    private User userId;

    @ManyToOne
    @JoinColumn(name = "게시판ID", nullable = false)
    private Board board;

    @Column(name = "댓글",length = 5000)
    private String postComent;


    @PrePersist
    protected void onCreate(){
        this.postDate = LocalDateTime.now();
    }

}
