package LAEH.LAEH_project.service;

import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.model.Lecture;
import LAEH.LAEH_project.repository.ContentsRepository;
import LAEH.LAEH_project.repository.LectureRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContentsService {
    private ContentsRepository contentsRepository;

    private LectureRepository lectureRepository;

    @Autowired
    public ContentsService(ContentsRepository contentsRepository, LectureRepository lectureRepository) {
        this.contentsRepository = contentsRepository;
        this.lectureRepository = lectureRepository;
    }

    public List<Contents> getAllContents() {
        return contentsRepository.findAll();
    }

    // 써니 작업 강의아이디로 영상찾기
    public List<Contents> getListContents(String lectureId) {
//        Optional<Contents> contentsOptional = contentsRepository.findByLectureId(lectureId);
//        if (contentsOptional.isPresent()) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
        if (lectureOptional.isPresent()) {
            return contentsRepository.findAll()
                    .stream()
                    .filter(contents -> contents.getLectureId().equals(lectureOptional.get()))
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Contents", "ID", lectureId);
        }
    }

    // 조회수 카운트 코드
    public Contents clickCountBycontentsId(String contentsId) {
        Optional<Contents> contentsOptional = contentsRepository.findById(contentsId);
        if(contentsOptional.isPresent()) {
            return null;
        }
        else {
            throw new ResourceNotFoundException("Contents", "ID", contentsId);
            }
        }
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
//
//    public Contents getContentsByLectureId(String lectureId) {
//        Optional<Contents> contentsOptional = contentsRepository.findByLectureId(lectureId);
//        if (contentsOptional.isPresent()) {
//            return contentsOptional.get();
//        } else {
//            throw new ResourceNotFoundException("Contents", "lecture ID", lectureId);
//        }
//    }
}
