/* Todo app javascript */
let state = [];

const template = (toDos) => toDos.map((toDo) => (
  `<div id=${toDo.id} class="${toDo.done === true ? 'toDos__toDo toDos__toDo--done' : 'toDos__toDo'}"><div><h3>${toDo.title}</h3><span>${toDo.description}</span></div><button class = "${toDo.done === true ? 'toDos__remove toDos__toDo--show' : 'toDos__remove'}"> Remove </button></div>`
)).join('');

function classSettler(i) {
  const toDo = document.querySelectorAll('.toDos__toDo')[i];
  toDo.firstChild.addEventListener('click', (e) => {
    e.currentTarget.parentNode.classList.toggle('toDos__toDo--done');
    e.currentTarget.nextSibling.classList.toggle('toDos__toDo--show');
    if (e.currentTarget.parentNode.className === 'toDos__toDo toDos__toDo--done') {
      state[i].done = true;
    } else {
      state[i].done = false;
    }
    window.localStorage.setItem('toDos', JSON.stringify(state));
  });
}

function eventRemover(toDos, button, i) {
  button.addEventListener('click', (e) => {
    toDos.splice(i, 1);
    window.localStorage.setItem('toDos', JSON.stringify(toDos));
    e.currentTarget.parentNode.remove();
  });
}

function render(htmlString, el) {
  const element = el;
  element.innerHTML = htmlString;
  const removeButtons = document.querySelectorAll('.toDos__remove');
  state.forEach((toDo, i) => {
    classSettler(i);
    eventRemover(state, removeButtons[i], i);
  });
}

function update(newState) {
  state = [...state, newState];
  window.dispatchEvent(new Event('statechange'));
}

window.addEventListener('statechange', () => {
  render(template(state), document.querySelector('.toDos'));
});

function saveToDo(e) {
  const title = document.querySelector('.form__title').value;
  const description = document.querySelector('.form__description').value;
  const newToDo = {
    title,
    description,
    id: Math.random().toString(),
    done: false,
  };
  update(newToDo);
  window.localStorage.setItem('toDos', JSON.stringify(state));
  e.preventDefault();
}

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  saveToDo(e);
  form.reset();
});

if (window.localStorage.getItem('toDos') && JSON.parse(window.localStorage.getItem('toDos')).length > 0) {
  state = JSON.parse(window.localStorage.getItem('toDos'));
  render(template(state), document.querySelector('.toDos'));
}
