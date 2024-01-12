const request = require("supertest");
const app = require("../index.js");

// Test suite for the "/api/v1/login" endpoint
describe("POST /api/v1/login", () => {
  // Test suite for scenarios when username and password are provided
  describe("given username and password", () => {
    // Test case: Should respond with a 200 status code
    test("should respond with a 200 status code", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "Amitej",
        password: "1234",
      });
      expect(res.statusCode).toBe(200);
    });

    // Test case: Should specify json in the content type header
    test("should specify json in the content type header", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "Amitej",
        password: "1234",
      });
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // Test suite for response body content
    describe("response body should have", () => {
      // Test case: Should have a success message
      test("success message in it", async () => {
        const res = await request(app).post("/api/v1/login").send({
          username: "Amitej",
          password: "1234",
        });
        expect(res.body.message).toEqual("Login successfull");
      });

      // Test case: Should have a user id
      test("user id in it", async () => {
        const res = await request(app).post("/api/v1/login").send({
          username: "Amitej",
          password: "1234",
        });
        expect(res.body.data.id).toBeDefined();
      });

      // Test case: Should have a json token
      test("json token in it", async () => {
        const res = await request(app).post("/api/v1/login").send({
          username: "Amitej",
          password: "1234",
        });
        expect(res.body.data.token).toBeDefined();
      });
    });
  });

  // Test suite for scenarios when the username or password is missing
  describe("when the username and password is missing", () => {
    // Test case: Should respond with a 400 status code
    test("should respond with a 400 status code", async () => {
      const res = await request(app).post("/api/v1/login").send({
        username: "Amitej",
      });
      expect(res.statusCode).toBe(400);
    });
  });
});
