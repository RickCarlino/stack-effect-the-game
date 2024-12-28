// --- Forth Dictionary and Helpers ---
const literal = (value) => (stack) => {
  stack.push({ value });
  return stack;
};

export const DICTIONARY = [
  { name: "💎", before: 0, after: 1, execute: literal("💎") },
  { name: "🌟", before: 0, after: 1, execute: literal("🌟") },
  { name: "🍎", before: 0, after: 1, execute: literal("🍎") },
  { name: "🍓", before: 0, after: 1, execute: literal("🍓") },
  { name: "🪙", before: 0, after: 1, execute: literal("🪙") },
  { name: "🧸", before: 0, after: 1, execute: literal("🧸") },
  { name: "🍬", before: 0, after: 1, execute: literal("🍬") },
  { name: "🍩", before: 0, after: 1, execute: literal("🍩") },
  { name: "🎈", before: 0, after: 1, execute: literal("🎈") },

  {
    name: "swap",
    before: 2,
    after: 2,
    execute(stack) {
      const item1 = stack.pop();
      const item2 = stack.pop();
      if (!item1 || !item2) throw new Error("Stack underflow - swap");
      stack.push(item1);
      stack.push(item2);
      return stack;
    },
  },
  {
    name: "dup",
    before: 1,
    after: 2,
    execute(stack) {
      const item = stack[stack.length - 1];
      if (!item) throw new Error("Stack underflow - dup");
      stack.push(item);
      return stack;
    },
  },
  {
    name: "drop",
    before: 1,
    after: 0,
    execute(stack) {
      if (!stack.pop()) throw new Error("Stack underflow - drop");
      return stack;
    },
  },
  {
    name: "over",
    before: 2,
    after: 3,
    execute(stack) {
      const item = stack[stack.length - 2];
      if (!item) throw new Error("Stack underflow - over");
      stack.push(item);
      return stack;
    },
  },
  {
    name: "rot",
    before: 3,
    after: 3,
    execute(stack) {
      const item3 = stack.splice(-3, 1)[0];
      if (!item3) throw new Error("Stack underflow - rot");
      stack.push(item3);
      return stack;
    },
  },
  {
    name: "-rot",
    before: 3,
    after: 3,
    execute(stack) {
      const item1 = stack.pop();
      if (!item1) throw new Error("Stack underflow - -rot");
      stack.splice(stack.length - 1, 0, item1);
      return stack;
    },
  },
  {
    name: "2dup",
    before: 2,
    after: 4,
    execute(stack) {
      const item1 = stack[stack.length - 2];
      const item2 = stack[stack.length - 1];
      if (!item1 || !item2) throw new Error("Stack underflow - 2dup");
      stack.push(item1);
      stack.push(item2);
      return stack;
    },
  },
  {
    name: "2drop",
    before: 2,
    after: 0,
    execute(stack) {
      if (!stack.pop() || !stack.pop())
        throw new Error("Stack underflow - 2drop");
      return stack;
    },
  },
  {
    name: "2swap",
    before: 4,
    after: 4,
    execute(stack) {
      const pair1 = stack.splice(-2, 2);
      const pair2 = stack.splice(-2, 2);
      if (pair1.length < 2 || pair2.length < 2) {
        throw new Error("Stack underflow - 2swap");
      }
      stack.push(...pair1);
      stack.push(...pair2);
      return stack;
    },
  },
  {
    name: "tuck",
    before: 2,
    after: 3,
    execute(stack) {
      const item1 = stack.pop();
      if (!item1) throw new Error("Stack underflow - tuck");
      stack.splice(stack.length - 2, 0, item1);
      return stack;
    },
  },
  {
    name: "nip",
    before: 2,
    after: 1,
    execute(stack) {
      if (!stack.pop() || !stack.pop())
        throw new Error("Stack underflow - nip");
      return stack;
    },
  },
  {
    name: "2over",
    before: 4,
    after: 6,
    execute(stack) {
      const pair1 = stack.slice(-4, -2);
      const pair2 = stack.slice(-2);
      if (pair1.length < 2 || pair2.length < 2) {
        throw new Error("Stack underflow - 2over");
      }
      stack.push(...pair1);
      stack.push(...pair2);
      return stack;
    },
  },
];
