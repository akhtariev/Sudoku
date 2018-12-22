import app from "./../App";
import {ISudokuFacade, Board} from "../controller/ISudokuFacade"; 
import {SudokuFacade} from "../controller/SudokuFacade"; 
import * as path from "path";
const port = 4321 || process.env.PORT ;

const sudokuFacade: ISudokuFacade = new SudokuFacade();

app.get('/solution', async (req, res) => {
    let toSolve: Board;
    let result;
    try {
        toSolve = {content: JSON.parse(req.body)};
    } catch (e) {
        toSolve = {content: req.body};
    }

    try {
        result = await sudokuFacade.solveBoard(toSolve);
        console.log(JSON.stringify(result));
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send({error: e});
    }
});





app.get('/',function(req,res) {
  console.log(__dirname);  
  res.sendFile(path.join(__dirname +'/../../view/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
})

module.exports = {app};