package LAEH.LAEH_project.dto;

import LAEH.LAEH_project.model.User;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {

    @NotBlank(message = "유저 아이디는 필수로 입력해주세요")
    private String userId;

    @NotBlank(message = "비밀번호는 필수로 입력해주세요")
    @Size(min = 4, message = "비밀번호는 4글자 이상으로 입력해주세요")
    private String password;

    @NotBlank(message = "이름은 필수로 입력해주세요")
    private String userName;

    @NotBlank(message = "이메일은 필수로 입력해주세요")
    @Email(message = "이메일 형식으로 입력해주세요")
    private String userEmail;

    @NotBlank(message = "성별은 필수로 선택해주세요")
    private String gender;
    @NotBlank(message = "닉네임은 필수로 입력해주세요")
    private String userNickname;

    private String phoneNum;



    // 0701 BaseResponse를 위한 Dto수정 승환
    public static UserDto toUserDtoFromUser(User user) {
        return new UserDto(
                user.getUserId(),
                null,
                user.getUserName2(),
                user.getUserEmail(),
                user.getGender(),
                user.getUserNickname(),
                user.getPhoneNum()
        );
    }

//    public static UserDto toUserDtoFromUser(User user) {
//        UserDto userDto = new UserDto();
//        userDto.setUserId(user.getUserId());
//        userDto.setUserEmail(user.getUserEmail());
//        userDto.setUserName(user.getUsername());
//        userDto.setPassword(user.getPassword());
//        return userDto;
//    }
}
