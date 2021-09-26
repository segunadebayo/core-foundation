import { increment } from "../src"

test("should add", () => {
  expect(increment(0.1, 0.2)).toEqual(0.3)
})
