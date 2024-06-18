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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "권한")
public class Authority {

    @Id
    @Column(name = "권한명", length = 50)
    private String authorityName;


    public String getAuthorityName() {
        return authorityName != null ? authorityName : "";
    }

    public void setAuthorityName(String authorityName) {
        this.authorityName = authorityName;
    }
}
