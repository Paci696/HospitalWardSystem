// active-ward.js
let chartTemp = null;
let chartBP = null;
let chartHR = null;

function renderPatientList(filter = 'all') {
    const listContainer = document.getElementById('patientListContainer');
    listContainer.innerHTML = ''; 

    let filteredPatients = patientsDB;
    if (filter === 'critical') filteredPatients = patientsDB.filter(p => getPatientAcuity(p) === 'critical');
    else if (filter === 'stable') filteredPatients = patientsDB.filter(p => getPatientAcuity(p) === 'stable');

    if (filteredPatients.length === 0) { listContainer.innerHTML = `<div class="p-4 text-center text-muted">No patients found.</div>`; return; }

    filteredPatients.forEach(patient => {
        let acuityBorderClass = ''; let timeAgoText = 'Pending Check';
        const acuity = getPatientAcuity(patient);
        if (acuity === 'critical') acuityBorderClass = 'acuity-danger';
        if (acuity === 'warning') acuityBorderClass = 'acuity-warning';
        if (patient.vitalsHistory.length > 0) timeAgoText = getTimeAgo(patient.vitalsHistory[patient.vitalsHistory.length - 1].time);

        const card = document.createElement('div');
        card.className = `patient-card p-3 border-bottom ${acuityBorderClass}`;
        card.onclick = () => {
            document.querySelectorAll('.patient-card').forEach(c => c.classList.remove('active-patient'));
            card.classList.add('active-patient');
            simulateLoading('patientDetailContainer', () => loadPatientDetails(patient.id));
        };
        
        let tagHTML = patient.tags.map(t => `<span class="badge bg-secondary bg-opacity-10 text-secondary fs-9 me-1">${t}</span>`).join('');

        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-1">
                <strong class="text-primary fw-600">Room ${patient.room}</strong>
                <span class="badge bg-${patient.statusColor} bg-opacity-10 text-${patient.statusColor}">${patient.status}</span>
            </div>
            <div class="fw-bold text-dark fs-6">${patient.name}</div>
            <div class="mb-1">${tagHTML}</div>
            <div class="d-flex justify-content-between align-items-end mt-1">
                <small class="text-muted">ID: ${patient.id}</small>
                <span class="badge bg-secondary bg-opacity-10 text-secondary fs-9"><i class="bi bi-clock me-1"></i>${timeAgoText}</span>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function loadPatientDetails(patientId) {
    const patient = patientsDB.find(p => p.id === patientId);
    const hasVitals = patient.vitalsHistory.length > 0;
    
    let historyRows = hasVitals ? [...patient.vitalsHistory].reverse().map(r => `<tr><td>${r.time}</td><td><strong>${r.bp_sys}/${r.bp_dia}</strong></td><td>${r.hr}</td><td>${r.temp}°C</td><td><span class="badge bg-secondary bg-opacity-10 text-dark">${r.pain}/10</span></td><td class="text-muted small">${r.by}</td></tr>`).join('') : `<tr><td colspan="6" class="text-center text-muted py-4">No vitals.</td></tr>`;
    
    let allergyBanner = patient.allergies !== "None" ? `<div class="alert alert-danger py-2 mb-3 fw-bold text-center border-0 rounded-0" style="margin: -1.5rem -1.5rem 1.5rem -1.5rem;"><i class="bi bi-exclamation-triangle-fill me-2"></i>ALLERGIES: ${patient.allergies.toUpperCase()}</div>` : '';
    let tagHTML = patient.tags.map(t => `<span class="badge bg-dark bg-opacity-10 text-dark fs-8 me-1">${t}</span>`).join('');

    document.getElementById('patientDetailContainer').innerHTML = `
        ${allergyBanner}
        <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <div>
                <h2 class="mb-1 text-dark fw-700">${patient.name} <span class="text-muted fs-4">(${patient.room})</span></h2>
                <div class="mb-2">
                    ${tagHTML}
                    <span class="badge bg-info bg-opacity-10 text-info fw-bold fs-8 border border-info ms-1"><i class="bi bi-cup-hot-fill me-1"></i>Diet: ${patient.diet}</span>
                </div>
                <span class="text-muted small fw-500">Age: ${patient.age}/${patient.gender} | Admitted: ${patient.admitted} | MD: ${patient.attending}</span>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary fw-600" data-bs-toggle="modal" data-bs-target="#barcodeModal"><i class="bi bi-upc-scan"></i></button>
                <button class="btn btn-outline-danger fw-600 px-3" data-bs-toggle="modal" data-bs-target="#dischargeModal"><i class="bi bi-box-arrow-right me-1"></i>Discharge</button>
            </div>
        </div>

        <div class="row g-3 mb-4">
            <div class="col-md-4"><div class="card bg-white shadow-sm border-0 rounded-3 h-100 p-3"><h6 class="text-muted fw-700 fs-9 text-uppercase mb-2">Temp (°C)</h6><div style="position: relative; height: 130px; width: 100%;"><canvas id="chartTemp"></canvas></div></div></div>
            <div class="col-md-4"><div class="card bg-white shadow-sm border-0 rounded-3 h-100 p-3"><h6 class="text-muted fw-700 fs-9 text-uppercase mb-2">Blood Pressure</h6><div style="position: relative; height: 130px; width: 100%;"><canvas id="chartBP"></canvas></div></div></div>
            <div class="col-md-4"><div class="card bg-white shadow-sm border-0 rounded-3 h-100 p-3"><h6 class="text-muted fw-700 fs-9 text-uppercase mb-2">Heart Rate (BPM)</h6><div style="position: relative; height: 130px; width: 100%;"><canvas id="chartHR"></canvas></div></div></div>
        </div>

        <div class="card bg-white shadow-sm mb-4 border-top border-primary border-3 rounded-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="card-title text-uppercase text-muted fw-700 mb-0" style="font-size: 0.8rem;">Log New Vitals</h6>
                    <button class="btn btn-sm btn-outline-info text-dark fw-bold fs-9 py-1 px-2" id="btnFetchMonitor" onclick="fetchMonitorVitals()">
                        <i class="bi bi-bluetooth me-1"></i> Sync Monitor
                    </button>
                </div>
                <div class="row g-2">
                    <div class="col-md-2"><label class="fs-9 text-muted ms-1">Systolic</label><input type="number" id="inputBpSys" class="form-control form-control-sm" placeholder="120"></div>
                    <div class="col-md-2"><label class="fs-9 text-muted ms-1">Diastolic</label><input type="number" id="inputBpDia" class="form-control form-control-sm" placeholder="80"></div>
                    <div class="col-md-2"><label class="fs-9 text-muted ms-1">Temp (°C)</label><input type="number" id="inputTemp" class="form-control form-control-sm" placeholder="36.5"></div>
                    <div class="col-md-2"><label class="fs-9 text-muted ms-1">HR (BPM)</label><input type="number" id="inputHr" class="form-control form-control-sm" placeholder="75"></div>
                    <div class="col-md-2"><label class="fs-9 text-danger fw-bold ms-1">Pain (0-10)</label><input type="number" id="inputPain" class="form-control form-control-sm border-danger" placeholder="0"></div>
                    <div class="col-md-2 d-flex align-items-end"><button class="btn btn-primary btn-sm w-100 fw-600" id="btnSaveVitals" onclick="simulateSaveVitals('${patient.id}')">Save</button></div>
                </div>
            </div>
        </div>

        <h5 class="mb-3 fw-600 text-dark">Vitals Flowsheet</h5>
        <div class="table-responsive rounded-3 border bg-white shadow-sm">
            <table class="table table-hover mb-0 table-sm fs-8"><thead class="table-light text-uppercase text-muted"><tr><th>Time</th><th>BP</th><th>HR</th><th>Temp</th><th>Pain</th><th>By</th></tr></thead><tbody>${historyRows}</tbody></table>
        </div>
    `;
    
    if (hasVitals) renderVitalsCharts(patient.vitalsHistory);
}

function renderVitalsCharts(history) {
    if (chartTemp) chartTemp.destroy(); if (chartBP) chartBP.destroy(); if (chartHR) chartHR.destroy();

    const labels = history.map(r => r.time); const dataTemp = history.map(r => r.temp);
    const dataSys = history.map(r => r.bp_sys); const dataDia = history.map(r => r.bp_dia); const dataHR = history.map(r => r.hr);
    const commonOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { grid: { color: '#e9ecef' } } } };

    chartTemp = new Chart(document.getElementById('chartTemp').getContext('2d'), { type: 'line', data: { labels: labels, datasets: [{ data: dataTemp, borderColor: '#fd7e14', backgroundColor: 'rgba(253, 126, 20, 0.1)', fill: true, tension: 0.3, pointRadius: 3 }] }, options: { ...commonOptions, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: 35, max: 41 } } } });
    chartBP = new Chart(document.getElementById('chartBP').getContext('2d'), { type: 'line', data: { labels: labels, datasets: [{ label: 'Sys', data: dataSys, borderColor: '#dc3545', tension: 0.3, pointRadius: 3 }, { label: 'Dia', data: dataDia, borderColor: '#0d6efd', tension: 0.3, pointRadius: 3 }] }, options: { ...commonOptions, plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 10 } } } }, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: 40, max: 180 } } } });
    chartHR = new Chart(document.getElementById('chartHR').getContext('2d'), { type: 'bar', data: { labels: labels, datasets: [{ data: dataHR, backgroundColor: '#20c997', borderRadius: 4 }] }, options: { ...commonOptions, scales: { ...commonOptions.scales, y: { ...commonOptions.scales.y, min: 40, max: 150 } } } });
}

function simulateSaveVitals(patientId) {
    const temp = document.getElementById('inputTemp').value; const sys = document.getElementById('inputBpSys').value; const dia = document.getElementById('inputBpDia').value; const hr = document.getElementById('inputHr').value; const pain = document.getElementById('inputPain').value;
    const btnId = 'btnSaveVitals';
    if (!temp || !sys || !dia || !hr || !pain) { showToast("Data Required", "Please fill in all vitals and pain level.", "danger"); return; }

    toggleButtonLoading(btnId, true, "Save");
    setTimeout(() => {
        toggleButtonLoading(btnId, false, "Save");
        const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const patient = patientsDB.find(p => p.id === patientId);
        patient.vitalsHistory.push({ time: timeString, bp_sys: parseInt(sys), bp_dia: parseInt(dia), hr: parseInt(hr), temp: parseFloat(temp), pain: parseInt(pain), by: "Admin (You)" });

        showToast("✅ Success", "Vitals record added successfully.");
        
        document.getElementById('inputTemp').value = ''; document.getElementById('inputBpSys').value = ''; document.getElementById('inputBpDia').value = ''; document.getElementById('inputHr').value = ''; document.getElementById('inputPain').value = '';
        
        renderPatientList(); loadPatientDetails(patientId);
    }, 800); 
}

function fetchMonitorVitals() {
    const btn = document.getElementById('btnFetchMonitor');
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Syncing...`;
    setTimeout(() => {
        document.getElementById('inputBpSys').value = Math.floor(Math.random() * (150 - 110 + 1)) + 110;
        document.getElementById('inputBpDia').value = Math.floor(Math.random() * (95 - 70 + 1)) + 70;
        document.getElementById('inputTemp').value = (Math.random() * (38.5 - 36.2) + 36.2).toFixed(1);
        document.getElementById('inputHr').value = Math.floor(Math.random() * (110 - 65 + 1)) + 65;
        document.getElementById('inputPain').value = Math.floor(Math.random() * 4);
        btn.innerHTML = `<i class="bi bi-bluetooth me-1"></i> Sync Monitor`;
        showToast("Bluetooth Sync", "Data successfully pulled from bedside monitor.", "success");
    }, 800);
}

// Initialize Active Ward
renderPatientList();