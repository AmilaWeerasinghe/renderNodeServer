const chai = require('chai');
const chaiHttp = require('chai-http'); // http methods testing GET , PUT , POST , DELETE
const app = require('../server');

chai.use(chaiHttp);

// integration test for skills API
describe('Skills API', () => {

    // test case for get all skills
    it('should get all skills', async () => {
        const res = await chai.request(app).get('/api/skills');
        
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.an('array');
        chai.expect(res.body[0]).to.have.property('name');
        chai.expect(res.body[0]).to.have.property('votes');
    })
    
})