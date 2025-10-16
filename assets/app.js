

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
    console.log("DOMContentLoaded fired. Initializing page.");
    const pagePath = window.location.pathname.split("/").pop();

    if (pagePath === 'index.html' || pagePath === '') {
        initLoginPage();
    } else if (pagePath === 'confirm.html') {
        initConfirmPage();
        // Ensure clock and banner visibility are initialized here as well
        if (document.getElementById('confirm-page')) {
            updateUtcClock(); // Initial call
            setInterval(updateUtcClock, 1000);
        }
    }
});

function updateUtcClock() {
    console.log("updateUtcClock function called.");
    const now = new Date();
    const utcPlus1 = new Date(now.getTime() + (3600 * 1000)); // Add 1 hour for UTC+1

    const day = String(utcPlus1.getUTCDate()).padStart(2, '0');
    const month = String(utcPlus1.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = utcPlus1.getUTCFullYear();
    const hours = String(utcPlus1.getUTCHours()).padStart(2, '0');
    const minutes = String(utcPlus1.getUTCMinutes()).padStart(2, '0');
    const seconds = String(utcPlus1.getUTCSeconds()).padStart(2, '0');

    const clockElement = document.getElementById('utc-clock');
    if (clockElement) {
        console.log("utc-clock element found. Updating content.");
        clockElement.textContent = `Date: ${day}-${month}-${year} ${hours}:${minutes}:${seconds} UTC+1`;
    } else {
        console.log("utc-clock element NOT found.");
    }

    checkBannerVisibility();
}
