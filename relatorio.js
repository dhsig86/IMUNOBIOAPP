document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-report');
    const generatedReportDiv = document.getElementById('generated-report');
    const printButton = document.getElementById('print-button');
    const testButton = document.getElementById('preenchimento-teste');

    // Elementos do formulário
    const nomePaciente = document.getElementById('nome-paciente');
    const idadePaciente = document.getElementById('idade-paciente');
    const sexoPaciente = document.getElementById('sexo-paciente');
    const cid = document.getElementById('cid');
    const questionarioEligibilidade = document.getElementById('questionario-eligibilidade');
    const comorbidades = document.getElementById('comorbidades');
    const eosinofilia = document.getElementById('eosinofilia');
    const lundMackay = document.getElementById('lund-mackay');
    const snot22 = document.getElementById('snot22');
    const tomografia = document.getElementById('tomografia');
    const prescricao = document.getElementById('prescricao');
    const casoClinico = document.getElementById('caso-clinico');

    // Função para preencher o formulário com diferentes pacientes de teste
    testButton.addEventListener('click', function() {
        const pacientesTeste = [
            {
                nome: "Maria Silva",
                idade: 34,
                sexo: "F",
                cid: "J45.1, J32.4",
                questionarioEligibilidade: "16", // Apenas a pontuação
                eosinofilia: 356,
                lundMackay: 16,
                snot22: 80,
                tomografia: "Velamento das células frontais e etmoidais bilateralmente.",
                comorbidades: "Rinossinusite Crônica com Polipose Nasal Bilateral",
                prescricao: "NUCALA 100mg a cada 28 dias."
            },
            {
                nome: "João Pereira",
                idade: 45,
                sexo: "M",
                cid: "J45.0",
                questionarioEligibilidade: "14",
                eosinofilia: 420,
                lundMackay: 12,
                snot22: 60,
                tomografia: "Opacificação parcial dos seios maxilares, frontais e etmoidais. Obliteração de complexo óstio meatal direito.",
                comorbidades: "Asma Bronquica",
                prescricao: "NUCALA 100mg a cada 28 dias."
            },
            {
                nome: "Ana Souza",
                idade: 52,
                sexo: "F",
                cid: "J32.4",
                questionarioEligibilidade: "18",
                eosinofilia: 500,
                lundMackay: 20,
                snot22: 90,
                tomografia: "Obliteração total dos complexos ostiomeatais, seios maxilares, etmoides, frontais e esfeno.",
                comorbidades: "Asma leve, Rinossinusite",
                prescricao: "NUCALA 100mg a cada 28 dias."
            }
        ];

        // Seleciona um paciente de teste aleatoriamente
        const paciente = pacientesTeste[Math.floor(Math.random() * pacientesTeste.length)];

        nomePaciente.value = paciente.nome;
        idadePaciente.value = paciente.idade;
        sexoPaciente.value = paciente.sexo;
        cid.value = paciente.cid;
        questionarioEligibilidade.value = paciente.questionarioEligibilidade;
        eosinofilia.value = paciente.eosinofilia;
        lundMackay.value = paciente.lundMackay;
        snot22.value = paciente.snot22;
        tomografia.value = paciente.tomografia;
        comorbidades.value = paciente.comorbidades;
        prescricao.value = paciente.prescricao;
    });

    // Função para gerar a descrição automática do caso clínico
    function gerarDescricaoCasoClinico() {
        const nome = nomePaciente.value;
        const idade = idadePaciente.value;
        const sexo = sexoPaciente.value === "F" ? "feminino" : "masculino";
        const diagnostico = cid.value;
        const questionarioTexto = `Paciente elegível para tratamento com base no Questionário de Eligibilidade, pontuação total: ${questionarioEligibilidade.value}`;
        const eosinofiloTexto = eosinofilia.value ? `A contagem de eosinófilos foi de ${eosinofilia.value} células/µL.` : "Sem contagem recente de eosinófilos.";
        const lundMackayTexto = lundMackay.value ? `A pontuação Lund-Mackay foi de ${lundMackay.value}, indicando ${lundMackay.value >= 18 ? 'opacificação severa' : 'opacificação moderada'}.` : "";
        const snot22Texto = snot22.value ? `O índice SNOT-22, que reflete o impacto na qualidade de vida, foi de ${snot22.value}.` : "";
        const tomografiaTexto = tomografia.value ? `A tomografia revelou ${tomografia.value}.` : "Sem tomografia recente.";
        const comorbidadesTexto = comorbidades.value ? `Comorbidades relevantes incluem ${comorbidades.value}.` : "Sem comorbidades reportadas.";

        // Monta o texto do caso clínico com uma linguagem mais fluida e médica
        return `Paciente de ${idade} anos, sexo ${sexo}, com diagnóstico de ${diagnostico}. ${questionarioTexto}. 
                ${eosinofiloTexto} ${tomografiaTexto} ${lundMackayTexto} ${snot22Texto}
                Na história clínica do paciente, foram reportadas ${comorbidadesTexto}.`;
    }

    // Gerar descrição automática quando o relatório é solicitado
    generateButton.addEventListener('click', function() {
        casoClinico.value = gerarDescricaoCasoClinico();

        // Gera o relatório completo
        generatedReportDiv.innerHTML = `
            <h3>Relatório Médico</h3>
            <p><strong>Nome:</strong> ${nomePaciente.value}</p>
            <p><strong>Idade:</strong> ${idadePaciente.value}</p>
            <p><strong>Sexo:</strong> ${sexoPaciente.value}</p>
            <p><strong>CID10:</strong> ${cid.value}</p>
            <h4>Avaliação Clínica</h4>
            <p>${casoClinico.value}</p>
            <h4>Prescrição Médica</h4>
            <p>${prescricao.value}</p>
            <p><strong>Assinatura e CRM do Médico</strong></p>
        `;
    });

    // Função para imprimir o relatório
    printButton.addEventListener('click', function() {
        const printContents = generatedReportDiv.innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    });
});
