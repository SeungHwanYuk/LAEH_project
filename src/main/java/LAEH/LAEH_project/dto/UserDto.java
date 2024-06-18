package LAEH.LAEH_project.dto;

import LAEH.LAEH_project.model.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {
    private String userId;
    private String password;
    private String userName;
    private String userEmail;


    private String gender;
    private String userNickname;
    private String phoneNum;


    public UserDto toUserDtoFromUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserName(user.getUsername());
        userDto.setPassword(user.getPassword());
        return userDto;
    }
}
