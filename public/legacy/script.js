const inputTextArea = document.getElementById('input');
const outputTextArea = document.getElementById('output');
const stripButton = document.getElementById('strip-button');
const copyButton = document.getElementById('copy-button');
const resetButton = document.getElementById('reset-button');
const alertBox = document.getElementById('alert');
const loadingSpinner = document.getElementById('spinner');


function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

stripButton.addEventListener('click', () => {
    const input = inputTextArea.value.trim();

    if (!input) {
        showAlert('Please enter some HTML text to strip.', 'error');
        return;
    }

    stripButton.disabled = true;
    loadingSpinner.style.display = 'block';

    setTimeout(() => {
        const strippedText = stripHtml(input);
        outputTextArea.value = strippedText;
        showAlert('HTML tags stripped successfully!', 'success');
        stripButton.disabled = false;
        loadingSpinner.style.display = 'none';
    }, 100);
});

copyButton.addEventListener('click', async () => {
    const output = outputTextArea.value.trim();

    if (!output) {
        showAlert('No text to copy!', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(output);
        showAlert('Text copied to clipboard!', 'success');
    } catch {
        showAlert('Failed to copy text. Please try again.', 'error');
    }
});

resetButton.addEventListener('click', () => {
    inputTextArea.value = '';
    outputTextArea.value = '';
    showAlert('Text areas cleared!', 'success');
});

inputTextArea.addEventListener('input', () => {
    if (alertBox.style.display === 'block') {
        alertBox.style.display = 'none';
    }
});
