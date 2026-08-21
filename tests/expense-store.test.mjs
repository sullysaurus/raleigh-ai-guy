import assert from "node:assert/strict";
import test from "node:test";

import { readExpenses } from "../netlify/lib/expense-store.mjs";

test("expense reads use strong consistency", async () => {
  let receivedKey;
  let receivedOptions;
  const store = {
    async get(key, options) {
      receivedKey = key;
      receivedOptions = options;
      return { expenses: [] };
    },
  };

  const expenses = await readExpenses(store);

  assert.equal(receivedKey, "expenses-v1");
  assert.deepEqual(receivedOptions, { type: "json", consistency: "strong" });
  assert.deepEqual(expenses, []);
});
