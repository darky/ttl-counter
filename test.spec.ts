import { TTLCounter } from "./index";

describe("Test TTL counter", () => {
  it("Success call cb", done => {
    const ttlCounter = new TTLCounter({
      cb: counterId => {
        expect(counterId).toEqual("test");
        done();
      },
      countForCb: 1,
      ttl: 5000
    });
    ttlCounter.count("test");
  });

  it("TTL success", done => {
    const ttlCounter = new TTLCounter({
      cb: () => {
        done("Should not call cb");
      },
      countForCb: 3,
      ttl: 100
    });
    ttlCounter.count("test");
    ttlCounter.count("test");
    setTimeout(async () => {
      ttlCounter.count("test");
      done();
    }, 200);
  });
});
