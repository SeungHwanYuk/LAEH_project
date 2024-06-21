package LAEH.LAEH_project.service;


import LAEH.LAEH_project.model.Lecture;
import LAEH.LAEH_project.model.Teacher;
import LAEH.LAEH_project.repository.LectureRepository;
import LAEH.LAEH_project.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LectureService {

    private LectureRepository lectureRepository;

    private TeacherRepository teacherRepository;

    @Autowired
    public LectureService(LectureRepository lectureRepository, TeacherRepository teacherRepository) {
        this.lectureRepository = lectureRepository;
        this.teacherRepository = teacherRepository;
    }


    // 강의 전부 불러오기
    public List<Lecture> getAllLecture() {
        return lectureRepository.findAll();
    }

}
