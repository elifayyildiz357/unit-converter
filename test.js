const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

// Read the convert function from index.html so the test checks the real app code.
const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf("function convert(");
const end = html.indexOf("function showError(");
const convert = new Function(html.slice(start, end) + "; return convert;")();

// The answers must match within 0.0001.
function close(actual, expected) {
  assert.ok(
    Math.abs(actual - expected) < 0.0001,
    "Expected about " + expected + " but got " + actual
  );
}

test("1 km is about 0.6214 miles", () => {
  close(convert("km-to-miles", 1), 0.6214);
});

test("10 miles is about 16.0934 km", () => {
  close(convert("miles-to-km", 10), 16.0934);
});

test("10 kg is about 22.0462 lb", () => {
  close(convert("kg-to-lb", 10), 22.0462);
});

test("10 lb is about 4.5359 kg", () => {
  close(convert("lb-to-kg", 10), 4.5359);
});

test("100 C is 212 F", () => {
  close(convert("c-to-f", 100), 212);
});

test("98.6 F is 37 C", () => {
  close(convert("f-to-c", 98.6), 37);
});
