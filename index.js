let formCount = 1;
document.querySelector('.add-button').addEventListener('click', () => {
    formCount++;
    let forms = document.querySelectorAll(".beverage");
    let newForm = forms[forms.length - 1].cloneNode(true);
    resetField(newForm);
    document.querySelector('.fields').appendChild(newForm);
});


function resetField(form) {
    form.querySelector("h4").innerHTML = `Напиток №${formCount}`;
    form.querySelector('select').selectedIndex = 1;
    form.querySelectorAll('input[type="radio"]').forEach((e) => {
        e.name += formCount;
    });
    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    form.appendChild(createButton(form))
}

function createButton(form) {
    const button = document.createElement('button');
    button.className = 'close-form-button';
    button.textContent = '☓';
    button.addEventListener('click', (e) => {
        if (formCount > 1) {
            form.remove();
            formCount--;
        }
    });
    return button;
}
function getDeclension(count) {
    count = Math.abs(count);
    count %= 100;
    if (count >= 5 && count <= 20) {
        return 'напитков';
    }
    count %= 10;
    if (count === 1) {
        return 'напиток';
    }
    if (count >= 2 && count <= 4) {
        return 'напитка';
    }
    return 'напитков';
}
const submitButton = document.querySelector('.submit-button');
const modalOverlay = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close');
submitButton.addEventListener('click', function () {
    modalOverlay.style.display = 'flex';
    modalOverlay.querySelector('.modal p').textContent += `\nВы заказали ${formCount} ${getDeclension(formCount)}.`;
});
closeButton.addEventListener('click', function () {
    modalOverlay.style.display = 'none';
});