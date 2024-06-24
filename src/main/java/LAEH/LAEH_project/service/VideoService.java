package LAEH.LAEH_project.service;

import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.model.Lecture;
import LAEH.LAEH_project.model.Video;
import LAEH.LAEH_project.repository.ContentsRepository;
import LAEH.LAEH_project.repository.VideoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class VideoService {

    private VideoRepository videoRepository;

    private ContentsRepository contentsRepository;

    @Autowired
    public VideoService(VideoRepository videoRepository, ContentsRepository contentsRepository) {
        this.videoRepository = videoRepository;
        this.contentsRepository = contentsRepository;
    }


    public List<Video> getListVideoByContents(long contentsId) {

        Optional<Contents> contentsOptional = contentsRepository.findById(contentsId);
        if (contentsOptional.isPresent()) {
            return videoRepository.findAll()
                    .stream()
                    .filter(video -> video.getContentsId().equals(contentsOptional.get()))
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Contents", "ID", contentsId);
        }
    }
}
