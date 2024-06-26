package LAEH.LAEH_project.service;

import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.model.Lecture;
import LAEH.LAEH_project.model.Teacher;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.ContentsRepository;
import LAEH.LAEH_project.repository.LectureRepository;
import LAEH.LAEH_project.repository.TeacherRepository;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContentsService {
    private ContentsRepository contentsRepository;

    private LectureRepository lectureRepository;

    private TeacherRepository teacherRepository;

    private UserRepository userRepository;


    @Autowired
    public ContentsService(ContentsRepository contentsRepository, LectureRepository lectureRepository, TeacherRepository teacherRepository, UserRepository userRepository) {
        this.contentsRepository = contentsRepository;
        this.lectureRepository = lectureRepository;
        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
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
                    .sorted(Comparator.comparing(Contents::getContentsUploadDate).reversed())
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Contents", "ID", lectureId);
        }
    }

    public List<Contents> findContentsByTeacherId(String teacherId) {
        return contentsRepository.findContentsByTeacherId(teacherId);
    }



//    public List<Objects> getListContentsByTeacherId(String id) {
//        Optional<Teacher> teacher = teacherRepository.findById(id);
//        if (teacher.isEmpty()) {
//            throw new RuntimeException("No Contents");
//        }
//            List<Lecture> lectures = lectureRepository.findByTeacherId(teacher.get());
//            List<Objects> objects = lectures.stream().map((lecture) -> contentsRepository.findByLectureId(lecture))
//                    .collect(Collectors.toList());
//            return objects;
//    }


//    // 써니 작업 선생님 아이디로 영상찾기
//    public List<Contents> getListContentsByTeacherId(String teacherId) {
////        Optional<Contents> contentsOptional = contentsRepository.findByLectureId(lectureId);
////        if (contentsOptional.isPresent()) {
//        Optional<User> userOptional = userRepository.findById(teacherId);
//        List<Teacher> teacherAllList  = teacherRepository.findAll();
//        List<Lecture> lectureAllList = lectureRepository.findAll();
//        if(userOptional.isPresent()) {
//            return contentsRepository.findAll()
//                    .stream()
//                    .filter(contents -> contents.getLectureId().equals(lectureOptional.get()))
//                    .sorted(Comparator.comparing(Contents::getContentsUploadDate).reversed())
//                    .collect(Collectors.toList());
//        } else {
//            throw new ResourceNotFoundException("Contents", "ID", teacherId);
//        }
//    }



    // 승환 조회수 높은 순으로 불러오기
    public List<Contents> getListContentsSortedClick(String lectureId) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
        if (lectureOptional.isPresent()) {
            return contentsRepository.findAll()
                    .stream()
                    .filter(contents -> contents.getLectureId().equals(lectureOptional.get()))
                    .sorted(Comparator.comparing(Contents::getContentsClickedCount).reversed())
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Contents", "ID", lectureId);
        }
    }

    // 승환 영상번호 순으로 불러오기
    public List<Contents> getListContentsSortedById(String lectureId) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
        if (lectureOptional.isPresent()) {
            return contentsRepository.findAll()
                    .stream()
                    .filter(contents -> contents.getLectureId().equals(lectureOptional.get()))
                    .sorted(Comparator.comparing(Contents::getContentsId))
                    .collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Contents", "ID", lectureId);
        }
    }

    // 조회수 카운트 코드 (null값 수정해야함)
    public Contents clickCountByContentsId(long contentsId) {
        Optional<Contents> contentsOptional = contentsRepository.findById(contentsId);
        if(contentsOptional.isPresent()) {

            long temp = 0;
            temp = contentsOptional.get().getContentsClickedCount();
            contentsOptional.get().setContentsClickedCount(temp + 1);
            return contentsOptional.get();
        }
        else {
            throw new ResourceNotFoundException("Contents", "ID", contentsId);
            }
        }

        public Contents saveContents(Contents contents) {
            contents.setContentsUploadDate(LocalDate.now());
            contents.setContentsClickedCount(0);
            return contentsRepository.save(contents);
        }

    // 윤별 작업 (ID별 강좌 조회)
    public Contents getContentsById(long id) {
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
