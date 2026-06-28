# Ongoing Project: The Road of Oaths

A daily-built choose-your-own-adventure game prototype focused on mythic high fantasy, branching consequences, companion dynamics, relic temptation, and replayable story systems.

> Public-repo note: this project is designed as an original fantasy adventure framework. It can be inspired by ancient epic fantasy themes—journeys, ruins, rings, oaths, shadow, fellowship, lost kingdoms—without copying protected text, characters, places, or assets from existing franchises.

## Current playable slice

The first prototype is a static browser game with:

- A branching narrative engine
- Player stats: resolve, shadow, lore, supplies, fellowship
- Choice-based consequences
- Companion-style party state
- Relic temptation mechanics
- A quest journal
- A preview dashboard for the daily build loop

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Build/test

```bash
npm run build
npm run test
```

## Daily build philosophy

Each commit should add a concrete playable improvement, not just notes. Good daily targets:

- New scene node
- New consequence mechanic
- Better map/travel system
- Companion memory
- Inventory/relic logic
- Quest journal upgrade
- Procedural scene seed
- UI polish
- Tests
- Preview dashboard improvement

## Next frontier

The next build should add a travel map and route-risk system so choices feel spatial, not just textual.
