import {Validator} from "./Validator";
import {FSShuffle} from "./FSShuffle";
import {SudokuError} from "./../ISudokuFacade";

export class BoardGenerator {

    private validator: Validator;
    private fsShuffle: FSShuffle;

    constructor() {
        this.validator = new Validator();
        this.fsShuffle = new FSShuffle();
    }

    /*
    Produces an array of next boards that may lead to solution
    */
    public generateNextBoards(board: (number | false)[]): any[] {
        const index = this.findBlank(board);
        let filledRandomlyBoards: any[] = this.fillWithOneToNine(index, board);
        let validBoards: any[] = this.validator.keepOnlyValid(filledRandomlyBoards, index);

        return validBoards;
    };

    /*
    REQUIRE: the board is valid
    Searches for the first blank cell in the board and returns its index or -1 if not found
    */
    private findBlank(board: (number | false)[]) {
        if(board.length !== 81) {
            console.log("Error in findE,lank: board is not complete");
            return -2;
        }
        for(let i = 0; i <= board.length; i++) {
            if(board[i] === false || board[i] === 0) {
                return i;
            }
        }
        return -1;
    };

    /*
    REQUIRE: index is the position of the blank field in board
    Produces boards where field at position index in board is filled with numbers [1-9]
    */
    private fillWithOneToNine(index, board) {
        if(index === -1) throw new SudokuError("Error in fillWithOneToNine: blank position is not found");
    
        let notShuffledBoards = [];
        for (let i = 0; i < 9; i++) {
            notShuffledBoards[i] = board.slice();
            notShuffledBoards[i][index] = i + 1; // 1 - 9
        }
    
        let shuffledBoards = this.fsShuffle.shuffle(notShuffledBoards);
    
        return shuffledBoards;
    }


}