package LAEH.LAEH_project.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

public class Liked {

    @ManyToMany
    @JoinColumn(name = "영상번호")
    private Contents contentsId;

    @ManyToOne
    @JoinColumn(name = "사용자아이디")
    private User userId;

    @Column(name = "찜한날짜")
    private LocalDateTime likedTime;

}
