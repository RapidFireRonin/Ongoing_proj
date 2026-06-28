export function createInitialState(story) {
  return {
    sceneId: story.startSceneId,
    stats: { ...story.initialStats },
    flags: { ...story.initialFlags },
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
  return (scene.choices || []).filter(choice => {
    if (!choice.requires) return true;
    return Object.entries(choice.requires).every(([key, expected]) => state.flags[key] === expected);
  });
}

export function choose(story, state, choice) {
  if (choice.reset) {
    return createInitialState(story);
  }

  const next = {
    ...state,
    stats: { ...state.stats },
    flags: { ...state.flags },
    journal: [...state.journal],
    history: [...state.history, { sceneId: state.sceneId, choice: choice.label }]
  };

  for (const [key, delta] of Object.entries(choice.effects || {})) {
    next.stats[key] = clamp((next.stats[key] ?? 0) + delta, 0, 10);
  }

  for (const [key, value] of Object.entries(choice.setFlags || {})) {
    next.flags[key] = value;
  }

  if (choice.journal) {
    next.journal.push(choice.journal);
  }

  next.sceneId = choice.next;
  getScene(story, next.sceneId);
  return next;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
