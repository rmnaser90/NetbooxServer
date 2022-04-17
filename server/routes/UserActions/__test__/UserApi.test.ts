import axios, { AxiosResponse } from "axios";
import User from "../../../Database/Models/User";
import Errors from "../../../Errors/Errors";
const concatUrl: (path: string) => string = function (path) {
  const PORT = process.env.PORT || 3003;
  const BASE_URL = `http://localhost:${PORT}/`;
  return BASE_URL + path;
};
describe("testing user actions API", () => {
  afterAll(async () => {
    await User.destroy({
      where: {
        email: "test@jest.com",
      },
    });
  });

  const MockUser = {
    fullName: "test",
    email: "test@jest.com",
    password: "qweqwe",
    agreed: true,
  };
  it("should have status OK(200) and return user when sign up", async () => {
    const url = concatUrl("user/signUp");
    const response: AxiosResponse = await axios.post(url, MockUser);

    expect(response.status).toBe(200);
    expect(response?.data?.user).toHaveProperty("id");
    expect(response?.data?.user?.email).toBe(MockUser.email);
  });

  it("should return user when signing in", async () => {
    const response: AxiosResponse = await axios.put(
      concatUrl("user/signIn"),
      MockUser
    );
    expect(response.status).toBe(200);
    expect(response?.data?.user).toHaveProperty("id");
    expect(response?.data?.user?.email).toBe(MockUser.email);
  });
  it("should throw error wrong password and msg: "+Errors.WRONG_PASSWORD.msg, async () => {
    try {
      const response: AxiosResponse = await axios.put(
        concatUrl("user/signIn"),
        {...MockUser,password:"asdasd"}
      );
      expect(response.status).toBe(401);
      expect(response?.data?.err?.msg).toBe(Errors.WRONG_PASSWORD.msg);

    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("should throw an Error when email already exists in database status 401 and msg: "+Errors.BAD_REQUEST.msg, async () => {
    const url = concatUrl("user/signUp");
    try {
      const response: AxiosResponse = await axios.post(url, MockUser);
      expect(response?.data?.err).toBe(true);
      expect(response?.data?.err?.msg).toBe(Errors.BAD_REQUEST.msg);
      expect(response.status).toBe(401);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
