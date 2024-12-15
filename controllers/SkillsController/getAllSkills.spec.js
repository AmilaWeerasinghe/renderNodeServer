const chai = require('chai');
const sinon = require('sinon');
const Skill = require('../../models/Skill');
const getAllSkills = require('./getAllSkills'); // function to test

chai.use(require('sinon-chai')); // need to mock 
const { expect } = chai;

// unit test to test getAllSkills controller function
// this will isolate the function from the database and test with mock data from sinon
describe('getAllSkills controller', () => {
    let skillsFindStub;
    let req;
    let res;

    beforeEach(() => {
        // initialize the values
        // create a mock for Skill.find (we don't want to actually call the database)
        skillsFindStub = sinon.stub(Skill, 'find'); 
        req = {};
        res = {
            json: sinon.spy(), 
            status: sinon.stub().returnsThis(),
        }
    })

    afterEach( () => {
        // restore the original function after each test
        skillsFindStub.restore();
    })

    it('should get all skills', async () => {
        // mock data from the database
        const mockSkills = [
            { name: 'NodeJs' , votes: 1 },
            { name: 'ReactJs' , votes: 2 },
        ]

        //for this test case return above mock data for skill.find()
        skillsFindStub.resolves(mockSkills);

        // call the function
        await getAllSkills(req, res);

        expect(res.json).to.have.been.calledWith(mockSkills);
        expect(res.status).to.not.have.been.called; // status should not be called because no error in the function
    })


    it('should handle errors', async () => {
        const errorMessage = 'Error fetching skills data';

        // now the stub of skills.find() will throw an error
        // since db call is async, we need to use rejects() instead of throws()
        skillsFindStub.rejects(new Error(errorMessage));

        // call the function
        await getAllSkills(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({ error: errorMessage });
    })
})