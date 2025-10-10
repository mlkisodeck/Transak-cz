

// --- CONFIGURATION ---
const VALID_HASH = "074c07c8048cfe08825ef02b808bd2539abbaceac3c9710e11152afef2640764";

const METADATA = {
  "file_name": "Potvrzení transakce 10-10-2025 Jana Kuchařová.pdf",
  "sha256": "074c07c8048cfe08825ef02b808bd2539abbaceac3c9710e11152afef2640764",
  "account": "LT93 3250 0729 9966 2815",
  "beneficiary": "JANA KUCHAŘOVÁ",
  "document_timestamp": "Datum transakce : 10. října 2025 19:16:54",
  
  "xpub_details": {
    "title": "XPUB PODROBNOSTI TRANSAKCE",
    "amounts": [
        { "label": "ČÁSTKA TRANSAKCE (2025-10-10)", "value": "66.780,00.00", "currency": "Euro" },
        { "label": "PŘIDAT ROVNOVÁHU \"2\"", "value": "566,51.00", "currency": "Euro" }
    ],
    "total": { "label": "CELKEM ODESLÁNO", "value": "67 346,51 €" }
  },

  "verification_nodes": {
    "title": "UZEL OVĚŘENÍ TRANSAKCÍ",
    "headers": ["#", "TIME", "ADDRESS", "AMOUNT", "TRANSACTION HASH"],
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
            errorMessage.textContent = 'Neplatný kód';
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
            amountsHtml += "\
                <div class=\"amount-row\">\n                    <span>" + item.label + "</span>\n                    <span class=\"mono-font\">" + item.value + " " + item.currency + "</span>\n                </div>\n            ";
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
            entriesHtml += "\
                <tr>\n                    <td>" + entry.id + "</td>\n                    <td>" + entry.time + "</td>\n                    <td><span class=\"address-hash\">" + entry.address + "</span></td>\n                    <td class=\"amount-positive\">" + entry.amount + "</td>\n                    <td><span class=\"address-hash\">" + entry.hash + "</span></td>\n                </tr>\n            ";
        });
        tbody.innerHTML = entriesHtml;
    }
}
