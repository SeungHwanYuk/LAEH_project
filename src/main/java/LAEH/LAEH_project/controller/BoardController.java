package LAEH.LAEH_project.controller;
//import LAEH.LAEH_project.dto.BoardDto;
import LAEH.LAEH_project.model.Board;
import LAEH.LAEH_project.model.User;
import LAEH.LAEH_project.repository.BoardRepository;
import LAEH.LAEH_project.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController

public class BoardController {
//    BoardService boardService;
//@Autowired
//    public BoardController(BoardService boardService) {
//        this.boardService = boardService;
//    }
//        @PostMapping ("/board")
//    public ResponseEntity<Board> updateBoardView(@RequestBody Board board){
//
//        return new ResponseEntity<>(boardService.updateBoardView(board),
//                HttpStatus.OK);
//    }
}
