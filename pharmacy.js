// pharmacy.js

function renderPharmacy() {
    const tbody = document.getElementById('pharmacyTableBody');
    let html = ''; let lowStockCount = 0;
    pharmacyDB.forEach((item, index) => {
        let isLow = item.stock <= item.threshold;
        if (isLow) lowStockCount++;
        let statusBadge = isLow ? '<span class="badge bg-danger bg-opacity-10 text-danger px-2 py-1">Low Stock</span>' : '<span class="badge bg-success bg-opacity-10 text-success px-2 py-1">Optimal</span>';
        let isExpiring = item.exp.includes("2026-04") || item.exp.includes("2026-05");
        let expHTML = isExpiring ? `<span class="text-danger fw-bold"><i class="bi bi-exclamation-circle me-1"></i>${item.exp}</span>` : item.exp;

        html += `
            <tr class="pharmacy-row" data-bs-toggle="collapse" data-bs-target="#collapseMed${index}">
                <td><strong class="text-dark">${item.med}</strong> <i class="bi bi-chevron-down text-muted ms-1 fs-9"></i></td>
                <td class="text-muted">${item.type}</td>
                <td><strong class="${isLow ? 'text-danger' : 'text-dark'}">${item.stock}</strong> units</td>
                <td>${expHTML}</td>
                <td>${statusBadge}</td>
                <td onclick="event.stopPropagation()">
                    <div class="input-group input-group-sm" style="width: 120px;">
                        <input type="number" class="form-control text-center" placeholder="Qty">
                        <button class="btn btn-outline-secondary fw-bold" onclick="simulateAction('Medication Deducted')">-</button>
                    </div>
                </td>
            </tr>
            <tr id="collapseMed${index}" class="collapse bg-light">
                <td colspan="6" class="p-3 border-bottom"><strong class="text-muted fs-8 text-uppercase">Currently Prescribed To:</strong><br><span class="fs-8 text-dark">${item.prescribedTo.join(', ')}</span></td>
            </tr>
        `;
    });
    tbody.innerHTML = html; document.getElementById('lowStockCount').innerText = lowStockCount;
}

// Initialize Pharmacy Page
renderPharmacy();