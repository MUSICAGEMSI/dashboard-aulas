const urlCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJqlG7xJhthlPfWhSWBGf6qtYP2uhfVTtPk6uJz2i3oCWbUTdU0rbLy7uWGSb8lQ/pub?gid=750632160&single=true&output=csv";

fetch(urlCSV)
  .then(response => response.text())
  .then(csvText => {
    const linhas = csvText.trim().split("\n").map(linha => {
      // Dividir cada linha por vírgula respeitando vírgulas dentro de texto (CSV simples)
      // Assumimos que não tem vírgulas internas, senão precisa parser CSV real
      return linha.split(",").map(c => c.trim());
    });

    const content = document.getElementById("content");
    content.innerHTML = "";

    let grupoAtual = "";

    // Cabeçalho fixo para exibir as colunas conforme definição acima
    const cabecalhoTexto = [
      "Localidade", "Curso", "Nomenclatura", "Matriculados",
      "Início", "Término", "Dia", "Hora",
      "Lançamentos AUSENTES", "Lançamentos SEM REGISTROS"
    ];

    for (let i = 1; i < linhas.length; i++) {
      const col = linhas[i];

      // Verificar se linha possui ao menos 10 colunas e se a coluna H (índice 7) NÃO está vazia, para continuar
      if (col.length < 10) continue;
      if (!col[7]) continue;

      const localidade = col[0];

      if (localidade !== grupoAtual) {
        grupoAtual = localidade;

        // Criar título de grupo (localidade)
        const tituloDiv = document.createElement("div");
        tituloDiv.className = "titulo";
        tituloDiv.textContent = grupoAtual;
        content.appendChild(tituloDiv);

        // Criar cabeçalho da tabela para o grupo
        const cabecalhoDiv = document.createElement("div");
        cabecalhoDiv.className = "subtitulo";
        cabecalhoTexto.forEach(textoCol => {
          const colDiv = document.createElement("div");
          colDiv.textContent = textoCol;
          cabecalhoDiv.appendChild(colDiv);
        });
        content.appendChild(cabecalhoDiv);
      }

      // Criar linha com os dados (primeiras 10 colunas conforme definido)
      const linhaDiv = document.createElement("div");
      linhaDiv.className = "linha";

      for (let j = 0; j < 10; j++) {
        const celulaDiv = document.createElement("div");
        celulaDiv.textContent = col[j] || "";
        linhaDiv.appendChild(celulaDiv);
      }

      content.appendChild(linhaDiv);
    }

    // Caso não tenha sido carregado nenhum grupo (planilha vazia ou apenas linhas inválidas)
    if (!content.hasChildNodes()) {
      content.textContent = "Nenhum dado válido encontrado na planilha.";
    }
  })
  .catch(error => {
    const content = document.getElementById("content");
    content.textContent = "Erro ao carregar os dados da planilha.";
    console.error("Erro no fetch da planilha CSV:", error);
  });

