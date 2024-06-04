package LAEH.LAEH_project.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "사용자")
public class User { // UserDetails 상속 (세큐리티)

    @Id
    @Column(name = "사용자아이디", length = 100)
    private String userId;
//    @Column(name = "권한명")
//    private Authority authority;
    @Column(name = "비밀번호")
    private String password;
    @Column(name = "이메일")
    private String userEmail;
    @Column(name = "사용자이름")
    private String userName;
    @Column(name = "닉네임")
    private String userNickname;
    @Column(name = "핸드폰번호")
    private String phoneNum;
    @Column(name = "종목")
    private String lectureCategory;
    @Column(name = "계정생성날짜")
    private LocalDateTime createdAt;
    

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singletonList(
//                new SimpleGrantedAuthority(authority.getAuthorityName()));
//    }
}
