import assert from "node:assert/strict";
import test from "node:test";
import { failure_categories } from "../src/lib/taxonomy";

test("context_loss covers bounded long-conversation instability", () => {
  const contextLoss = failure_categories.find((category) => category.code === "context_loss");
  assert.equal(
    contextLoss?.description,
    "長い会話などで文脈利用が不安定になり、重要条件の脱落、精度低下、意図しない応答調を生じる。"
  );
  assert.equal(failure_categories.filter((category) => category.code === "context_loss").length, 1);
});
