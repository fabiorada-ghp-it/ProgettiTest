const sezioni = {
  generale: {
    titolo: "Generale",
    contenuto: `
      <label>Nome utente<br><input type="text" placeholder="es. Mario Rossi"></label>
      <label>Email<br><input type="email" placeholder="es. mario@example.com"></label>
      <label>Lingua
        <select>
          <option>Italiano</option>
          <option>English</option>
        </select>
      </label>
      <button type="submit">Salva</button>
    `
  },
  privacy: {
    titolo: "Privacy",
    contenuto: `
      <label><input type="checkbox"> Consenti raccolta dati anonimi</label>
      <label><input type="checkbox"> Mostra profilo pubblicamente</label>
      <label><input type="checkbox"> Ricevi email di marketing</label>
      <button type="submit">Salva</button>
    `
  },
  sicurezza: {
    titolo: "Sicurezza",
    contenuto: `
      <label>Password attuale<br><input type="password" placeholder="••••••••"></label>
      <label>Nuova password<br><input type="password" placeholder="••••••••"></label>
      <label>Conferma password<br><input type="password" placeholder="••••••••"></label>
      <label><input type="checkbox"> Abilita autenticazione a due fattori</label>
      <button type="submit">Aggiorna password</button>
    `
  },
  aspetto: {
    titolo: "Aspetto",
    contenuto: `
      <label>Tema
        <select>
          <option selected>Scuro</option>
          <option>Chiaro</option>
        </select>
      </label>
      <label>Dimensione testo
        <select>
          <option>Piccolo</option>
          <option selected>Medio</option>
          <option>Grande</option>
        </select>
      </label>
      <button type="submit">Applica</button>
    `
  }
};

const content = document.querySelector(".content");
const form = document.getElementById("action-form");
const menuItems = document.querySelectorAll(".menu-item[data-action]");

menuItems.forEach(item => {
  item.addEventListener("click", e => {
    const azione = item.dataset.action;
    const sezione = sezioni[azione];
    if (!sezione) return;

    e.preventDefault();

    menuItems.forEach(i => i.classList.remove("attivo"));
    item.classList.add("attivo");

    content.querySelector("h1").textContent = sezione.titolo;
    form.innerHTML = sezione.contenuto;
    form.action = `?sezione=${azione}`;
  });
});
