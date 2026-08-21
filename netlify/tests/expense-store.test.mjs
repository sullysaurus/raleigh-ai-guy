import assert from "node:assert/strict";
import test from "node:test";

import { cleanExpense, defaultExpenses } from "../lib/expense-store.mjs";

test("expense defaults include requested and detected services without invented prices", () => {
  const expenses = defaultExpenses();
  for (const vendor of ["Supabase", "Vercel", "Smartlead", "Apollo"]) {
    const expense = expenses.find((item) => item.vendor === vendor);
    assert.ok(expense, `${vendor} should be seeded`);
    assert.equal(expense.amountCents, 0);
  }
});

test("expense normalization constrains money, status, dates, and URLs", () => {
  const expense = cleanExpense({
    vendor: "  Example  ", amountCents: 1299.4, billingInterval: "year", billingDay: 40,
    status: "unexpected", accountUrl: "javascript:alert(1)", renewalDate: "2027-01-15-extra",
  });
  assert.equal(expense.vendor, "Example");
  assert.equal(expense.amountCents, 1299);
  assert.equal(expense.billingInterval, "year");
  assert.equal(expense.billingDay, null);
  assert.equal(expense.status, "active");
  assert.equal(expense.accountUrl, "");
  assert.equal(expense.renewalDate, "2027-01-15");
});
