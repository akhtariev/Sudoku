import {ISudokuFacade, 
    Board, 
    NotSolvedError
} from "./ISudokuFacade";


export class SudokuFacade implements ISudokuFacade {

    public solveBoard(board: Board): Promise<Board> {

        return new Promise<Board>((resolve, reject) => {
            let solution: (number | false)[] | false = this.solve(board.content);
            if (solution) {
                let result: Board = {content: solution};
                resolve(result);
            } else {
                reject(new NotSolvedError("The solution was not found for a given board"));
            }

        });

        return null;
    }


    private solve(board: (number | false)[]): (number | false)[] | false {
        if(this.isSolved(board)) {
            return board;
        } else {
            let newBoards = this.nextBoards(board);
            for(let i = 0; i < newBoards.length; i++) {
                let tryFirst = this.solve(newBoards[i]);
    
                if(tryFirst !== false) {
    
                    return tryFirst;
                }
            }
            return false;
        }
    }

    private isSolved(board: (number | false)[]): boolean {
        return false;
    }

    private nextBoards(board: (number | false)[]): any {
        throw new Error("Method not implemented.");
    }



}

