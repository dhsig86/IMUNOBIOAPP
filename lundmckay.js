document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-button');
    const totalScoreElement = document.getElementById('total-score');

    // Função para calcular a pontuação total e alterar a cor
    calculateButton.addEventListener('click', function() {
        let totalScore = 0;

        // Captura todas as seleções de sliders
        const fields = [
            'frontal-esq', 'frontal-dir',
            'etmoidal-ant-esq', 'etmoidal-ant-dir',
            'etmoidal-post-esq', 'etmoidal-post-dir',
            'maxilar-esq', 'maxilar-dir',
            'esfenoidal-esq', 'esfenoidal-dir',
            'ostio-complex-esq', 'ostio-complex-dir'
        ];

        fields.forEach(function(fieldName) {
            const selectedValue = document.getElementById(fieldName).value;
            totalScore += parseInt(selectedValue, 10);
        });

        // Exibe a pontuação total
        totalScoreElement.value = totalScore;

        // Remove as classes antigas de cor antes de adicionar a nova
        totalScoreElement.classList.remove('result-green', 'result-yellow', 'result-orange', 'result-red');

        // Atualiza a cor do campo com base no total
        if (totalScore <= 4) {
            totalScoreElement.classList.add('result-green'); // Verde (0-4)
        } else if (totalScore <= 8) {
            totalScoreElement.classList.add('result-yellow'); // Amarelo (5-8)
        } else if (totalScore <= 16) {
            totalScoreElement.classList.add('result-orange'); // Laranja (9-16)
        } else {
            totalScoreElement.classList.add('result-red'); // Vermelho (>16)
        }
    });

    // Função para mostrar/ocultar texto de ajuda
    helpButton.addEventListener('click', function() {
        helpText.classList.toggle('active');
    });
});
