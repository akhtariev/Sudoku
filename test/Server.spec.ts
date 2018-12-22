import { expect } from 'chai';
const request = require("supertest");
const {app} = require("../src/server/Server");


describe('GET /solution', () => {

    const E = false;
    const boards: { [id: string]: any } = {
        easyGrid :
            [2, 7, 4, E, 9, 1, E, E, 5,
                       1, E, E, 5, E, E, E, 9, E,
                       6, E, E, E, E, 3, 2, 8, E,
                       E, E, 1, 9, E, E, E, E, 8,
                       E, E, 5, 1, E, E, 6, E, E,
                       7, E, E, E, 8, E, E, E, 3,
                       4, E, 2, E, E, E, E, E, 9,
                       E, E, E, E, E, E, E, 7, E,
                       8, E, E, 3, 4, 9, E, E, E],
                       invalidHard: 
        [E, E, 5, 3, E, E, E, E, E,   
            8, E, E, E, E, E, E, 2, E,
            E, 7, E, E, 1, E, 5, E, E,
            4, E, E, E, E, 5, 3, E, E,
            E, 1, E, E, 7, E, 1, E, 6,
            E, E, 3, 2, E, E, E, 8, E,
            E, 6, E, 5, E, E, E, E, 9,
            E, E, 4, E, E, E, E, 3, E,
            E, E, E, E, E, 9, 7, E, E,],
            emptyBoard:     [E, E, E, E, E, E, E, E, E,   
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,
                E, E, E, E, E, E, E, E, E,]};

    it('should get a solution for an easy board', (done) => {
        request(app)
        .get('/solution')
        .send(boards.easyGrid)
        .expect(200)
        .expect((res) => {
            expect(res.body.content).to.have.lengthOf(81);
            for(let cell of res.body.content) {
                expect(cell).to.not.be.false;
            }
        })
        .end(done);
    });

    it('should get a solution for an empty board', (done) => {
        request(app)
        .get('/solution')
        .send(boards.emptyBoard)
        .expect(200)
        .expect((res) => {
            expect(res.body.content).to.have.lengthOf(81);
            for(let cell of res.body.content) {
                expect(cell).to.not.be.false;
            }
        })
        .end(done);
    });

    it('should not get a solution for an invalid board', (done) => {
        request(app)
        .get('/solution')
        .send(boards.invalidHard)
        .expect(400)
        .expect((res) => {
            expect(res.body).to.haveOwnProperty("error");
        })
        .end(done);
    });
});

