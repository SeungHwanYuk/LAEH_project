package LAEH.LAEH_project.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "동영상")
public class Video {

    @Id
    @Column(name = "동영상번호")
    private long videoNumber;

    @JoinColumn
    @OneToMany
    private Contents contents;

    @Column(name = "동영상소스")
    private String videoSrc;

    @Column(name = "동영상길이")
    private Time videoTime;

    @Column(name = "동영상제목")
    private String videoTitle;

    @Column(name = "동영상설명")
    private String videoDesc;
}
