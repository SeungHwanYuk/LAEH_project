package LAEH.LAEH_project.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "게시판")
public class Board {
    @Id
    @Column (name = "글고유번호")
    private long boardNumber;

    @Column (name = "제목")
    private String boardTitle;

}
