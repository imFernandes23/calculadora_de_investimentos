
let ctxBarChart = document.getElementById('barChart').getContext('2d');
let ctxPieChart = document.getElementById('pieChart').getContext('2d');



let PieChart = new Chart(ctxPieChart,{
  type: 'doughnut',
  data: [],
  options:{
    plugins: {
      tooltip:{
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;

            return label + ': ' + new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2
            }).format(value);
          }
        }
      },
      legend:{
        position: "top",
      },
      title: {
        display: true,
        text: 'Valor total investido e valor de juros obtidos.',
      }
    }
  }
})

let BarChart = new Chart(ctxBarChart, {
  type: 'bar',
  data: [],
  options: {
    locale:"pt-BR",
    maintainAspectRatio: false,
    plugins:{
      tooltip:{
        callbacks:{
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;

            return datasetLabel + ': ' + new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2
            }).format(value)
          }
        },
      },
      title:{
        display: true,
        text: "Investimento e Juros acumulados em cada mês."
      },
    },
    interaction:{
      mode:"index",
      axis: 'y'
    },
    scales: {
      x:{
        stacked: true,
      },
      y: {
        stacked: true,
        ticks:{
          callback: (value, index, values) => {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumSignificantDigits: 2
            }).format(value)
          }
        }
      }
    }
  }
});


function atualizarDados(data){
  BarChart.data = {
    labels: data.mes,
    datasets: [
      {
        label: "Valor Investido",
        data: data.valorInvestido,
        backgroundColor: 'rgb(0,0,139)',
      },{
        label: "Juros Total",
        data: data.valorDeJuros,
        backgroundColor: 'rgb(173,216,230)',
      }
    ]
  }

  PieChart.data = {
    labels: ['Valor Investido', 'Valor de Juros'],
    datasets: [
      {
        label: 'Valor',
        data: [data.valorInvestido.at(-1), data.valorDeJuros.at(-1)],
        backgroundColor: [
          'rgb(0,0,139)',
          'rgb(173,216,230)',
        ]
  
      }
    ]
  }

  BarChart.update();
  PieChart.update();

  let formatoBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  })

  let valorInvestido = formatoBRL.format(data.valorInvestido.at(-1));
  let valorDeJuros = formatoBRL.format(data.valorDeJuros.at(-1))
  let valorTotal = formatoBRL.format(data.valorInvestido.at(-1) + data.valorDeJuros.at(-1))

  document.getElementById("ti-text").innerHTML = valorInvestido;
  document.getElementById('jt-text').innerHTML = valorDeJuros;
  document.getElementById("vt-text").innerHTML = valorTotal;



}













