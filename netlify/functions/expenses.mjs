import { authorized, json } from "../lib/acquisition-store.mjs";
import { cleanExpense, getExpenses, saveExpenses } from "../lib/expense-store.mjs";

const parse = (event) => {
  try { return JSON.parse(event.body || "{}"); }
  catch { return {}; }
};

export const handler = async (event) => {
  if (!authorized(event)) return json(401, { error: "Invalid dashboard key" });

  try {
    if (event.httpMethod === "GET") return json(200, { expenses: await getExpenses(event) });

    const body = parse(event);
    const expenses = await getExpenses(event);

    if (event.httpMethod === "POST") {
      const expense = cleanExpense({ ...body, amountCents: Number(body.amountDollars || 0) * 100 });
      if (!expense.vendor) return json(400, { error: "Vendor name is required" });
      const next = await saveExpenses(event, [...expenses, expense]);
      return json(201, { expense, expenses: next });
    }

    if (event.httpMethod === "PUT") {
      const index = expenses.findIndex((item) => item.id === String(body.id || ""));
      if (index < 0) return json(404, { error: "Expense not found" });
      const expense = cleanExpense({
        ...expenses[index],
        ...body,
        amountCents: body.amountDollars == null ? expenses[index].amountCents : Number(body.amountDollars || 0) * 100,
        updatedAt: new Date().toISOString(),
      });
      if (!expense.vendor) return json(400, { error: "Vendor name is required" });
      expenses[index] = expense;
      const next = await saveExpenses(event, expenses);
      return json(200, { expense, expenses: next });
    }

    if (event.httpMethod === "DELETE") {
      const id = String(body.id || "");
      if (!expenses.some((item) => item.id === id)) return json(404, { error: "Expense not found" });
      const next = await saveExpenses(event, expenses.filter((item) => item.id !== id));
      return json(200, { expenses: next });
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    console.error("Expense ledger error", error instanceof Error ? error.message : error);
    return json(500, { error: error instanceof Error ? error.message : "Expense ledger request failed" });
  }
};

