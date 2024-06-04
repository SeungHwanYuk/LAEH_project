package LAEH.LAEH_project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "권한")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Authority {

    @Id
    @Column(name = "권한명", length = 50)
    private String authorityName;
}
