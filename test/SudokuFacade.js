"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ISudokuFacade_1 = require("./ISudokuFacade");
class SudokuFacade {
    solveBoard(board) {
        return new Promise((resolve, reject) => {
            let solution = this.solve(board.content);
            if (solution) {
                let result = { content: solution };
                resolve(result);
            }
            else {
                reject(new ISudokuFacade_1.NotSolvedError("The solution was not found for a given board"));
            }
        });
        return null;
    }
    solve(board) {
        if (this.isSolved(board)) {
            return board;
        }
        else {
            let newBoards = this.nextBoards(board);
            for (let i = 0; i < newBoards.length; i++) {
                let tryFirst = this.solve(newBoards[i]);
                if (tryFirst !== false) {
                    return tryFirst;
                }
            }
            return false;
        }
    }
    isSolved(board) {
        return false;
    }
    nextBoards(board) {
        throw new Error("Method not implemented.");
    }
}
exports.SudokuFacade = SudokuFacade;
//# sourceMappingURL=SudokuFacade.js.map