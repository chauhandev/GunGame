import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  targets: [],
  score: 0,
  gameOver: false,
  targetCount: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addTarget: (state) => {
      if (state.gameOver) return;

      const newTarget = {
        id: nanoid(),
        position: [
            getRandomValueWithExclusion(-10, 10, -2, 2), // x
            getRandomValueWithExclusion(0, 10, 1, 2), // y
            getRandomValueWithExclusion(-10, -3, 0, 0), // z
        ],
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      };

      state.targets.push(newTarget);
      state.targetCount += 1;

      if (state.targetCount >= 10) {
        state.gameOver = true;
      }
    },
    removeTarget: (state, action) => {
      state.targets = state.targets.filter(target => target.id !== action.payload);
      state.score += 1;
      state.targetCount -=1;
    },
    resetGame: (state) => {
      state.targets = [];
      state.score = 0;
      state.gameOver = false;
      state.targetCount = 0;
    },
  },
});

const getRandomValueWithExclusion = (min, max, excludeMin, excludeMax) => {
    let value;
    do {
      value = Math.random() * (max - min) + min;
    } while (value >= excludeMin && value <= excludeMax);
    return value;
  };

export const { addTarget, removeTarget, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
