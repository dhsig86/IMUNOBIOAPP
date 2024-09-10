document.addEventListener('DOMContentLoaded', function () {

    // Definimos os seios paranasais e seus IDs de cada lado (esquerdo e direito)
    const seios = [
        { id: 'seio-frontal', esq: 'frontal-esq', dir: 'frontal-dir', name: 'Seio Frontal' },
        { id: 'seio-maxilar', esq: 'maxilar-esq', dir: 'maxilar-dir', name: 'Seio Maxilar' },
        { id: 'seio-etmoidal-ant', esq: 'etmoidal-ant-esq', dir: 'etmoidal-ant-dir', name: 'Células Etmoidais Anteriores' },
        { id: 'seio-etmoidal-post', esq: 'etmoidal-post-esq', dir: 'etmoidal-post-dir', name: 'Células Etmoidais Posteriores' },
        { id: 'seio-esfenoidal', esq: 'esfenoidal-esq', dir: 'esfenoidal-dir', name: 'Seio Esfenoidal' },
        { id: 'seio-ostio-complex', esq: 'ostio-complex-esq', dir: 'ostio-complex-dir', name: 'Complexo Óstio-Meatal' }
    ];

    // Variável para rastrear qual seio está sendo exibido
    let currentSeioIndex = 0;

    // Seleciona elementos de progresso e pontuação total
    const progressBar = document.getElementById('progress-bar');
    const totalScoreElement = document.getElementById('total-score');
    const seioLabel = document.querySelector('h2'); // Atualiza o nome do seio exibido

    // Função para mostrar apenas o seio atual e esconder os outros
    const showSeio = (index) => {
        seios.forEach((seio, i) => {
            const element = document.getElementById(seio.id);
            if (element) {
                // Mostra o seio atual e esconde os outros
                element.classList.toggle('hidden', i !== index);
            }
        });
        seioLabel.textContent = `Selecione os escores de: ${seios[index].name}`;
        updateProgress();
    };

    // Função para atualizar a barra de progresso
    const updateProgress = () => {
        const progress = ((currentSeioIndex + 1) / seios.length) * 100;
        progressBar.value = progress;
    };

    // Função para atualizar o feedback visual com base no valor do slider
    const updateSliderFeedback = (slider, recipienteId) => {
        const value = slider.value;
        const container = document.getElementById(recipienteId);
        if (container) {
            // Limpa classes anteriores e adiciona a nova classe com base no valor
            container.classList.remove('empty', 'half', 'full');
            if (value == 0) {
                container.classList.add('empty');
            } else if (value == 1) {
                container.classList.add('half');
            } else if (value == 2) {
                container.classList.add('full');
            }
            slider.nextElementSibling.value = value;
        }
        calculateTotalScore();  // Chama o cálculo automático da pontuação total
        checkSlidersAndAdvance(); // Verifica se ambos os sliders estão preenchidos para avançar
    };

    // Vincula o evento de mudança (input) aos sliders de cada seio para atualizar o feedback
    seios.forEach(seio => {
        const esqSlider = document.getElementById(seio.esq);
        const dirSlider = document.getElementById(seio.dir);

        if (esqSlider && dirSlider) {
            // Atualiza o feedback visual à medida que o usuário move os sliders
            esqSlider.addEventListener('input', () => updateSliderFeedback(esqSlider, `recipiente-${seio.esq}`));
            dirSlider.addEventListener('input', () => updateSliderFeedback(dirSlider, `recipiente-${seio.dir}`));
        }
    });

    // Função que verifica se ambos os sliders foram preenchidos e avança para o próximo seio
    const checkSlidersAndAdvance = () => {
        const currentSeio = seios[currentSeioIndex];
        const esqSlider = document.getElementById(currentSeio.esq);
        const dirSlider = document.getElementById(currentSeio.dir);

        if (esqSlider.value !== "0" && dirSlider.value !== "0") {
            if (currentSeioIndex < seios.length - 1) {
                currentSeioIndex++;
                showSeio(currentSeioIndex);
            }
        }
    };

    // Atualiza o feedback visual dos sliders conforme o input
    seios.forEach(seio => {
        const esqSlider = document.getElementById(seio.esq);
        const dirSlider = document.getElementById(seio.dir);

        if (esqSlider && dirSlider) {
            esqSlider.addEventListener('input', () => updateSliderFeedback(esqSlider, `recipiente-${seio.esq}`));
            dirSlider.addEventListener('input', () => updateSliderFeedback(dirSlider, `recipiente-${seio.dir}`));
        }
    });

    // Botão "Preencher Ambos" - Preenche os dois sliders com o mesmo valor e avança
    document.getElementById('bilateral-button').addEventListener('click', function () {
        const currentSeio = seios[currentSeioIndex];
        const esqSlider = document.getElementById(currentSeio.esq);
        const dirSlider = document.getElementById(currentSeio.dir);
        if (esqSlider && dirSlider) {
            dirSlider.value = esqSlider.value;
            updateSliderFeedback(dirSlider, `recipiente-${currentSeio.dir}`);
        }

        // Avançar automaticamente após preencher ambos
        if (currentSeioIndex < seios.length - 1) {
            currentSeioIndex++;
            showSeio(currentSeioIndex);
        }
    });

    // Função do botão "Próximo" para avançar para o próximo seio
    document.getElementById('next-button').addEventListener('click', function () {
        if (currentSeioIndex < seios.length - 1) {
            currentSeioIndex++;
            showSeio(currentSeioIndex);
        } else {
            // Esconde o botão "Próximo" ao chegar no último seio
            alert('Você completou a pontuação para todos os seios.');
            document.getElementById('next-button').classList.add('hidden');
        }
    });

    // Função do botão "Voltar" para retornar ao seio anterior
    document.getElementById('prev-button').addEventListener('click', function () {
        if (currentSeioIndex > 0) {
            currentSeioIndex--;
            showSeio(currentSeioIndex);
            document.getElementById('next-button').classList.remove('hidden'); // Mostra novamente o botão "Próximo"
        }
    });

    // Função para calcular a pontuação total automaticamente
    const calculateTotalScore = () => {
        let totalScore = 0;
        seios.forEach(seio => {
            const esqSlider = document.getElementById(seio.esq);
            const dirSlider = document.getElementById(seio.dir);
            if (esqSlider && dirSlider) {
                totalScore += parseInt(esqSlider.value, 10) || 0;
                totalScore += parseInt(dirSlider.value, 10) || 0;
            }
        });
        totalScoreElement.value = `${totalScore}`;
        styleTotalScore(totalScore);  // Chama a função para estilizar o campo da pontuação com cores
    };

    // Função para estilizar a pontuação total com cores dependendo do valor
    const styleTotalScore = (total) => {
        const scoreContainer = document.getElementById('total-score');
        scoreContainer.style.backgroundColor = '';
        scoreContainer.style.color = '';

        // Verde se pontuação <= 4, Amarelo entre 5 e 8, Laranja entre 9 e 16, Vermelho > 16
        if (total <= 4) {
            scoreContainer.style.backgroundColor = '#dcedc8';  // Verde
            scoreContainer.style.color = '#33691e';
        } else if (total <= 8) {
            scoreContainer.style.backgroundColor = '#fff9c4';  // Amarelo
            scoreContainer.style.color = '#f57f17';
        } else if (total <= 16) {
            scoreContainer.style.backgroundColor = '#ffe0b2';  // Laranja
            scoreContainer.style.color = '#ef6c00';
        } else {
            scoreContainer.style.backgroundColor = '#ffccbc';  // Vermelho
            scoreContainer.style.color = '#d32f2f';
        }
    };

    // Função para resetar todos os sliders e a pontuação
    document.getElementById('reset-button').addEventListener('click', function () {
        currentSeioIndex = 0;
        seios.forEach(seio => {
            const esqSlider = document.getElementById(seio.esq);
            const dirSlider = document.getElementById(seio.dir);
            if (esqSlider && dirSlider) {
                esqSlider.value = 0;
                dirSlider.value = 0;
                updateSliderFeedback(esqSlider, `recipiente-${seio.esq}`);
                updateSliderFeedback(dirSlider, `recipiente-${seio.dir}`);
            }
        });
        showSeio(currentSeioIndex);
        document.getElementById('next-button').classList.remove('hidden');  // Mostra o botão "Próximo" após o reset
        calculateTotalScore();  // Recalcula a pontuação após o reset
    });

    // Função para mostrar/ocultar o texto de ajuda
    document.getElementById('help-button').addEventListener('click', function () {
        const helpText = document.getElementById('help-text');
        helpText.classList.toggle('hidden'); // Alterna a classe "hidden"
    });


    // Referências
    const toggleReferencesButton = document.getElementById('toggle-references-button');
    const referencesSection = document.getElementById('references-section');

    // Alternar a exibição das referências
    toggleReferencesButton.addEventListener('click', function () {
        referencesSection.classList.toggle('hidden'); // Mostra ou esconde as referências
        if (referencesSection.classList.contains('hidden')) {
            toggleReferencesButton.textContent = 'Mostrar Referências'; // Atualiza o texto do botão
        } else {
            toggleReferencesButton.textContent = 'Esconder Referências'; // Atualiza o texto do botão
        }
    });

    // Inicializar com o primeiro seio visível
    showSeio(currentSeioIndex);
    calculateTotalScore(); // Calcula o total na inicialização
});