export function createInitialState(story) {
  return {
    sceneId: story.startSceneId,
    stats: { ...story.initialStats },
    flags: { ...story.initialFlags },
    inventory: [...(story.initialInventory || [])],
    journal: [...story.initialJournal],
    history: []
  };
}

export function getScene(story, sceneId) {
  const scene = story.scenes[sceneId];
  if (!scene) {
    throw new Error(`Unknown scene: ${sceneId}`);
  }
  return scene;
}

export function visibleChoices(scene, state) {
  return (scene.choices || []).filter(choice => choiceIsVisible(choice, state));
}

export function choiceIsVisible(choice, state) {
  if (!choice.requires) return true;

  const { flags = {}, stats = {}, inventory = [] } = choice.requires;

  const flagsMatch = Object.entries(flags).every(([key, expected]) => state.flags[key] === expected);
  const statsMatch = Object.entries(stats).every(([key, requirement]) => statRequirementMet(state.stats[key] ?? 0, requirement));
  const inventoryMatch = inventory.every(item => state.inventory.includes(item));

  return flagsMatch && statsMatch && inventoryMatch;
}

export function choose(story, state, choice) {
  if (choice.reset) {
    return createInitialState(story);
  }

  const next = {
    ...state,
    stats: { ...state.stats },
    flags: { ...state.flags },
    inventory: [...(state.inventory || [])],
    journal: [...state.journal],
    history: [...state.history, { sceneId: state.sceneId, choice: choice.label }]
  };

  for (const [key, delta] of Object.entries(choice.effects || {})) {
    next.stats[key] = clamp((next.stats[key] ?? 0) + delta, 0, 10);
  }

  for (const [key, value] of Object.entries(choice.setFlags || {})) {
    next.flags[key] = value;
  }

  for (const item of choice.addInventory || []) {
    if (!next.inventory.includes(item)) {
      next.inventory.push(item);
    }
  }

  for (const item of choice.removeInventory || []) {
    next.inventory = next.inventory.filter(existing => existing !== item);
  }

  if (choice.journal) {
    next.journal.push(choice.journal);
  }

  next.sceneId = choice.next;
  getScene(story, next.sceneId);
  return next;
}

function statRequirementMet(value, requirement) {
  if (typeof requirement === 'number') {
    return value >= requirement;
  }

  if (typeof requirement === 'object' && requirement !== null) {
    if (typeof requirement.min === 'number' && value < requirement.min) return false;
    if (typeof requirement.max === 'number' && value > requirement.max) return false;
    return true;
  }

  return false;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
