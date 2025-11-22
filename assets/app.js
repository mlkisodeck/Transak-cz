

// --- CONFIGURATION ---
const VALID_HASH = "074c07c8048cfe08825ef02b808bd2539abbaceac3c9710e11152afef2640764";

const METADATA = {
  "file_name": "Confirmación de Transferencia 22-11-2025 Isaac Rodríguez.pdf",
  "sha256": "074c07c8048cfe08825ef02b808bd2539abbaceac3c9710e11152afef2640764",
  "account": "Número de cuenta: 3173085585130",
  "beneficiary": "ISAAC HÉCTOR RODRÍGUEZ QUISPE",
  "document_timestamp": "Fecha de la transferencia: 22 de noviembre de 2025",
  
  "xpub_details": {
    "title": "DETALLES DE LA TRANSFERENCIA",
    "amounts": [
        { "label": "MONTO A TRANSFERIR", "value": "880,000.00", "currency": "USD" }
    ],
    "total": { "label": "TOTAL ENVIADO", "value": "880,000.00 USD" }
  },

  "verification_nodes": {
    "title": "NODO DE VERIFICACIÓN DE TRANSACCIONES",
    "headers": ["#", "TIEMPO", "DIRECCIÓN", "MONTO", "HASH DE TRANSACCIÓN"],
    "entries": [
        {
            "id": 1,
            "time": "2025-05-02 18:14:37",
            "address": "1Ge6rDuyCdYVGhXZjcK4251q67GXMKx6xK",
            "amount": "+4.69",
            "hash": "6345124331212af2f2034ebd84f469e9fb003ae6ef8f638a109f944294d99"
        },
        {
            "id": 3,
            "time": "2025-10-10 14:21:56",
            "address": "15Y1We6UH6GTrD4RTGbbFSqsZCRtkWgAak",
            "amount": "+1.00",
            "hash": "62752123c103aedef585cc0bb3dab00b6feaf12f845f3c3b7ad52c18783aab"
        }
    ]
  }
};

// --- LOGIQUE DE L'APPLICATION ---

document.addEventListener('DOMContentLoaded', () => {
    const pagePath = window.location.pathname.split("/").pop();

    if (pagePath === 'index.html' || pagePath === '') {
        initLoginPage();
    } else if (pagePath === 'confirm.html') {
        initConfirmPage();
    }
});

function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    const hashInput = document.getElementById('hash-input');
    const errorMessage = document.getElementById('error-message');

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (hashInput.value.trim() === VALID_HASH) {
            document.body.classList.add('fade-out');
            setTimeout(() => {
                sessionStorage.setItem('trz_logged', '1');
                window.location.href = 'confirm.html';
            }, 500);
        } else {
            errorMessage.textContent = 'Código inválido';
            hashInput.classList.add('is-invalid');
        }
    });
}

function initConfirmPage() {
    if (sessionStorage.getItem('trz_logged') !== '1') {
        window.location.href = 'index.html';
        return;
    }
    populatePage();
}

function populatePage() {
    // Populate simple fields
    document.getElementById('meta-beneficiary').textContent = METADATA.beneficiary;
    document.getElementById('meta-account').textContent = METADATA.account;
    document.getElementById('meta-doc-timestamp').textContent = METADATA.document_timestamp;

    // Populate XPUB details
    const xpubContainer = document.getElementById('xpub-details');
    if (xpubContainer) {
        let amountsHtml = '';
        METADATA.xpub_details.amounts.forEach(item => {
            amountsHtml += `
                <div class="amount-row">
                    <span>${item.label}</span>
                    <span class="mono-font">${item.value} ${item.currency}</span>
                </div>
            `;
        });
        xpubContainer.innerHTML = amountsHtml;
        document.getElementById('total-amount').textContent = METADATA.xpub_details.total.value;
        document.getElementById('total-label').textContent = METADATA.xpub_details.total.label;
    }

    // Populate verification nodes
    const nodesTable = document.getElementById('verification-nodes-table');
    if (nodesTable) {
        const tbody = nodesTable.querySelector('tbody');
        let entriesHtml = '';
        METADATA.verification_nodes.entries.forEach(entry => {
            entriesHtml += `
                <tr>
                    <td>${entry.id}</td>
                    <td>${entry.time}</td>
                    <td><span class="address-hash">${entry.address}</span></td>
                    <td class="amount-positive">${entry.amount}</td>
                    <td><span class="address-hash">${entry.hash}</span></td>
                </tr>
            `;
        });
        tbody.innerHTML = entriesHtml;
    }
}
