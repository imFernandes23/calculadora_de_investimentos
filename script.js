
// let capitalInicial = 1000;

// let aporte = 500;

// let taxaDeJuros = 0.01;
// let anualJuros = false;

// let tempo = 12 * 50;
// let anualTempo = false

// let intervaloDeAcrecimo = 12;
// let anualIntervalo = false;

// let acrecimo = 0.1;



function calcular(
    capitalInicial,
    aporte,
    taxaDeJuros,
    tempo,
    intervaloDeAcrecimo,
    acrecimo,
    {
        anualJuros = false,
        anualTempo = false,
        anualIntervalo = false
    } = {}

) {
    let valorInvestido = [];
    let valorDeJuros = [];
    let valorDeJurosMes = [];

    let taxa = anualJuros ? ( taxaDeJuros / 12) : taxaDeJuros;
    let temp = anualTempo ? ( tempo * 12 ) : tempo;
    let interv = anualIntervalo ? ( intervaloDeAcrecimo * 12 ) : intervaloDeAcrecimo;

    let aporteM = aporte;
    let passoAtual = 0

    console.log(temp, tempo, anualTempo)

    valorInvestido.push(capitalInicial);
    valorDeJuros.push(0);
    valorDeJurosMes.push(0);

    for(let passo = 1; passo <= temp; passo++){
        valorInvestido.push(
            valorInvestido[passo-1] + aporteM
        );
        valorDeJuros.push(
            (valorInvestido[passo-1] + valorDeJuros[passo-1])*taxa + valorDeJuros[passo-1]
        );
        valorDeJurosMes.push(
            (valorInvestido[passo-1] + valorDeJuros[passo-1]) * taxa
        );

        passoAtual++;
        if(passoAtual == interv){
            aporteM = aporteM + (aporteM * acrecimo)
            passoAtual = 0
        }
    }

    return {
        valorInvestido,
        valorDeJuros,
        valorDeJurosMes
    }
}

// let data = calcular(
//     capitalInicial,
//     aporte,
//     taxaDeJuros,
//     tempo,
//     intervaloDeAcrecimo,
//     acrecimo,
//     {
//         anualJuros: anualJuros,
//         anualTempo: anualTempo,
//         anualIntervalo: anualIntervalo
//     }
// )








