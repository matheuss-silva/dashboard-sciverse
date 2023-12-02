
document.getElementById("orientadoresCard").addEventListener("click", function() {
    window.location.href = "{% url 'lista_orientadores' %}";
});




  document.addEventListener('DOMContentLoaded', function() {
let chart;
let mapeamentoNomesCursos = {}; // Objeto para mapear nomes abreviados para completos
function abreviarNomeCurso(nomeCurso, index) {
    const maxComprimento = 15;
    let nomeAbreviado = nomeCurso.length > maxComprimento ? nomeCurso.substring(0, maxComprimento - 3) + '...' : nomeCurso;
    
    let nomeChave = `${nomeAbreviado}_${index}`;
    mapeamentoNomesCursos[nomeChave] = nomeCurso;
    return nomeAbreviado;
}
function gerarCorAleatoria() {
    return `hsl(${Math.random() * 360}, 70%, 50%)`;
}
fetch('/api/producao-cientifica/por-curso/')
.then(response => response.json())
.then(dados => {
const dropdown = document.getElementById('dropdown');
const cursos = Object.keys(dados);
cursos.forEach((curso, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = curso;
        checkbox.checked = true;
        checkbox.onchange = () => atualizarGrafico();
        const label = document.createElement('label');
        label.htmlFor = curso;
        label.textContent = curso; 
        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);
        dropdown.appendChild(div);
    });
    const ctx = document.getElementById('myChart2').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {},
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        },
                        title: function(tooltipItems) {
                            let chaveNomeCurso = tooltipItems[0].label + '_' + tooltipItems[0].dataIndex;
                            return mapeamentoNomesCursos[chaveNomeCurso];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    function atualizarGrafico() {
        const selecionados = cursos.filter(curso => document.getElementById(curso).checked);
        const dadosFiltrados = selecionados.map(curso => dados[curso]);
        const labelsAbreviados = selecionados.map((curso, index) => abreviarNomeCurso(curso, index));
        chart.data = {
            labels: labelsAbreviados,
            datasets: [{
                label: 'Número de Produções',
                data: dadosFiltrados,
                backgroundColor: selecionados.map(() => gerarCorAleatoria()),
                borderColor: selecionados.map(() => gerarCorAleatoria()),
                borderWidth: 1
            }]
        };
        chart.update();
    }

        atualizarGrafico();
    });

    document.getElementById('toggleDropdown').onclick = () => {
        const dropdown = document.getElementById('dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    };
});
        
        


document.addEventListener('DOMContentLoaded', function() {
const toggleButton = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const mainContent = document.querySelector('.main');
const logoImage = document.querySelector('.dashboard-logo');
    toggleButton.addEventListener('click', function() {
        navigation.classList.toggle('collapsed');

        // Alterna o layout principal com base no estado da sidebar
        if (navigation.classList.contains('collapsed')) {
            logoImage.src = '{% static "Logo_Auth_to_sideBar.png" %}'; // Caminho para a logo menor
            mainContent.classList.add('collapsed');
        } else {
            logoImage.src = '{% static "Logo_Auth.png" %}'; // Caminho para a logo padrão
            mainContent.classList.remove('collapsed');
        }
    });
});








document.addEventListener('DOMContentLoaded', function() {
  let chart;

  fetch('/api/producao-cientifica/por-ano/')
  .then(response => response.json())
  .then(dados => {
      const dropdown1 = document.getElementById('dropdown1'); // Dropdown específico para myChart1
      const cursos = Object.keys(dados);

      cursos.forEach((curso, index) => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `myChart1-${curso}`; // ID único para cada checkbox
          checkbox.checked = true;
          checkbox.onchange = () => atualizarGrafico();

          const label = document.createElement('label');
          label.htmlFor = `myChart1-${curso}`;
          label.textContent = curso;

          const div = document.createElement('div');
          div.appendChild(checkbox);
          div.appendChild(label);
          dropdown1.appendChild(div); // Adiciona ao dropdown específico
      });

      const ctx = document.getElementById('myChart1').getContext('2d');
      chart = new Chart(ctx, {
          type: 'line',
          data: { labels: [], datasets: [] },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: { display: false },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              return context.dataset.label + ': ' + context.parsed.y;
                          },
                          title: function(tooltipItems) {
                              return tooltipItems[0].label;
                          }
                      }
                  }
              },
              scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                  x: { type: 'category' }
              }
          }
      });

      function atualizarGrafico() {
          let anos = new Set();
          let cursosSelecionados = cursos.filter(curso => document.getElementById(`myChart1-${curso}`).checked);
          cursosSelecionados.forEach(curso => {
              Object.keys(dados[curso]).forEach(ano => anos.add(ano));
          });
          anos = Array.from(anos).sort();

          const datasets = cursosSelecionados.map(curso => {
              return {
                  label: curso,
                  data: anos.map(ano => dados[curso][ano] || 0),
                  borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                  fill: false
              };
          });

          chart.data.labels = anos;
          chart.data.datasets = datasets;
          chart.update();
      }

      atualizarGrafico();
  });

  document.getElementById('toggleDropdown1').onclick = () => {
      const dropdown = document.getElementById('dropdown1');
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  };
});








document.addEventListener('DOMContentLoaded', function() {
  let chart;

  function gerarCorAleatoria() {
      return `hsl(${Math.random() * 360}, 70%, 60%)`;
  }

  function criarBarraDeProgresso(valor, maximo, cor) {
      const porcentagem = (valor / maximo) * 100;
      return `<div class="barra-progresso-container" title="${valor} orientações">
                  <div class="barra-progresso" style="width: ${porcentagem}%; background-color: ${cor};"></div>
              </div>`;
  }

  function atualizarResumoNumerico(dados) {
      const totalOrientacoes = Object.values(dados).reduce((sum, current) => sum + current, 0);
      const topOrientadores = Object.entries(dados).sort((a, b) => b[1] - a[1]).slice(0, 3);
      const maximoOrientacoes = topOrientadores[0][1];

      const resumoElemento = document.getElementById('resumoNumerico');
      resumoElemento.innerHTML = `<p>Total de Orientações: ${totalOrientacoes}</p>`;

      topOrientadores.forEach(([nome, valor]) => {
          const corBarra = gerarCorAleatoria();
          const barraProgresso = criarBarraDeProgresso(valor, maximoOrientacoes, corBarra);

          resumoElemento.innerHTML += `
              <div class="orientador-resumo">
                  <span>${nome}</span>
                  ${barraProgresso}
              </div>`;
      });
  }

  fetch('/api/producao-cientifica/top-orientadores/')
  .then(response => response.json())
  .then(dados => {
      const dropdown3 = document.getElementById('dropdown3');
      const orientadores = Object.keys(dados).sort();

      orientadores.forEach(orientador => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `myChart3-${orientador}`;
          checkbox.checked = true;
          checkbox.onchange = () => atualizarGrafico();

          const label = document.createElement('label');
          label.htmlFor = `myChart3-${orientador}`;
          label.textContent = orientador;

          const div = document.createElement('div');
          div.appendChild(checkbox);
          div.appendChild(label);
          dropdown3.appendChild(div);
      });

      const ctx = document.getElementById('myChart3').getContext('2d');
      chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: orientadores,
              datasets: [{
                  label: 'Total de Orientações',
                  data: orientadores.map(orientador => dados[orientador]),
                  backgroundColor: orientadores.map(() => gerarCorAleatoria()),
                  borderColor: orientadores.map(() => 'rgba(255, 255, 255, 0.6)'),
                  borderWidth: 2
              }]
          },
          options: {
              plugins: {
                  legend: { display: false },
                  tooltip: {
                      callbacks: {
                          label: function(context) {
                              return context.label + ': ' + context.raw;
                          }
                      }
                  }
              },
              responsive: true,
              maintainAspectRatio: false
          }
      });

      function atualizarGrafico() {
          const orientadoresSelecionados = orientadores.filter(orientador => document.getElementById(`myChart3-${orientador}`).checked);
          const dadosFiltrados = orientadoresSelecionados.map(orientador => dados[orientador]);

          chart.data.labels = orientadoresSelecionados;
          chart.data.datasets[0].data = dadosFiltrados;
          chart.update();
      }

      atualizarResumoNumerico(dados);

      document.getElementById('toggleDropdown3').onclick = () => {
          const dropdown = document.getElementById('dropdown3');
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      };
  });
});







document.addEventListener('DOMContentLoaded', function() {

  function gerarCorAleatoria(opacidade = 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}
  fetch('/api/producao-cientifica/palavras-chave-emergentes/')
  .then(response => response.json())
  .then(dados => {
      const anos = Object.keys(dados).sort((a, b) => a - b);

      const dropdown4 = document.getElementById('dropdown4');
      anos.forEach(ano => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `myChart4-${ano}`;
          checkbox.checked = true;
          checkbox.onchange = () => atualizarGrafico();

          const label = document.createElement('label');
          label.htmlFor = `myChart4-${ano}`;
          label.textContent = ano;

          const div = document.createElement('div');
          div.appendChild(checkbox);
          div.appendChild(label);
          dropdown4.appendChild(div);
      });

      const ctx = document.getElementById('myChart4').getContext('2d');
      let chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: anos,
              datasets: [{
                  label: 'Frequência da Palavra-chave Emergente por Ano',
                  data: anos.map(ano => dados[ano].frequencia),
                  backgroundColor: gerarCorAleatoria(0.5),
                  borderColor: gerarCorAleatoria(),
                  borderWidth: 2,
                  fill: 'origin',
                  tension: 0.4
              }]
          },
          options: {
              scales: {
                  y: { beginAtZero: true },
                  x: { type: 'category' }
              },
              plugins: {
                  tooltip: {
                      callbacks: {
                          label: function(tooltipItem) {
                              const ano = tooltipItem.label;
                              const { termo, frequencia } = dados[ano];
                              return `${termo}: ${frequencia} vezes`;
                          }
                      }
                  },
                  legend: { display: true }
              },
              responsive: true,
              maintainAspectRatio: false
          }
      });

      function atualizarGrafico() {
          const anosSelecionados = anos.filter(ano => document.getElementById(`myChart4-${ano}`).checked);
          chart.data.labels = anosSelecionados;
          chart.data.datasets[0].data = anosSelecionados.map(ano => dados[ano].frequencia);
          chart.update();
          atualizarResumoNumerico(anosSelecionados); 
      }

      function atualizarResumoNumerico(anosSelecionados) {
          const resumoElemento = document.getElementById('resumoNumericoMyChart4');
          resumoElemento.innerHTML = '';
          const maximoFrequencia = Math.max(...anosSelecionados.map(ano => dados[ano].frequencia));
          const topPalavrasChave = anosSelecionados
              .map(ano => ({ ano, ...dados[ano] }))
              .sort((a, b) => b.frequencia - a.frequencia)
              .slice(0, 3);

          resumoElemento.innerHTML = `<p>Total de Palavras-Chave: ${anosSelecionados.length}</p>`;

          topPalavrasChave.forEach(({ ano, termo, frequencia }) => {
            const corBarra = gerarCorAleatoria(); // Chamada da função para gerar uma cor aleatória
            const barraProgresso = `<div class="barra-progresso-container-mychart4" title="${frequencia} ocorrências">
                <div class="barra-progresso-mychart4" style="width: ${frequencia / maximoFrequencia * 100}%; background-color: ${corBarra};"></div>
            </div>`;
    
            resumoElemento.innerHTML += `
                <div class="palavra-chave-resumo-mychart4">
                    <span>${ano}: ${termo}</span>
                    ${barraProgresso}
                </div>`;
        });
      }

      document.getElementById('toggleDropdown4').onclick = () => {
          const dropdown = document.getElementById('dropdown4');
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      };

      atualizarGrafico(); // Inicializa o gráfico com todos os anos selecionados
  })
  .catch(error => {
      console.error('Erro ao buscar dados: ', error);
  });
});

