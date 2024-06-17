package LAEH.LAEH_project.service;

import LAEH.LAEH_project.dto.MemoDto;
import LAEH.LAEH_project.exception.ResourceNotFoundException;
import LAEH.LAEH_project.model.Memo;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.MemoRepository;
import LAEH.LAEH_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MemoService {

    MemoRepository memoRepository;

    UserRepository userRepository;

    @Autowired
    public MemoService(MemoRepository memoRepository, UserRepository userRepository) {
        this.memoRepository = memoRepository;
        this.userRepository = userRepository;
    }



    public List<MemoDto> getMemoAllByDto() {
        List<Memo> memoList = memoRepository.findAll();
        List<MemoDto> memoDtoList = new ArrayList<>();
        for (int i = 0; i < memoList.size(); i++) {
            MemoDto reviewDto = new MemoDto();
            memoDtoList.add(reviewDto.toMemoDto(memoList.get(i)));
        }
        return memoDtoList;
    }

    // 메모저장
    public Memo saveMemo(Memo memo) {
        memo.setMemoDateTime(LocalDateTime.now());
        return memoRepository.save(memo);
    }

//    public Memo saveMemo(MemoDto memoDto) {
//        Memo memo = new Memo();
//        memoDto.setUserId(String.valueOf(memo.getUserId()));
//        memoDto.setMemoText(memo.getMemoText());
//        memoDto.setMemoDateTime(memo.getMemoDateTime());
//
//        return memoRepository.save(memo);
//    }


    // 메모삭제
    public String deleteMemo(long memoId) {
        Optional<Memo> optionalMemo = memoRepository.findById(memoId);
        if (optionalMemo.isPresent()) {
            memoRepository.deleteById(memoId);
            return "Deleted";
        } else {
            throw new ResourceNotFoundException("Contents", "ID", memoId);
        }
    }

    // 아이디별 메모 찾기
    public List<Memo> getMemoByUserId(String userId) {
//        Optional<User> optionalUser = userRepository.findByUserId(userId);
//        if(optionalUser.isPresent()) {
            return memoRepository.findAll()
                    .stream()
                    .filter(memo -> memo.getUserId().equals(userId))
                    .collect(Collectors.toList());
//        } else {
//            throw new ResourceNotFoundException("Contents", "ID", userId);
//        }
    }
}
