let formCount = 1;
function highlightKeywords(text) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
    const regex = new RegExp(keywords.join('|'), 'gi');
    return text.replace(regex, match => `<b>${match}</b>`);
}
document.querySelector('textarea').addEventListener('input', (e) => {
    document.querySelector('.anything').innerHTML = highlightKeywords(document.querySelector('textarea').value);
})
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
    form.querySelector('.anything').innerHTML = '';
    form.querySelector('textarea').textContent = '';
    form.querySelector('textarea').addEventListener('input', (e) => {
        form.querySelector('.anything').innerHTML = highlightKeywords(form.querySelector('textarea').value);
    })
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

function appendBRBRBBRBRBBRBRBRBRBRBRB(element) {
    element.appendChild(document.createElement("br"));
}

submitButton.addEventListener('click', function () {
    modalOverlay.style.display = 'flex';
    const paragraph = modalOverlay.querySelector('.modal p');
    appendBRBRBBRBRBBRBRBRBRBRBRB(paragraph);
    paragraph.textContent += `\nВы заказали ${formCount} ${getDeclension(formCount)}.`;
    const modal = modalOverlay.querySelector('.modal');
    appendBRBRBBRBRBBRBRBRBRBRBRB(modal);
    modal.appendChild(document.createElement('table'));
    const table = modal.querySelector('table');
    const head = document.createElement('thead');
    head.appendChild(document.createElement('tr'));
    const h1 = document.createElement('th');
    h1.textContent = 'Напиток';
    head.querySelector('tr').appendChild(h1);
    const h2 = document.createElement('th');
    h2.textContent = 'Молоко';
    head.querySelector('tr').appendChild(h2);
    const h3 = document.createElement('th');
    h3.textContent = 'Дополнительно';
    head.querySelector('tr').appendChild(h3);
    table.appendChild(head);
    const body = document.createElement('tbody');
    const forms = document.querySelectorAll('fieldset');
    forms.forEach((form) => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const dropDown = form.querySelector('select');
        td.textContent = dropDown.selectedOptions[0].value;
        tr.appendChild(td);
        const td1 = document.createElement('td');
        const radioButtons = form.querySelectorAll('input[type=radio]');


        radioButtons.forEach((radio) => {
            if (radio.checked) {
                const labelText = radio.value;
                td1.textContent = labelText;
            }
        });
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        const checkboxes = form.querySelectorAll('input[type=checkbox]');


        checkboxes.forEach((radio) => {
            if (radio.checked) {
                const labelText = radio.value;
                if (td2.textContent.length === 0) {
                    td2.textContent = labelText;
                } else {
                    td2.textContent += ', ' + labelText;
                }
            }
        });
        tr.appendChild(td2);
        body.appendChild(tr);
    })
    table.appendChild(body);
});
closeButton.addEventListener('click', function () {
    modalOverlay.style.display = 'none';
});