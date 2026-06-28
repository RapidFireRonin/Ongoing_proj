import './styles.css';
import { createInitialState, choose, getScene, visibleChoices } from './game/engine.js';
import { story } from './game/content.js';

let state = createInitialState(story);
const app = document.querySelector('#app');

function statBar(label, value, max = 10) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return `
    <div class="stat">
      <div class="stat-label"><span>${label}</span><strong>${value}</strong></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
    </div>
  `;
}

function render() {
  const scene = getScene(story, state.sceneId);
  const choices = visibleChoices(scene, state);

  app.innerHTML = `
    <section class="shell">
      <aside class="panel dashboard">
        <p class="eyebrow">Daily Build Prototype</p>
        <h1>The Road of Oaths</h1>
        <p class="subtitle">A branching mythic adventure about fellowship, relics, ruin, temptation, and the long road through shadow.</p>

        <div class="stats">
          ${statBar('Resolve', state.stats.resolve)}
          ${statBar('Fellowship', state.stats.fellowship)}
          ${statBar('Lore', state.stats.lore)}
          ${statBar('Supplies', state.stats.supplies)}
          ${statBar('Shadow', state.stats.shadow)}
        </div>

        <div class="journal">
          <h2>Quest Journal</h2>
          <ul>
            ${state.journal.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <button class="ghost" id="restart">Restart Path</button>
      </aside>

      <section class="panel story-card">
        <p class="location">${scene.location}</p>
        <h2>${scene.title}</h2>
        <p class="body">${scene.body}</p>

        <div class="tags">
          ${state.flags.relicTouched ? '<span>Relic awakened</span>' : '<span>Relic dormant</span>'}
          ${state.flags.oathSpoken ? '<span>Oath spoken</span>' : '<span>Oath unspoken</span>'}
          ${state.flags.companionTrust ? '<span>Companion trusts you</span>' : '<span>Trust uncertain</span>'}
        </div>

        <div class="choices">
          ${choices.map((choice, index) => `
            <button class="choice" data-choice="${index}">
              <strong>${choice.label}</strong>
              <span>${choice.hint || ''}</span>
            </button>
          `).join('')}
        </div>
      </section>
    </section>
  `;

  document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.choice);
      state = choose(story, state, choices[index]);
      render();
    });
  });

  document.querySelector('#restart').addEventListener('click', () => {
    state = createInitialState(story);
    render();
  });
}

render();
