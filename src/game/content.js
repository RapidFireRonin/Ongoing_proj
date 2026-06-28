export const story = {
  startSceneId: 'crossroads',
  initialStats: {
    resolve: 6,
    shadow: 1,
    lore: 3,
    supplies: 6,
    fellowship: 5
  },
  initialFlags: {
    relicTouched: false,
    oathSpoken: false,
    companionTrust: false
  },
  initialJournal: [
    'Carry the sealed relic east before the shadow-road closes.',
    'Keep the fellowship from breaking under fear, hunger, and temptation.'
  ],
  scenes: {
    crossroads: {
      id: 'crossroads',
      location: 'The Old North Road',
      title: 'Three Roads Under a Bruised Moon',
      body: 'The milestones are older than the kingdoms that claim them. Your small company waits where the road forks: one path climbs into pine-black hills, one follows a river of pale reeds, and one sinks toward a ruined watchtower where no birds sing.',
      choices: [
        { label: 'Take the hill road and trust height over speed.', hint: 'Safer view, harder travel.', next: 'hill_road', effects: { supplies: -1, lore: 1, resolve: 1 } },
        { label: 'Follow the reed river and hide your passage.', hint: 'Quiet but hungry country.', next: 'reed_river', effects: { supplies: -2, shadow: -1, fellowship: 1 } },
        { label: 'Enter the ruined watchtower before night fully falls.', hint: 'Risk knowledge and danger.', next: 'watchtower', effects: { shadow: 1, lore: 2 } }
      ]
    },
    hill_road: {
      id: 'hill_road',
      location: 'The Wind-Cut Heights',
      title: 'A Fire Seen Far Below',
      body: 'From the ridge you see a line of torches moving against the valley wind. Your scout says they are too orderly for bandits and too silent for travelers. The relic grows warm beneath its wrappings.',
      choices: [
        { label: 'Speak an oath aloud: the relic will not command the road.', hint: 'Strengthen resolve, awaken consequence.', next: 'oath_fire', effects: { resolve: 2, fellowship: 1, shadow: 1 }, setFlags: { oathSpoken: true } },
        { label: 'Let the relic guide your next step for one heartbeat.', hint: 'Gain secret knowledge, invite corruption.', next: 'relic_whisper', effects: { lore: 2, shadow: 2, resolve: -1 }, setFlags: { relicTouched: true } }
      ]
    },
    reed_river: {
      id: 'reed_river',
      location: 'The Pale Reeds',
      title: 'The Companion Who Would Turn Back',
      body: 'The river mutters beside you. One companion stops walking and says the quest is already lost. In the reeds behind him, something lowers itself into the water without a splash.',
      choices: [
        { label: 'Give him the last sweetbread and ask him to walk beside you.', hint: 'Spend supplies to gain trust.', next: 'trusted_companion', effects: { supplies: -1, fellowship: 2 }, setFlags: { companionTrust: true } },
        { label: 'Order the company onward before fear spreads.', hint: 'Maintain pace, damage fellowship.', next: 'cold_command', effects: { resolve: 1, fellowship: -2, shadow: 1 } }
      ]
    },
    watchtower: {
      id: 'watchtower',
      location: 'The Broken Watchtower',
      title: 'Names Scratched Beneath the Dust',
      body: 'Inside the tower, old names spiral across the floor around a blackened firepit. One name is yours, though the stone was carved centuries before your birth.',
      choices: [
        { label: 'Copy the names into your journal.', hint: 'Lore opens future routes.', next: 'names_copied', effects: { lore: 2, shadow: 1 } },
        { label: 'Destroy the marked stone before the others see.', hint: 'Hide fear, lose knowledge.', next: 'stone_broken', effects: { resolve: 1, lore: -1, fellowship: -1 } }
      ]
    },
    oath_fire: {
      id: 'oath_fire',
      location: 'The Ridge Camp',
      title: 'The Oath Holds, For Now',
      body: 'Your words move through the company like a cup of hot wine. The torches below turn away from the ridge, but the relic has heard you name its limit. It will remember.',
      choices: [{ label: 'Continue toward the eastern pass.', hint: 'Prototype endpoint.', next: 'ending_seed', effects: { supplies: -1 } }]
    },
    relic_whisper: {
      id: 'relic_whisper',
      location: 'Inside the Wrapping',
      title: 'The Map Beneath the Map',
      body: 'For one heartbeat, the world is made of roads. You see a hidden pass, a buried gate, and a crownless throne beneath a mountain. When sight returns, your hand is clenched around the relic.',
      choices: [{ label: 'Mark the hidden pass and conceal what it cost you.', hint: 'Prototype endpoint.', next: 'ending_seed', effects: { shadow: 1 } }]
    },
    trusted_companion: {
      id: 'trusted_companion',
      location: 'The Pale Reeds',
      title: 'A Hand Back From Fear',
      body: 'He takes the bread, then your arm. When the thing in the reeds rises, he is the first to see its eyes and the first to pull you aside.',
      choices: [{ label: 'Escape toward the old ferry stones.', hint: 'Prototype endpoint.', next: 'ending_seed', effects: { fellowship: 1, supplies: -1 } }]
    },
    cold_command: {
      id: 'cold_command',
      location: 'The Pale Reeds',
      title: 'The Company Obeys',
      body: 'They move because you command it, not because they believe. Behind you, the river stops muttering. That silence follows for miles.',
      choices: [{ label: 'Press on until dawn.', hint: 'Prototype endpoint.', next: 'ending_seed', effects: { resolve: 1, fellowship: -1 } }]
    },
    names_copied: {
      id: 'names_copied',
      location: 'The Broken Watchtower',
      title: 'The Journal Learns a Dead Hand',
      body: 'The final name changes as you write it. Not yours now: the relic’s. Your journal shuts by itself.',
      choices: [{ label: 'Leave before the tower remembers more.', hint: 'Prototype endpoint.', next: 'ending_seed', effects: { lore: 1, shadow: 1 } }]
    },
    stone_broken: {
      id: 'stone_broken',
      location: 'The Broken Watchtower',
      title: 'A Lie Made of Rubble',
      body: 'The stone splits. No one sees the name, but everyone hears the sigh beneath the floor. Some truths become heavier when buried.',
      choices: [{ label: 'Lead the shaken company outside.', hint: 'Prototype endpoint.', next: 'ending_seed', effects: { shadow: 1 } }]
    },
    ending_seed: {
      id: 'ending_seed',
      location: 'End of Daily Build 001',
      title: 'The Road Opens Further Tomorrow',
      body: 'This is the current edge of the prototype. The next daily build should make the road spatial: regions, routes, danger clocks, and discoveries that persist across branches.',
      choices: [{ label: 'Restart the journey.', hint: 'Begin again with different consequences.', next: 'crossroads', reset: true }]
    }
  }
};
