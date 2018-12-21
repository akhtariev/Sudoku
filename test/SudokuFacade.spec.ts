import { expect } from 'chai';
import {ISudokuFacade, 
    Board, 
    NotSolvedError
} from "./../src/controller/ISudokuFacade";
import { SudokuFacade } from "./../src/controller/SudokuFacade";

describe("SudokuFacade solve with various Boards", () => {

    let sudokuFacade: SudokuFacade;
    const E = false;
    const boards: { [id: string]: Board } = {
        easyGrid :
            {content: [2, 7, 4, E, 9, 1, E, E, 5,
                1, E, E, 5, E, E, E, 9, E,
                6, E, E, E, E, 3, 2, 8, E,
                E, E, 1, 9, E, E, E, E, 8,
                E, E, 5, 1, E, E, 6, E, E,
                7, E, E, E, 8, E, E, E, 3,
                4, E, 2, E, E, E, E, E, 9,
                E, E, E, E, E, E, E, 7, E,
                8, E, E, 3, 4, 9, E, E, E]},
        
        easyGridLast:
                {content:[2, 7, 4, 8, 9, 1, 3, 6, 5,
                    1, 3, 8, 5, 2, 6, 4, 9, 7,
                    6, 5, 9, 4, 7, 3, 2, 8, 1,
                    3, 2, 1, 9, 6, 4, 7, 5, 8,
                    9, 8, 5, 1, 3, 7, 6, 4, 2,
                    7, 4, 6, 2, 8, 5, 9, 1, 3,
                    4, 6, 2, 7, 5, 8, 1, 3, 9,
                    5, 9, 3, 6, 1, 2, 8, 7, 4,
                    8, 1, 7, 3, 4, 9, 5, 2, E]},

        veryHardGrid: 
        {content: [E, E, 5, 3, E, E, E, E, E,   
            8, E, E, E, E, E, E, 2, E,
            E, 7, E, E, 1, E, 5, E, E,
            4, E, E, E, E, 5, 3, E, E,
            E, 1, E, E, 7, E, E, E, 6,
            E, E, 3, 2, E, E, E, 8, E,
            E, 6, E, 5, E, E, E, E, 9,
            E, E, 4, E, E, E, E, 3, E,
            E, E, E, E, E, 9, 7, E, E,]},

        invalidEasy: 
        {content:[2, 7, 4, E, 9, 1, E, E, 5,
            1, E, E, 5, E, E, E, 9, E,
            6, E, E, E, E, 3, 2, 8, E,
            E, E, 1, 9, E, E, E, E, 8,
            E, E, 5, 1, E, E, 6, E, E,
            7, E, E, E, 8, E, E, E, 3,
            4, E, 2, E, E, E, E, E, 9,
            E, E, E, E, 8, E, E, 7, E,
            8, E, E, 3, 4, 9, E, E, E]},
            
        invalidHard: 
        {content: [E, E, 5, 3, E, E, E, E, E,   
            8, E, E, E, E, E, E, 2, E,
            E, 7, E, E, 1, E, 5, E, E,
            4, E, E, E, E, 5, 3, E, E,
            E, 1, E, E, 7, E, 1, E, 6,
            E, E, 3, 2, E, E, E, 8, E,
            E, 6, E, 5, E, E, E, E, 9,
            E, E, 4, E, E, E, E, 3, E,
            E, E, E, E, E, 9, 7, E, E,]},

        emptyBoard:    {content: [E, E, E, E, E, E, E, E, E,   
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,]}    

    };

    before(() => {
        sudokuFacade =  new SudokuFacade();
    });



    it("Should solve a valid easy board", async () => {
        let toSolve: Board = boards.easyGrid;

        let result: any;
        try {
            result = await sudokuFacade.solveBoard(toSolve);
            let length: number = toSolve.content.length;
            expect(result.content.length).to.equal(length * length);
            for(let cell of result)
                expect(cell).to.be.equal(E);
            
        } catch {
            expect.fail("Not expected");
        }

    });

    it("Should solve a valid easy board with one cell left", async () => {
        let toSolve: Board = boards.easyGridLast;

        let result: any;
        try {
            result = await sudokuFacade.solveBoard(toSolve);
            let length: number = toSolve.content.length;
            expect(result.content.length).to.equal(length * length);
            for(let cell of result.content)
                expect(cell).to.not.be.equal(E);
            
        } catch {
            expect.fail("Not expected");
        }

    });

    it("Should solve a very hard board", async () => {
        let toSolve: Board = boards.veryHardGrid;

        let result: any;
        try {
            result = await sudokuFacade.solveBoard(toSolve);
            let length: number = toSolve.content.length;
            expect(result.content.length).to.equal(length * length);
            for(let cell of result.content)
                expect(cell).to.not.equal(E);
            
        } catch {
            expect.fail("Not expected");
        }

    });

    it("Should not solve an invalid easy board", async () => {
        let toSolve: Board = boards.invalidEasy;

        let result: any;
        try {
            result = await sudokuFacade.solveBoard(toSolve);
        } catch(err) {
            result = err;
        } finally {
            expect(result).to.be.instanceOf(NotSolvedError);
        }

    });

    it("Should not solve an invalid hard board", async () => {
        let toSolve: Board = boards.invalidHard;

        let result: any;
        try {
            result = await sudokuFacade.solveBoard(toSolve);
        } catch(err) {
            result = err;
        } finally {
            expect(result).to.be.instanceOf(NotSolvedError);
        }

    });

    it("Should solve an empty board", async () => {
        let toSolve: Board = boards.emptyBoard;

        let result: any;
        try {
            result = await sudokuFacade.solveBoard(toSolve);
            let length: number = toSolve.content.length;
            expect(result.content.length).to.equal(length * length);
            for(let cell of result.content)
                expect(cell).to.not.equal(E);
            
        } catch {
            expect.fail("Not expected");
        }

    });

    it("Should produce different boards from initially empty grids", async () => {
        let toSolve: Board = boards.emptyBoard;

        let resultOne: any;
        let resultTwo: any;
        try {
            resultOne = await sudokuFacade.solveBoard(toSolve);
            resultTwo = await sudokuFacade.solveBoard(toSolve);
            expect(resultOne.content).to.not.deep.equal(resultTwo.content);
            
        } catch {
            expect.fail("Not expected");
        }

    });


    
});