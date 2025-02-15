function addSymbol(input) {
    let value = input.value; 
    input.parentElement.setAttribute('data-value', value);
}


function showComponent(componentId) {
    const components = document.querySelectorAll('.component');
    components.forEach(component => component.classList.remove('active'));
    document.getElementById(componentId).classList.add('active');
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

function calculator1_calculate() {
    let hp = parseFloat(document.getElementById('calculator1-hp-input').value) || 0;
    let cp = parseFloat(document.getElementById('calculator1-cp-input').value) || 0;
    let sp = parseFloat(document.getElementById('calculator1-sp-input').value) || 0;
    let np = parseFloat(document.getElementById('calculator1-np-input').value) || 0;
    let op = parseFloat(document.getElementById('calculator1-op-input').value) || 0;
    let wp = parseFloat(document.getElementById('calculator1-wp-input').value) || 0;
    let ap = parseFloat(document.getElementById('calculator1-ap-input').value) || 0;

    let kpc = 100/(100-wp);
    let kpg = 100/(100-wp-ap);
    let hc = hp * kpc;
    let cc = cp * kpc;
    let sc = sp * kpc;
    let nc = np * kpc;
    let oc = op * kpc;
    let ac = ap * kpc;
    let hg = hp * kpg;
    let cg = cp * kpg;
    let sg = sp * kpg;
    let ng = np * kpg;
    let og = op * kpg;
    let qph = (339 * cp + 1030 * hp - 108.8 * (op - sp) - 25 * wp) / 1000;
    let qch = (qph + 0.025 * wp) * 100 / (100 - wp);
    let qgh = (qph + 0.025 * wp) * 100 / (100 - wp - ap);
    
    document.getElementById('calculator1-hp').innerHTML = `H<sup>P</sup> = ${hp} %`;
    document.getElementById('calculator1-cp').innerHTML = `C<sup>P</sup> = ${cp} %`;
    document.getElementById('calculator1-sp').innerHTML = `S<sup>P</sup> = ${sp} %`;
    document.getElementById('calculator1-np').innerHTML = `N<sup>P</sup> = ${np} %`;
    document.getElementById('calculator1-op').innerHTML = `O<sup>P</sup> = ${op} %`;
    document.getElementById('calculator1-wp').innerHTML = `W<sup>P</sup> = ${wp} %`;
    document.getElementById('calculator1-ap').innerHTML = `A<sup>P</sup> = ${ap} %`;

    document.getElementById('calculator1-kpc').innerText = `${kpc.toFixed(2)}`;
    document.getElementById('calculator1-kpg').innerHTML = `${kpg.toFixed(2)}`;
    document.getElementById('calculator1-hc').innerHTML = `H<sup>C</sup> = ${hc.toFixed(2)}%`;
    document.getElementById('calculator1-cc').innerHTML = `C<sup>C</sup> = ${cc.toFixed(2)}%`;
    document.getElementById('calculator1-sc').innerHTML = `S<sup>C</sup> = ${sc.toFixed(2)}%`;
    document.getElementById('calculator1-nc').innerHTML = `N<sup>C</sup> = ${nc.toFixed(2)}%`;
    document.getElementById('calculator1-oc').innerHTML = `O<sup>C</sup> = ${oc.toFixed(2)}%`;
    document.getElementById('calculator1-ac').innerHTML = `A<sup>C</sup> = ${ac.toFixed(2)}%`;
    document.getElementById('calculator1-hg').innerHTML = `H<sup>Г</sup> = ${hg.toFixed(2)}%`;
    document.getElementById('calculator1-cg').innerHTML = `C<sup>Г</sup> = ${cg.toFixed(2)}%`;
    document.getElementById('calculator1-sg').innerHTML = `S<sup>Г</sup> = ${sg.toFixed(2)}%`;
    document.getElementById('calculator1-ng').innerHTML = `N<sup>Г</sup> = ${ng.toFixed(2)}%`;
    document.getElementById('calculator1-og').innerHTML = `O<sup>Г</sup> = ${og.toFixed(2)}%`;
    document.getElementById('calculator1-qph').innerText = `${qph.toFixed(2)} МДж/кг`;
    document.getElementById('calculator1-qch').innerText = `${qch.toFixed(2)} МДж/кг`;
    document.getElementById('calculator1-qgh').innerText = `${qgh.toFixed(2)} МДж/кг`;

    document.querySelector(`#calculator1 .result-box`).classList.remove('hidden');
}

function calculator2_calculate() {
    let hg = parseFloat(document.querySelector('.calculator2-hg-input').value) || 0;
    let cg = parseFloat(document.querySelector('.calculator2-cg-input').value) || 0;
    let sg = parseFloat(document.querySelector('.calculator2-sg-input').value) || 0;
    let og = parseFloat(document.querySelector('.calculator2-og-input').value) || 0;
    let vg = parseFloat(document.querySelector('.calculator2-vg-input').value) || 0;
    let wg = parseFloat(document.querySelector('.calculator2-wg-input').value) || 0;
    let ag = parseFloat(document.querySelector('.calculator2-ag-input').value) || 0;
    let qidaf = parseFloat(document.querySelector('.calculator2-qidaf-input').value) || 0;

    let hp = hg *(100-wg-ag)/100;
    let cp = cg *(100-wg-ag)/100;
    let sp = sg *(100-wg-ag)/100;
    let op = og *(100-wg-ag)/100;
    let vp = vg *(100-wg-ag)/100;
    let ap = ag *(100-wg-ag)/100;
    let qch = qidaf * (100-wg-ag)/100;

    document.getElementById('calculator2-hg').innerHTML = `H<sup>Г</sup> = ${hg}%`;
    document.getElementById('calculator2-cg').innerHTML = `C<sup>Г</sup> = ${cg}%`;
    document.getElementById('calculator2-sg').innerHTML = `S<sup>Г</sup> = ${sg}%`;
    document.getElementById('calculator2-og').innerHTML = `O<sup>Г</sup> = ${og}%`;
    document.getElementById('calculator2-vg').innerHTML = `V<sup>Г</sup> = ${vg} мг/кг`;
    document.getElementById('calculator2-wg').innerHTML = `W<sup>Г</sup> = ${wg}%`;
    document.getElementById('calculator2-qidaf').innerHTML = `Q<sub>i</sub><sup>daf</sup> = ${qidaf} МДж/кг`;

    document.getElementById('calculator2-hp').innerHTML = `H<sup>P</sup> = ${hp.toFixed(2)}%`;
    document.getElementById('calculator2-cp').innerHTML = `C<sup>P</sup> = ${cp.toFixed(2)}%`;
    document.getElementById('calculator2-sp').innerHTML = `S<sup>P</sup> = ${sp.toFixed(2)}%`;
    document.getElementById('calculator2-op').innerHTML = `O<sup>P</sup> = ${op.toFixed(2)}%`;
    document.getElementById('calculator2-vp').innerHTML = `V<sup>P</sup> = ${vp.toFixed(2)} мг/кг`;
    document.getElementById('calculator2-ap').innerHTML = `A<sup>P</sup> = ${ap.toFixed(2)}%`;
    document.getElementById('calculator2-qch').innerText = `${qch.toFixed(2)} МДж/кг`;

    document.querySelector(`#calculator2 .result-box`).classList.remove('hidden');
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
