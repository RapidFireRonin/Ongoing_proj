import { story } from './content.js';
import { choose, createInitialState, getScene, visibleChoices } from './engine.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const state = createInitialState(story);
assert(state.sceneId === 'crossroads', 'initial scene should be crossroads');

const scene = getScene(story, state.sceneId);
const choices = visibleChoices(scene, state);
assert(choices.length === 3, 'crossroads should expose three choices');

const next = choose(story, state, choices[0]);
assert(next.sceneId === 'hill_road', 'first choice should move to hill road');
assert(next.stats.supplies === 5, 'supplies should decrement');
assert(next.stats.resolve === 7, 'resolve should increment');

const resetScene = getScene(story, 'ending_seed');
const resetState = choose(story, { ...next, sceneId: 'ending_seed' }, resetScene.choices[0]);
assert(resetState.sceneId === 'crossroads', 'reset choice should restart');

console.log('engine tests passed');
