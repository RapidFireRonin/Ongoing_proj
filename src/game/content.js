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
    companionTrust: false,
    routeMarked: false,
    oldBloodNamed: false,
    ferryDebt: false,
    shadowPursuit: false
  },
  initialJournal: [
    'Carry the sealed relic east before the shadow-road closes.',
    'Keep the fellowship from breaking under fear, hunger, and temptation.'
  ],
  travelMap: {
    regions: [
      { id: 'old_north_road', name: 'The Old North Road', risk: 'low', note: 'Ancient milestones, open sky, and too many witnesses.' },
      { id: 'wind_cut_heights', name: 'The Wind-Cut Heights', risk: 'medium', note: 'High ground reveals danger, but every fire can see you back.' },
      { id: 'pale_reeds', name: 'The Pale Reeds', risk: 'medium', note: 'Soft water, hungry mud, and oaths whispered through reed stems.' },
      { id: 'broken_watchtower', name: 'The Broken Watchtower', risk: 'high', note: 'A ruin that remembers names before they are earned.' },
      { id: 'eastern_marches', name: 'The Eastern Marches', risk: 'rising', note: 'Roads begin choosing travelers as much as travelers choose roads.' }
    ],
    routes: [
      { from: 'old_north_road', to: 'wind_cut_heights', cost: 'one supply', reward: 'lore and sightlines' },
      { from: 'old_north_road', to: 'pale_reeds', cost: 'two supplies', reward: 'stealth and fellowship' },
      { from: 'old_north_road', to: 'broken_watchtower', cost: 'shadow exposure', reward: 'forbidden names' },
      { from: 'wind_cut_heights', to: 'eastern_marches', cost: 'public oath', reward: 'company morale' },
      { from: 'pale_reeds', to: 'eastern_marches', cost: 'river debt', reward: 'hidden crossing' },
      { from: 'broken_watchtower', to: 'eastern_marches', cost: 'ancestral attention', reward: 'old-map knowledge' }
    ]
  },
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
        { label: 'Speak an oath aloud: the relic will not command the road.', hint: 'Strengthen resolve, awaken consequence.', next: 'oath_fire', effects: { resolve: 2, fellowship: 1, shadow: 1 }, setFlags: { oathSpoken: true }, journal: 'You swore before witnesses that the relic would not command the road.' },
        { label: 'Let the relic guide your next step for one heartbeat.', hint: 'Gain secret knowledge, invite corruption.', next: 'relic_whisper', effects: { lore: 2, shadow: 2, resolve: -1 }, setFlags: { relicTouched: true, routeMarked: true }, journal: 'The relic showed you a road beneath the road: useful, secret, and not free.' }
      ]
    },
    reed_river: {
      id: 'reed_river',
      location: 'The Pale Reeds',
      title: 'The Companion Who Would Turn Back',
      body: 'The river mutters beside you. One companion stops walking and says the quest is already lost. In the reeds behind him, something lowers itself into the water without a splash.',
      choices: [
        { label: 'Give him the last sweetbread and ask him to walk beside you.', hint: 'Spend supplies to gain trust.', next: 'trusted_companion', effects: { supplies: -1, fellowship: 2 }, setFlags: { companionTrust: true }, journal: 'A frightened companion chose to stay because you treated fear like a wound, not a crime.' },
        { label: 'Order the company onward before fear spreads.', hint: 'Maintain pace, damage fellowship.', next: 'cold_command', effects: { resolve: 1, fellowship: -2, shadow: 1 }, setFlags: { shadowPursuit: true }, journal: 'The company obeyed, but the river carried the sound of your command ahead of you.' }
      ]
    },
    watchtower: {
      id: 'watchtower',
      location: 'The Broken Watchtower',
      title: 'Names Scratched Beneath the Dust',
      body: 'Inside the tower, old names spiral across the floor around a blackened firepit. One name is yours, though the stone was carved centuries before your birth.',
      choices: [
        { label: 'Copy the names into your journal.', hint: 'Lore opens future routes.', next: 'names_copied', effects: { lore: 2, shadow: 1 }, setFlags: { oldBloodNamed: true }, journal: 'Your journal now carries dead names, including one that might belong to your bloodline.' },
        { label: 'Destroy the marked stone before the others see.', hint: 'Hide fear, lose knowledge.', next: 'stone_broken', effects: { resolve: 1, lore: -1, fellowship: -1 }, setFlags: { shadowPursuit: true }, journal: 'You broke the named stone, but buried truths became heavier in the company’s silence.' }
      ]
    },
    oath_fire: {
      id: 'oath_fire',
      location: 'The Ridge Camp',
      title: 'The Oath Holds, For Now',
      body: 'Your words move through the company like a cup of hot wine. The torches below turn away from the ridge, but the relic has heard you name its limit. It will remember.',
      choices: [
        { label: 'March by starlight toward the eastern pass.', hint: 'A safer road if fellowship holds.', next: 'eastern_pass', effects: { supplies: -1, fellowship: 1 } },
        { label: 'Send two companions to shadow the torch column.', hint: 'Risk separation for warning.', next: 'torch_scouts', effects: { fellowship: -1, lore: 1 }, setFlags: { shadowPursuit: true } }
      ]
    },
    relic_whisper: {
      id: 'relic_whisper',
      location: 'Inside the Wrapping',
      title: 'The Map Beneath the Map',
      body: 'For one heartbeat, the world is made of roads. You see a hidden pass, a buried gate, and a crownless throne beneath a mountain. When sight returns, your hand is clenched around the relic.',
      choices: [
        { label: 'Mark the hidden pass and conceal what it cost you.', hint: 'Secret route, growing corruption.', next: 'hidden_pass', effects: { shadow: 1, lore: 1 }, setFlags: { routeMarked: true } },
        { label: 'Confess the vision to the fellowship.', hint: 'Trust may slow the relic’s hold.', next: 'confessed_vision', effects: { fellowship: 1, resolve: 1, shadow: -1 }, requires: { companionTrust: true } }
      ]
    },
    trusted_companion: {
      id: 'trusted_companion',
      location: 'The Pale Reeds',
      title: 'A Hand Back From Fear',
      body: 'He takes the bread, then your arm. When the thing in the reeds rises, he is the first to see its eyes and the first to pull you aside.',
      choices: [
        { label: 'Escape toward the old ferry stones.', hint: 'Gain a crossing with a debt attached.', next: 'ferry_stones', effects: { fellowship: 1, supplies: -1 }, setFlags: { ferryDebt: true } },
        { label: 'Stand together and drive the reed-thing back.', hint: 'Costly courage, stronger bond.', next: 'reed_stand', effects: { resolve: 1, fellowship: 1, supplies: -1 } }
      ]
    },
    cold_command: {
      id: 'cold_command',
      location: 'The Pale Reeds',
      title: 'The Company Obeys',
      body: 'They move because you command it, not because they believe. Behind you, the river stops muttering. That silence follows for miles.',
      choices: [
        { label: 'Press on through the ash-colored mile.', hint: 'Fast travel, poor morale.', next: 'ash_mile', effects: { resolve: 1, fellowship: -1, supplies: -1 } },
        { label: 'Halt and name the fear before it poisons the march.', hint: 'Lose time, repair trust.', next: 'fear_named', effects: { fellowship: 2, resolve: -1 } }
      ]
    },
    names_copied: {
      id: 'names_copied',
      location: 'The Broken Watchtower',
      title: 'The Journal Learns a Dead Hand',
      body: 'The final name changes as you write it. Not yours now: the relic’s. Your journal shuts by itself.',
      choices: [
        { label: 'Follow the copied names to the kingless archive.', hint: 'Lore-heavy route with ancestral risk.', next: 'kingless_archive', effects: { lore: 1, shadow: 1 }, requires: { oldBloodNamed: true } },
        { label: 'Leave before the tower remembers more.', hint: 'Safer, but lose the trail.', next: 'eastern_pass', effects: { supplies: -1 } }
      ]
    },
    stone_broken: {
      id: 'stone_broken',
      location: 'The Broken Watchtower',
      title: 'A Lie Made of Rubble',
      body: 'The stone splits. No one sees the name, but everyone hears the sigh beneath the floor. Some truths become heavier when buried.',
      choices: [
        { label: 'Lead the shaken company outside.', hint: 'Return to the road under pursuit.', next: 'eastern_pass', effects: { shadow: 1, supplies: -1 } },
        { label: 'Search the undercellar before the dust settles.', hint: 'Dangerous discovery.', next: 'undercellar', effects: { lore: 1, shadow: 2 } }
      ]
    },
    eastern_pass: {
      id: 'eastern_pass',
      location: 'The Gate of Morns',
      title: 'Where the Road Narrows',
      body: 'The eastern pass is not a gate but a wound between two cliffs. Someone has hung strips of blue cloth from the thorn trees: a pilgrim sign for safe passage, or a trap made to look merciful.',
      choices: [
        { label: 'Trust the pilgrim signs and keep the company together.', hint: 'Fellowship resists fear.', next: 'starlit_cairn', effects: { fellowship: 1, supplies: -1 } },
        { label: 'Cut away from the marked road and climb loose shale.', hint: 'Harder travel, fewer watchers.', next: 'shale_climb', effects: { supplies: -2, shadow: -1, resolve: 1 } }
      ]
    },
    torch_scouts: {
      id: 'torch_scouts',
      location: 'The Wind-Cut Heights',
      title: 'Two Lights Do Not Return',
      body: 'Your scouts vanish below the ridge. After an hour, one torch rises where no torch should be, blinking in a pattern only your company uses.',
      choices: [
        { label: 'Answer the signal and risk the ambush.', hint: 'Heroic sacrifice route.', next: 'signal_ambush', effects: { resolve: 1, fellowship: 1, shadow: 1 } },
        { label: 'Refuse the bait and grieve while marching.', hint: 'Cold survival.', next: 'eastern_pass', effects: { fellowship: -2, shadow: -1 } }
      ]
    },
    hidden_pass: {
      id: 'hidden_pass',
      location: 'The Road Beneath the Road',
      title: 'A Door Only the Relic Knows',
      body: 'At dawn, your marked route reveals a stair cut beneath bramble and root. No map names it. The relic cools, satisfied, as though it has led you exactly where it wished.',
      choices: [
        { label: 'Enter the hidden stair without telling the others everything.', hint: 'Powerful shortcut, trust cost.', next: 'buried_gate', effects: { lore: 2, fellowship: -1, shadow: 1 } },
        { label: 'Break the marked route and return to open sky.', hint: 'Reject temptation.', next: 'eastern_pass', effects: { resolve: 2, shadow: -1 } }
      ]
    },
    confessed_vision: {
      id: 'confessed_vision',
      location: 'The Ridge Camp',
      title: 'The Burden Shared',
      body: 'You tell them what the relic showed you. Nobody speaks for a long breath. Then the companion you fed at the river says, “Then none of us walks behind you. We walk beside you, or we all turn back.”',
      choices: [
        { label: 'Accept the shared watch over the relic.', hint: 'Better fellowship, less secrecy.', next: 'starlit_cairn', effects: { fellowship: 2, shadow: -1, resolve: 1 } }
      ]
    },
    ferry_stones: {
      id: 'ferry_stones',
      location: 'The Old Ferry Stones',
      title: 'A Crossing With No Boatman',
      body: 'Flat stones cross the river in a crooked line. Halfway over, the water lifts into the shape of a hooded ferryman and asks which memory you will pay to reach the far bank.',
      choices: [
        { label: 'Pay with the memory of a harmless song.', hint: 'Lose warmth, gain passage.', next: 'starlit_cairn', effects: { fellowship: -1, lore: 1 }, journal: 'The river took a song from you. The company remembers the tune, but you do not.' },
        { label: 'Refuse the river and ford it by rope.', hint: 'Cost supplies, keep yourself whole.', next: 'rope_ford', effects: { supplies: -2, resolve: 1 } }
      ]
    },
    reed_stand: {
      id: 'reed_stand',
      location: 'The Pale Reeds',
      title: 'The Thing That Feared Fire',
      body: 'When your company turns as one, the reed-thing hesitates. It has hunted stragglers for years. It has forgotten what a fellowship looks like when it decides not to break.',
      choices: [
        { label: 'Burn a safe path through the reeds.', hint: 'Supplies for safety.', next: 'starlit_cairn', effects: { supplies: -1, fellowship: 1, shadow: 1 } }
      ]
    },
    ash_mile: {
      id: 'ash_mile',
      location: 'The Ash-Colored Mile',
      title: 'March Without Songs',
      body: 'The road turns gray beneath your boots. No one sings. No one complains. Obedience carries you quickly, but every mile bought with silence feels like debt accruing interest.',
      choices: [
        { label: 'Spend the last hour before dawn repairing morale.', hint: 'Slow down to keep the party human.', next: 'starlit_cairn', effects: { fellowship: 1, supplies: -1 } },
        { label: 'Use the silence as discipline and push harder.', hint: 'Efficient, shadowed leadership.', next: 'ending_seed', effects: { resolve: 1, fellowship: -1, shadow: 1 } }
      ]
    },
    fear_named: {
      id: 'fear_named',
      location: 'The Pale Reeds',
      title: 'A Council in the Mud',
      body: 'You halt in ankle-deep water and let each companion name the thing they fear most. The answers are not noble. They are honest. The river begins muttering again, softer this time.',
      choices: [
        { label: 'Let honesty become the next oath.', hint: 'Trust unlocks future route.', next: 'starlit_cairn', effects: { fellowship: 1, resolve: 1 }, setFlags: { oathSpoken: true } }
      ]
    },
    kingless_archive: {
      id: 'kingless_archive',
      location: 'The Kingless Archive',
      title: 'Lineages Without Crowns',
      body: 'Beneath the watchtower lies a room of clay tablets. They record royal bloodlines that ended, continued, lied, split, and hid. Your family mark appears beside a warning: never let the oath-bearer wear the circle.',
      choices: [
        { label: 'Copy the warning and tell the company.', hint: 'Lore becomes shared protection.', next: 'starlit_cairn', effects: { lore: 2, fellowship: 1, shadow: -1 } },
        { label: 'Hide the tablet and keep the lineage secret.', hint: 'Private power, public risk.', next: 'buried_gate', effects: { lore: 1, shadow: 2, fellowship: -1 } }
      ]
    },
    undercellar: {
      id: 'undercellar',
      location: 'The Watchtower Undercellar',
      title: 'The Bell With No Tongue',
      body: 'A bronze bell hangs below the tower, green with age and split down one side. It has no tongue, yet it rings once when your shadow crosses it. Far away, something answers.',
      choices: [
        { label: 'Wrap the bell and carry it as a warning relic.', hint: 'New burden, new tool.', next: 'starlit_cairn', effects: { lore: 1, supplies: -1, shadow: 1 }, journal: 'You carry the tongueless bell. It rings only when something ancient has noticed you.' },
        { label: 'Leave it and run before the answer arrives.', hint: 'Avoid burden, gain pursuit.', next: 'eastern_pass', effects: { shadow: 1, resolve: -1 } }
      ]
    },
    shale_climb: {
      id: 'shale_climb',
      location: 'The Knife-Shale Path',
      title: 'The Mountain Takes Its Toll',
      body: 'The climb cuts boots and patience. Yet from the high ledge you see the marked road below filled with riders wearing pilgrim blue over black mail.',
      choices: [
        { label: 'Mark the ambush road on your map.', hint: 'Future travel knowledge.', next: 'starlit_cairn', effects: { lore: 1, resolve: 1 }, journal: 'Pilgrim blue can no longer be trusted on the eastern roads.' }
      ]
    },
    signal_ambush: {
      id: 'signal_ambush',
      location: 'The Lower Ridge',
      title: 'A Rescue Paid in Blood',
      body: 'The signal is a trap, but not only a trap. One scout still lives beneath a thorn net. To free him, someone must stand in torchlight long enough for every hidden bow to find a target.',
      choices: [
        { label: 'Take the torchlight yourself.', hint: 'Heroic sacrifice strengthens the company.', next: 'starlit_cairn', effects: { resolve: 2, fellowship: 2, shadow: 1, supplies: -1 }, journal: 'The company saw you step into danger first. That memory will travel farther than fear.' },
        { label: 'Cut the scout loose and order a running retreat.', hint: 'Save life, lose supplies.', next: 'starlit_cairn', effects: { fellowship: 1, supplies: -2, shadow: 1 } }
      ]
    },
    buried_gate: {
      id: 'buried_gate',
      location: 'The Buried Gate',
      title: 'Stone Doors Beneath the Roots',
      body: 'The underground road ends at doors carved with circles, broken crowns, and hands refusing them. The relic is now cold as winter glass. It has brought you to a choice it cannot make alone.',
      choices: [
        { label: 'Seal the doors until the company is ready.', hint: 'Delay power for unity.', next: 'starlit_cairn', effects: { resolve: 1, fellowship: 1, shadow: -1 } },
        { label: 'Open the doors one handspan and look inside.', hint: 'Forbidden preview of the next act.', next: 'ending_seed', effects: { lore: 2, shadow: 2 } }
      ]
    },
    rope_ford: {
      id: 'rope_ford',
      location: 'The Reed River Crossing',
      title: 'Across by Rope and Bruised Hands',
      body: 'You cross without paying the river, but the current fights like a living thing. On the far bank, your palms are raw and the company laughs with the shock of being alive.',
      choices: [
        { label: 'Make camp beneath the starlit cairn.', hint: 'Reach the expanded endpoint.', next: 'starlit_cairn', effects: { fellowship: 1, resolve: 1 } }
      ]
    },
    starlit_cairn: {
      id: 'starlit_cairn',
      location: 'The Starlit Cairn',
      title: 'A Map Made of Chosen Roads',
      body: 'By midnight, the company reaches a cairn of white stones. Each stone bears a road-mark: hill, reed, tower, gate, river, ash. The path behind you has become part of the map, and the path ahead waits to judge what sort of fellowship survived it.',
      choices: [
        { label: 'Record the day’s road and prepare for the next region.', hint: 'Current expanded endpoint.', next: 'ending_seed', effects: { lore: 1 }, journal: 'The starlit cairn recorded your chosen road. Future regions should remember how you arrived.' }
      ]
    },
    ending_seed: {
      id: 'ending_seed',
      location: 'End of Daily Build 002',
      title: 'The Road Opens Further Tomorrow',
      body: 'This is the current edge of the prototype. The road now has regional identity, route costs, companion consequences, relic temptation, hidden-path branches, and a convergence point for the next daily build.',
      choices: [{ label: 'Restart the journey.', hint: 'Begin again with different consequences.', next: 'crossroads', reset: true }]
    }
  }
};