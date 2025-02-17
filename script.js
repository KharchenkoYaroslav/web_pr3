function addSymbol(input) {
    let value = input.value;
    input.parentElement.setAttribute('data-value', value);
}

const numberInputs = document.querySelectorAll('input[type="text"]');

numberInputs.forEach(input => {
    input.addEventListener('input', function () {
        let value = input.value.replace(/[^0-9.]/g, '');

        if (value.startsWith('.')) {
            value = value.substring(1);
        }

        if ((value.match(/\./g) || []).length > 1) {
            value = value.replace(/\.([^\.]*)$/, '');
        }

        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        input.value = value;
        input.parentElement.setAttribute('data-value', value);

        const min = input.min ? parseInt(input.min, 10) : -Infinity;
        const max = input.max ? parseInt(input.max, 10) : Infinity;

        if (parseInt(value, 10) < min) {
            input.value = min;
            input.parentElement.setAttribute('data-value', min);
        }
        else if (parseInt(value, 10) > max) {
            input.value = max;
            input.parentElement.setAttribute('data-value', max);
        }
    });
});

function normalCDF(a, b, mu, sigma) {
    const z1 = (a - mu) / (sigma * Math.sqrt(2));
    const z2 = (b - mu) / (sigma * Math.sqrt(2));
    return 0.5 * (math.erf(z2) - math.erf(z1));
}

function calculate() {
    let energy = parseFloat(document.getElementById('energy-input').value) || 0;
    let old_sigma = parseFloat(document.getElementById('old-sigma-input').value) || 0;
    let new_sigma = parseFloat(document.getElementById('new-sigma-input').value) || 0;
    let cost = parseFloat(document.getElementById('cost-input').value) || 0;
    console.log(energy, new_sigma, old_sigma);

    let old_delta_w1 = normalCDF((energy - energy * 0.05), (energy + energy * 0.05), energy, old_sigma);
    let old_delta_w2 = 1 - old_delta_w1;

    let old_profit = energy * 24 * cost * (old_delta_w1 - old_delta_w2);

    let new_delta_w1 = normalCDF((energy - energy * 0.05), (energy + energy * 0.05), energy, new_sigma);
    let new_delta_w2 = 1 - new_delta_w1;



    let new_profit = energy * 24 * cost * (new_delta_w1 - new_delta_w2);

    let profit_difference = new_profit - old_profit;

    document.getElementById('old-profit').innerText = `${old_profit.toFixed(2)} тис. грн.`;
    document.getElementById('new-profit').innerText = `${new_profit.toFixed(2)} тис. грн.`;
    document.getElementById('profit-difference').innerText = `${profit_difference.toFixed(2)} тис. грн.`;

    document.querySelector(`.result-box`).classList.remove('hidden');
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    modal.classList.add('visible');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('visible');
    modal.classList.add('hidden');
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};
