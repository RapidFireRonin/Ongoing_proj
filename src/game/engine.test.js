import { story } from './content.js';
import { choose, choiceIsVisible, createInitialState, getScene, visibleChoices } from './engine.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const state = createInitialState(story);
assert(state.sceneId === 'crossroads', 'initial scene should be crossroads');
assert(Array.isArray(state.inventory), 'initial inventory should always be an array');

const scene = getScene(story, state.sceneId);
const choices = visibleChoices(scene, state);
assert(choices.length === 3, 'crossroads should expose three choices');

const next = choose(story, state, choices[0]);
assert(next.sceneId === 'hill_road', 'first choice should move to hill road');
assert(next.stats.supplies === 5, 'supplies should decrement');
assert(next.stats.resolve === 7, 'resolve should increment');

const relicChoice = {
  label: 'Lift the star-iron key from the cairn.',
  next: 'hill_road',
  addInventory: ['star_iron_key'],
  journal: 'You claimed a star-iron key from an oath-cairn.'
};
const withKey = choose(story, next, relicChoice);
assert(withKey.inventory.includes('star_iron_key'), 'addInventory should add new relics');
assert(withKey.journal.at(-1).includes('star-iron key'), 'inventory choices can add journal memories');

const duplicateKey = choose(story, withKey, relicChoice);
assert(duplicateKey.inventory.filter(item => item === 'star_iron_key').length === 1, 'inventory should not duplicate relics');

const lockedChoice = {
  label: 'Unlock the hidden oath-door.',
  next: 'hill_road',
  requires: { inventory: ['star_iron_key'], stats: { lore: 3 }, flags: { oathSpoken: false } },
  removeInventory: ['star_iron_key']
};
assert(choiceIsVisible(lockedChoice, withKey), 'choice should be visible when inventory, stat, and flag requirements match');
assert(!choiceIsVisible({ ...lockedChoice, requires: { inventory: ['missing_key'] } }, withKey), 'missing inventory should hide choice');
assert(!choiceIsVisible({ ...lockedChoice, requires: { stats: { shadow: { max: 0 } } } }, withKey), 'stat max requirements should hide choices when exceeded');

const afterDoor = choose(story, withKey, lockedChoice);
assert(!afterDoor.inventory.includes('star_iron_key'), 'removeInventory should consume relics when a choice spends them');

const resetScene = getScene(story, 'ending_seed');
const resetState = choose(story, { ...next, sceneId: 'ending_seed' }, resetScene.choices[0]);
assert(resetState.sceneId === 'crossroads', 'reset choice should restart');
assert(Array.isArray(resetState.inventory), 'reset should restore inventory array');

console.log('engine tests passed');
