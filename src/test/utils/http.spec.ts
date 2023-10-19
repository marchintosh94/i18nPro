import { HttpOptions } from "../../types";
import { http } from "../../utils";

describe("Test http method", () => {
  const successfulResponse = Promise.resolve<Response>({
    json: () => Promise.resolve({ succes: true }),
    ok: true,
    status: 200,
    headers: {} as Headers
  } as Response);
  
  const responseKo = Promise.resolve<Response>({
    json: () => Promise.resolve({ succes: true }),
    ok: false,
    status: 500,
    headers: {} as Headers
  } as Response);

  const responseError = Promise.reject({
    status: 500,
    message: 'error'
  });

  const httpArguments: HttpOptions = {
    method: "POST",
    url: "/test",
    data: { data: 123 },
    headers: {
      Authorization: "Bearer token"
    }
  };

  it("Check all given properties match", async () => {
    global.fetch = jest.fn(() => successfulResponse);

    await http<{ succes: true }>({...httpArguments, data: undefined});

    expect(fetch).toHaveBeenCalledWith("/test", {
      method: "POST",
      body: undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token"
      }
    } as RequestInit);
  });


  it("Check undefined body", async () => {
    global.fetch = jest.fn(() => successfulResponse);

    const data = await http<{ succes: true }>(httpArguments);

    expect(fetch).toHaveBeenCalledWith("/test", {
      method: "POST",
      body: JSON.stringify({ data: 123 }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token"
      }
    } as RequestInit);

    expect(data).toEqual({ succes: true });
  });

  it("Should return a successful response", async () => {
    global.fetch = jest.fn(() => successfulResponse);

    const data = http<{ succes: true }>(httpArguments);

    expect(data).resolves.toEqual({ succes: true });
  });

  it("Should return a ko response", async () => {
    global.fetch = jest.fn(() => responseKo);

    const data = http<{ succes: true }>(httpArguments);

    expect(data).rejects.toBeTruthy()
  });

  it("Should return an error", async () => {
    global.fetch = jest.fn(() => responseError);

    const data = http<{ succes: true }>(httpArguments);

    expect(data).rejects.toEqual({
      status: 500,
      message: "error"
    });
  });
});
