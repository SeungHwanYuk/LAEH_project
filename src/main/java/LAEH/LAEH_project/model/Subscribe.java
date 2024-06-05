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
@Setter
@Getter
@Table(name = "구독")
public class Subscribe {

    @Id
    @Column(name = "구독번호")
    private String subscribeId;

    @ManyToOne
    @JoinColumn(name = "강의번호")
    private Lecture lectureId;

    @ManyToOne
    @JoinColumn(name = "사용자아이디")
    private User userId;

    @Column(name = "구독시작일")
    private LocalDate sub
}
