import { inc } from "../src"

test("should add", () => {
  expect(inc(0.1, 0.2)).toEqual(0.3)
})
