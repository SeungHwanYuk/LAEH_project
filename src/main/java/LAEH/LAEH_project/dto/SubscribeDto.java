package LAEH.LAEH_project.dto;

import LAEH.LAEH_project.model.Subscribe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SecondaryRow;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeDto {

    private long contentsId;
    private String userId;

    public SubscribeDto toSubscribeDtoFromSubscribe(Subscribe subscribe) {
        SubscribeDto subscribeDto = new SubscribeDto();
        subscribeDto.setUserId(getUserId());
        subscribeDto.setContentsId(getContentsId());
        return subscribeDto;
    }

}
