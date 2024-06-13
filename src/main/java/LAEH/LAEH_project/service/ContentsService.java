package LAEH.LAEH_project.service;

import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.repository.ContentsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ContentsService {
    private ContentsRepository contentsRepository;

@Autowired
    public ContentsService(ContentsRepository contentsRepository) {
        this.contentsRepository = contentsRepository;
    }

    public List<Contents> getAllContents() {
        return contentsRepository.findAll();
    }

    
    // 윤별 작업 (ID별 강좌 조회)
    public Contents getContentsById(String id) {
        Optional<Contents> contentsOptional = contentsRepository.findById(id);
        if(contentsOptional.isPresent()) {
            return contentsOptional.get();
        }else {
            throw new ResourceNotFoundException("Contents", "ID", id);
        }
    }

    public Contents getContentsByLectureId(String lectureId) {
        Optional<Contents> contentsOptional = contentsRepository.findByLectureId(lectureId);
        if (contentsOptional.isPresent()) {
            return contentsOptional.get();
        } else {
            throw new ResourceNotFoundException("Contents", "lecture ID", lectureId);
        }
    }
}
