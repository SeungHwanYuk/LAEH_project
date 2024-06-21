package LAEH.LAEH_project.service;

import LAEH.LAEH_project.model.Teacher;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.ContentsRepository;
import LAEH.LAEH_project.repository.LectureRepository;
import LAEH.LAEH_project.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TeacherService {
    private TeacherRepository teacherRepository;

    private ContentsRepository contentsRepository;

    private LectureRepository lectureRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, ContentsRepository contentsRepository, LectureRepository lectureRepository) {
        this.teacherRepository = teacherRepository;
        this.contentsRepository = contentsRepository;
        this.lectureRepository = lectureRepository;
    }

    public List<Teacher> getAllTeacher() {
        return teacherRepository.findAll();
    }


//    public List<Teacher> getContentsByTeacher() {
//        return teacherRepository.findAll()
//
//    }




}
