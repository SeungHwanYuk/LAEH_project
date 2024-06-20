package LAEH.LAEH_project.dto;


import LAEH.LAEH_project.model.Memo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MemoDto {

    private String userId;
    private String memoText;

    public MemoDto toMemoDto(Memo memo) {
        MemoDto memoDto = new MemoDto();
        memoDto.setUserId(getUserId());
        memoDto.setMemoText(getMemoText());
        return memoDto;
    }
}
