const submitButton = document.querySelector('.submit-button');
const modalOverlay = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close');

submitButton.addEventListener('click', function() {
    modalOverlay.style.display = 'flex';
});
closeButton.addEventListener('click', function() {
    modalOverlay.style.display = 'none';
});
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
