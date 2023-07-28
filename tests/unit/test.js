//Import test dependencies
var server = require('../../server');
var request = require('supertest');
//Define baseUrl
var baseURL = "http://localhost:8080";

//Mock JWT response


describe("Test GET API Endpoints", () =>{
    it("should return 200 on index", async () => {
        var response = await request(baseURL).get("/");
        expect(response.statusCode).toBe(200);
    })
    it("shouldn't return 200 on /movies", async() => {
        var response = await request(baseURL).get("/movies");
        expect(response.statusCode).not.toBe(200);
    })
    it("shouldn't return 200 on /reviewers", async() => {
        var response = await request(baseURL).get("/reviewers");
        expect(response.statusCode).not.toBe(200);
    })
    it("shouldn't return 200 on /publications", async() => {
        var response = await request(baseURL).get("/publications");
        expect(response.statusCode).not.toBe(200);
    })
    it("shouldn't return 200 on /pending", async() => {
        var response = await request(baseURL).get("/pending");
        expect(response.statusCode).not.toBe(200);
    })
    afterAll(async() => {
        try{
            server.close();
            server.db.close();
        }catch(error) {
            console.error("There was an issue gracefully closing the server\n"+error)
        }
    })
})