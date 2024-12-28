# Stack Effect: The Game

**Stack Effect: The Game** is a lighthearted game designed to enhance your understanding of Forth words and stack operations.

## About the Game

You'll encounter Forth-inspired stack operations and literals. Your goal is to guess the final state of the stack after a series of operations are applied. The game is simple to play and challenges your memory and intuition about stack-based programming.

### Key Features:

- Random Forth-like operations (e.g., `swap`, `dup`, `drop`, etc.) manipulate the stack.
- 6 operations per round
- Visual representation of the top of the stack to track progress.

## How to Play

1. **Start the Game:** Click the `Start Game` button to begin. A random stack operation or literal is applied every 2 seconds.
2. **Track the Stack:** Watch the top of the stack and think about how each operation affects it.
3. **Submit Your Guess:** After 6 turns, the game will stop, and you'll be prompted to guess the final state of the stack from top to bottom using emojis.
   - Example: If you think the final stack has `🍎` on top, followed by `🧸`, type `🍎🧸` into the guess box.
4. **Check Your Answer:** Submit your guess and find out if you're right!

## Stack Words and Operations

This game simulates a subset of Forth operations, including:

- **Emoji Keypad:** Quickly add literals to your guess by clicking the corresponding emoji.
- **Delete Button:** Remove the last emoji from your guess.
- **Turn Counter:** See how many turns have passed and how many remain.
- **Reset Button:** Restart the game at any time.
- **Literals:** `💎`, `🌟`, `🍎`, etc. Push these onto the stack.
- **Stack Manipulation:**
  - `rot`: Rotate the top three items.
  - `-rot`: Reverse rotate the top three items.
  - `nip`: Remove the second item.
  - `tuck`: Copy the top item below the second item.
  - `drop`: Remove the top item.
  - `2drop`: Remove the top two items.
  - `dup`: Duplicate the top item.
  - `2dup`: Duplicate the top two items as a pair.
  - `over`: Copy the second item onto the top.
  - `2over`: Copy the second pair onto the top.
  - `2swap`: Swap the top two pairs.
  - `swap`: Exchange the top two items.

**Did I miss one?** Please raise an issue and I will add more words to the dictionary.

Each operation respects stack effect rules, ensuring consistency and predictability for those well-versed in Forth.

## Behind the Scenes

The stack is implemented as a simple JavaScript array, and each operation modifies it in place, simulating Forth's stack behavior. Legal moves are determined dynamically based on stack depth and operation constraints.

## Try It

I [host a demo](https://rickcarlino.com/game.html) on my website.

Enjoy the game, and may your stack always be in perfect order!
