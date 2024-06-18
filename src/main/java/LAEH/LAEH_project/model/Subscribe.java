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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "구독번호")
    private long subscribeId;

    @ManyToOne
    @JoinColumn(name = "영상번호")
    private Contents contentsId;

    @ManyToOne
    @JoinColumn(name = "사용자아이디")
    private User userId;


    @Column(name = "구독시작일")
    private LocalDate subscribeStartDate;



}
