const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJqlG7xJhthlPfWhSWBGf6qtYP2uhfVTtPk6uJz2i3oCWbUTdU0rbLy7uWGSb8lQ/pub?output=csv";

document.addEventListener("DOMContentLoaded", () => {
  Papa.parse(csvUrl, {
    download: true,
    header: false,
    complete: function(results) {
      const data = results.data.filter(row => row[0] !== ""); // remove linhas vazias

      const grupos = agruparPorLocalidade(data);
      renderizarGrupos(grupos);
    }
  });
});

function agruparPorLocalidade(data) {
  const grupos = {};

  for (const linha of data) {
    const localidade = linha[0].trim();

    if (!grupos[localidade]) {
      grupos[localidade] = [];
    }

    grupos[localidade].push({
      curso: linha[1],
      turma: linha[2],
      matriculados: linha[3],
      inicio: linha[4],
      termino: linha[5],
      dia: linha[6],
      hora: linha[7],
      ausentes: linha[8],
      semRegistro: linha[9]
    });
  }

  return grupos;
}

function renderizarGrupos(grupos) {
  const container = document.getElementById("container");

  for (const localidade in grupos) {
    const titulo = document.createElement("div");
    titulo.className = "localidade-titulo";
    titulo.textContent = localidade;
    container.appendChild(titulo);

    const subtitulo = document.createElement("div");
    subtitulo.className = "subtitulo";
    subtitulo.innerHTML = `
      <div>Curso</div>
      <div>Nomenclatura</div>
      <div>Matriculados</div>
      <div>Início</div>
      <div>Término</div>
      <div>Dia</div>
      <div>Hora</div>
      <div>Lançamentos AUSENTES</div>
      <div>Lançamentos SEM REGISTROS</div>
      <div></div> <!-- Para espaçamento -->
    `;
    container.appendChild(subtitulo);

    grupos[localidade].forEach(dado => {
      const linha = document.createElement("div");
      linha.className = "linha-dados";
      linha.innerHTML = `
        <div>${dado.curso}</div>
        <div>${dado.turma}</div>
        <div>${dado.matriculados}</div>
        <div>${dado.inicio}</div>
        <div>${dado.termino}</div>
        <div>${dado.dia}</div>
        <div>${dado.hora}</div>
        <div>${dado.ausentes}</div>
        <div>${dado.semRegistro}</div>
        <div></div>
      `;
      container.appendChild(linha);
    });
  }
}
