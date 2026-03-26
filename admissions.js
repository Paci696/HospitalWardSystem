// admissions.js

function renderAdmissions() {
    const container = document.getElementById('admissionsListContainer');
    if (admissionsDB.length === 0) { container.innerHTML = `<p class="text-muted">No pending transfers.</p>`; return; }
    let html = '';
    admissionsDB.forEach(req => {
        const badgeColor = req.priority === 'High' ? 'danger' : 'secondary';
        html += `<div class="card bg-white shadow-sm mb-2 border-0 border-start border-${badgeColor} border-4"><div class="card-body py-2 px-3 d-flex justify-content-between align-items-center"><div><h6 class="mb-0 fw-600 text-dark">${req.name} <span class="text-muted small">(Age: ${req.age})</span></h6><small class="text-danger fw-600">${req.issue}</small></div><div class="text-end"><span class="badge bg-${badgeColor} bg-opacity-10 text-${badgeColor} mb-1">${req.priority}</span><br><small class="text-muted">ER Req: ${req.time}</small></div></div></div>`;
    });
    container.innerHTML = html;
}

function submitAdmissionForm() {
    const btnId = 'btnSubmitAdmission'; toggleButtonLoading(btnId, true, "Process");
    setTimeout(() => { toggleButtonLoading(btnId, false, "Process Admission"); showToast("Patient Admitted", "Admission processed successfully.", "success"); }, 1500);
}

// Initialize Admissions Page
renderAdmissions();