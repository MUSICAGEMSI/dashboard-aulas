const sheetId = "1AUArORvFvApwxR8ZgcgEfNMyIIIfI9ue";
const sheetName = "VerificaSAM"; // ajuste conforme sua aba real
const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const tabela = document.createElement("table");

    // Cabeçalho
    const thead = tabela.createTHead();
    const row = thead.insertRow();
    Object.keys(data[0]).forEach(key => {
      const th = document.createElement("th");
      th.textContent = key;
      row.appendChild(th);
    });

    // Dados
    const tbody = tabela.createTBody();
    data.forEach(item => {
      const row = tbody.insertRow();
      Object.values(item).forEach(val => {
        const cell = row.insertCell();
        cell.textContent = val;
      });
    });

    document.getElementById("tabela-dados").innerHTML = "";
    document.getElementById("tabela-dados").appendChild(tabela);
  })
  .catch(error => {
    document.getElementById("tabela-dados").textContent = "Erro ao carregar dados.";
    console.error("Erro:", error);
  });
