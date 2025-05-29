const SHEET_ID = "1AUArORvFvApwxR8ZgcgEfNMyIIIfI9ue";
const SHEET_GID = "750632160"; // opcional
const RANGE = "A1:L100"; // ajuste conforme sua necessidade

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const container = document.getElementById("dados-container");
    container.innerHTML = "";

    rows.slice(1).forEach(row => {
      const local = row.c[0]?.v || "";
      const curso = row.c[1]?.v || "";
      const turma = row.c[2]?.v || "";
      const faltamLancar = row.c[8]?.v || "";
      const semRegistro = row.c[10]?.v || "";

      const div = document.createElement("div");
      div.className = "turma";
      div.innerHTML = `
        <h2>${local} — ${curso}</h2>
        <p><strong>Turma:</strong> ${turma}</p>
        <p class="faltam">AUSENTES: ${faltamLancar || "OK"}</p>
        <p class="faltam">SEM REGISTRO: ${semRegistro || "OK"}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    document.getElementById("dados-container").innerText = "Erro ao carregar os dados.";
    console.error(error);
  });
