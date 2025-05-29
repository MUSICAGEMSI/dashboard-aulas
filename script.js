const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJqlG7xJhthlPfWhSWBGf6qtYP2uhfVTtPk6uJz2i3oCWbUTdU0rbLy7uWGSb8lQ/pubhtml";

fetch(url)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const rows = Array.from(doc.querySelectorAll("table tbody tr"));

    const content = document.getElementById("content");
    let currentGroup = "";

    rows.forEach(row => {
      const cols = Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim());

      if (cols.length < 10) return; // Ignorar linhas incompletas

      const localidade = cols[0];

      if (localidade !== currentGroup) {
        currentGroup = localidade;

        // Adiciona título
        const titulo = document.createElement("div");
        titulo.className = "titulo";
        titulo.textContent = currentGroup;
        content.appendChild(titulo);

        // Adiciona cabeçalho
        const cabecalho = document.createElement("div");
        cabecalho.className = "subtitulo";
        [
          "Localidade", "Curso", "Nomenclatura", "Matriculados",
          "Início", "Término", "Dia", "Hora",
          "Lançamentos AUSENTES", "Lançamentos SEM REGISTROS"
        ].forEach(txt => {
          const col = document.createElement("div");
          col.textContent = txt;
          cabecalho.appendChild(col);
        });
        content.appendChild(cabecalho);
      }

      // Adiciona linha de dados
      const linha = document.createElement("div");
      linha.className = "linha";

      cols.slice(0, 10).forEach(txt => {
        const col = document.createElement("div");
        col.textContent = txt;
        linha.appendChild(col);
      });

      content.appendChild(linha);
    });
  })
  .catch(err => {
    document.getElementById("content").textContent = "Erro ao carregar dados.";
    console.error("Erro ao buscar a planilha:", err);
  });
