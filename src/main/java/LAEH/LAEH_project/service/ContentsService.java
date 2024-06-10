package LAEH.LAEH_project.service;

import LAEH.LAEH_project.model.Contents;
import LAEH.LAEH_project.repository.ContentsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
