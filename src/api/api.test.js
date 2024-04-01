import { test } from "vitest";
import axios from "axios";

test("should get data from API", async ({ expect }) => {
  const response = await axios.get("http://localhost:8080/api");
  console.log(response.data);
  expect(response.status).toBe(200);
});

test("should handle error from API", async ({ expect }) => {
  try {
    await axios.get("http://localhost:8080/api");
  } catch (error) {
    expect(error).toBeTruthy();
  }
});
