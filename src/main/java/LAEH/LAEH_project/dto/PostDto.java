package LAEH.LAEH_project.dto;

import LAEH.LAEH_project.model.Post;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class PostDto {
    private String postTitle;
    private String postContent;
    private String userId;
    private long boardNumber;
    private  String postComent;

    public PostDto toPostDtoFromPost(Post post) {
        PostDto postDto = new PostDto();
        postDto.setPostTitle(getPostTitle());
        postDto.setPostContent(getPostContent());
        postDto.setUserId(getUserId());
        postDto.setBoardNumber(getBoardNumber());
        postDto.setPostComent(getPostComent());
        return postDto;
    }
}
