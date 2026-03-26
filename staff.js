// staff.js

function renderStaff() {
    const container = document.getElementById('staffGridContainer');
    let html = '';
    staffDB.forEach(s => {
        let statusColor = s.status === 'On Duty' ? 'success' : (s.status === 'On Break' ? 'warning' : 'info');
        html += `<div class="col-6 col-lg-3"><div class="card bg-white shadow-sm border-0 h-100 rounded-3"><div class="card-body text-center p-3"><div class="bg-secondary bg-opacity-10 text-secondary fw-700 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 50px; height: 50px; font-size: 20px;">${s.initial}</div><h6 class="card-title mb-1 fw-600 text-dark">${s.name}</h6><p class="text-muted small mb-2">${s.role}</p><span class="badge bg-${statusColor} bg-opacity-10 text-${statusColor} mb-2">${s.status}</span><hr class="my-2 border-secondary opacity-10"><small class="text-muted">${s.contact}</small></div></div></div>`;
    });
    container.innerHTML = html;
}

// Initialize Staff Page
renderStaff();