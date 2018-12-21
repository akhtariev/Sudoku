

export class Validator {

    /*
    REQUIRE: 9 valid boards inside the array
    Keeps only valid boards
    */
    public keepOnlyValid(boards: any[], index: number): any {
        
        let rowNum = Math.floor(index / 9);
        let colNum = index % 9;

        let newBoards = [];

        for (let i = 0; i < boards.length; i++) {
            if(this.isValid(boards[i], rowNum, colNum)) {
                newBoards.push(boards[i]);
            }
        }
        return newBoards;

    }

    private isValid(board: any, rowNum: number, colNum: number): any {

        let currentRow: any[] = this.getRow(board, rowNum);
        let currentColumn: any[] = this.getColumn(board, colNum);
        let currentBlock: any[] = this.getBlock(board, rowNum, colNum);;

        const isRowValid: boolean = this.isCombinationValid(currentRow);
        const isColumnValid: boolean = this.isCombinationValid(currentColumn);
        const isBlockValid: boolean = this.isCombinationValid(currentBlock);
    
        return isRowValid && isColumnValid && isBlockValid;
    }
    
    private isCombinationValid(combination: any): boolean {

        this.removeNotFilled(combination);

        const hasDuplicates = this.hasDuplicates(combination);

        return hasDuplicates;
    }

    private isColumnValid(board: any, rowNum: number, colNum: number): boolean {
        throw new Error("Method not implemented.");
    }

    /*
    Check for duplicates in the array 
    */
    private hasDuplicates(elements: number[]): boolean {
        if(elements.length > 0) {
            elements.sort(function descendingSort(a,b) {
                return a - b;
            });
            let prev = -1;
            for(let i = 0; i < elements.length; i++) {
                if(elements[i] === prev) {
                    return false;
                }
                prev = elements[i];
            }
        }
        return true;
    }
    
    private getRow(board: any, rowNum: number): any[] {
        let row = [];
        for(let i = rowNum * 9; i < rowNum * 9 + 9; i++) {
            row.push(board[i]);
        }
        return row;
    }

    private getBlock(board: any, rowNum: number, colNum: number): any[] {
        let block = [];
        let vBlock = Math.floor(colNum / 3);
        let hBlock = Math.floor(rowNum / 3);
    
        for(let i = 0; i <= 80; i++) {
            if(Math.floor((i % 9) / 3) === vBlock && Math.floor(Math.floor(i / 9) / 3) === hBlock) {
                block.push(board[i]);
            }
        }
        return block;
    }

    private getColumn(board: any, colNum: number): any[] {
        let column = [];
        let colI = colNum;
        for(let i = 0; i < 9; i++) {
            column.push(board[colI]);
            colI += 9;
        }
        return column;
    }

    private removeNotFilled(arr: any[]): void {
        arr.filter(cell => cell !== false);
    }

}