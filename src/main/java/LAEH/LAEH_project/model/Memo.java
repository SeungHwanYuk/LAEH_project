package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "메모장")
public class Memo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "메모번호")
    private long memoId;

    @Column(name = "메모내용")
    private String memoText;

    @Column(name = "메모등록날짜")
    private LocalDateTime memoDateTime;

    @ManyToOne
    @JoinColumn(name = "사용자아이디")
    private User userId;

//    @ManyToOne
//    @JoinColumn(name = "사용자아이디")
//    private User userId; // 트랜젝션 null 문제로 잠시 DTO 이용!

}
