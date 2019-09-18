const apiHandler = new APIHandler('https://ih-crud-api.herokuapp.com/characters');
const charactersContainer = document.querySelector('#characters-list');

document.querySelector('#get-characters').onclick = function () {
  printAllCharacters();
};

document.querySelector('#get-char').onclick = function () {
  const id = document.querySelector('#char-id').value;
  apiHandler.getCharacterById(id).then((res) => {
    const { data } = res;
    charactersContainer.innerHTML = '';
    charactersContainer.innerHTML += `
        <li>
          <h3>${data.name}</h3>
          <p>${data.weapon}</p>
        </li>
      `;
  });
};

document.querySelector('#new-char').onsubmit = function (e) {
  e.preventDefault();
  const name = document.querySelector('#char-name').value;
  const weapon = document.querySelector('#char-weapon').value;
  const occupation = document.querySelector('#char-occupation').value;
  apiHandler.createCharacter({ name, weapon, occupation })
    .then(() => {
      printAllCharacters();
    })
    .catch(error => console.error(error));
};

document.querySelector('#update-char').onsubmit = function (e) {
  e.preventDefault();
  const name = document.querySelector('#char-update-name').value;
  const weapon = document.querySelector('#char-update-weapon').value;
  const occupation = document.querySelector('#char-update-occupation').value;
  const id = document.querySelector('#char-update-id').value;
  apiHandler.updateCharacter(id, { name, weapon, occupation })
    .then(() => {
      printAllCharacters();
    })
    .catch(error => console.error(error));
};

document.querySelector('#delete-char').onclick = function () {
  const id = document.querySelector('#delete-id').value;
  apiHandler.deleteCharacter(id).then(() => {
    printAllCharacters();
  });
};


const printAllCharacters = () => {
  apiHandler.getCharacters().then((res) => {
    const { data } = res;
    charactersContainer.innerHTML = '';
    data.forEach((character) => {
      charactersContainer.innerHTML += `
        <li>
          <h3>${character.name}</h3>
          <p>${character.weapon}</p>
        </li>
      `;
    });
  });
};
