// shared.js

// --- EXACT DUMMY DATA ---
const patientsDB = [
    { id: "P-1001", room: "301-A", name: "Juan Dela Cruz", age: 45, gender: 'M', status: "Stable", statusColor: "success", admitted: "2026-03-20", attending: "Dr. Reyes", allergies: "None", tags: ["NPO"], diet: "NPO (Nothing by Mouth)", vitalsHistory: [{ time: "08:00 AM", bp_sys: 120, bp_dia: 80, hr: 72, temp: 36.8, pain: 2, by: "Nurse A." }, { time: "12:00 PM", bp_sys: 122, bp_dia: 82, hr: 75, temp: 37.0, pain: 1, by: "Nurse B." }], emar: [{med: "Ceftriaxone 1g IV", time: "08:00 AM", given: true}, {med: "Paracetamol 500mg IV", time: "02:00 PM", given: false}], labs: [{test: "CBC Hemoglobin", result: "13.5", ref: "13-17", flag: "Normal"}], notes: [{time: "09:00 AM", txt: "Patient stable. Awaiting lab results.", by: "Dr. Reyes"}], io: {intake: 800, output: 400} },
    { id: "P-1002", room: "302-B", name: "Maria Santos", age: 62, gender: 'F', status: "Observation", statusColor: "warning", admitted: "2026-03-24", attending: "Dr. Lim", allergies: "PENICILLIN", tags: ["Fall Risk", "Diabetic"], diet: "Diabetic Menu (Low Sugar)", vitalsHistory: [{ time: "06:00 AM", bp_sys: 140, bp_dia: 90, hr: 88, temp: 37.5, pain: 4, by: "Nurse B." }, { time: "10:00 AM", bp_sys: 165, bp_dia: 95, hr: 92, temp: 39.2, pain: 6, by: "Nurse A." }], emar: [{med: "Losartan 50mg", time: "08:00 AM", given: true}, {med: "Insulin Regular", time: "12:00 PM", given: false}], labs: [{test: "FBS (Glucose)", result: "150", ref: "70-100", flag: "High"}], notes: [{time: "10:15 AM", txt: "Fever spiked. Administered Paracetamol. Recheck in 1hr.", by: "Nurse A."}], io: {intake: 1200, output: 850} },
    { id: "P-1003", room: "303-A", name: "Arturo Magno", age: 71, gender: 'M', status: "Stable", statusColor: "success", admitted: "2026-03-22", attending: "Dr. Cruz", allergies: "None", tags: [], diet: "Low Sodium Diet", vitalsHistory: [{ time: "09:00 AM", bp_sys: 125, bp_dia: 85, hr: 68, temp: 36.5, pain: 0, by: "Nurse C." }], emar: [], labs: [], notes: [], io: {intake:0, output:0} },
    { id: "P-1004", room: "303-B", name: "Luzviminda Ocampo", age: 58, gender: 'F', status: "Critical", statusColor: "danger", admitted: "2026-03-25", attending: "Dr. Reyes", allergies: "None", tags: ["Strict I&O"], diet: "Liquid Diet", vitalsHistory: [{ time: "07:30 AM", bp_sys: 175, bp_dia: 100, hr: 110, temp: 38.5, pain: 8, by: "Nurse A." }], emar: [{med: "Amlodipine 5mg", time: "08:00 AM", given: false}], labs: [], notes: [], io: {intake: 500, output: 100} },
    { id: "P-1005", room: "304-A", name: "Ramon Bautista", age: 34, gender: 'M', status: "Stable", statusColor: "success", admitted: "2026-03-25", attending: "Dr. Lim", allergies: "Seafood", tags: [], diet: "Regular Diet", vitalsHistory: [{ time: "11:00 AM", bp_sys: 115, bp_dia: 75, hr: 70, temp: 37.1, pain: 1, by: "Nurse B." }], emar: [], labs: [], notes: [], io: {intake:0, output:0} },
    { id: "P-1006", room: "305-A", name: "Elena Garcia", age: 49, gender: 'F', status: "Observation", statusColor: "warning", admitted: "2026-03-21", attending: "Dr. Cruz", allergies: "None", tags: [], diet: "Regular Diet", vitalsHistory: [{ time: "08:15 AM", bp_sys: 145, bp_dia: 88, hr: 85, temp: 37.9, pain: 3, by: "Nurse C." }], emar: [], labs: [], notes: [], io: {intake:0, output:0} },
    { id: "P-1007", room: "305-B", name: "Crisanto Luna", age: 82, gender: 'M', status: "Stable", statusColor: "success", admitted: "2026-03-18", attending: "Dr. Reyes", allergies: "None", tags: ["Fall Risk"], diet: "Soft Diet", vitalsHistory: [{ time: "06:30 AM", bp_sys: 130, bp_dia: 80, hr: 65, temp: 36.4, pain: 0, by: "Nurse A." }], emar: [], labs: [], notes: [], io: {intake:0, output:0} },
    { id: "P-1008", room: "306-A", name: "Teresa Villanueva", age: 29, gender: 'F', status: "Stable", statusColor: "success", admitted: "2026-03-26", attending: "Dr. Lim", allergies: "None", tags: [], diet: "Regular Diet", vitalsHistory: [{ time: "02:00 PM", bp_sys: 110, bp_dia: 70, hr: 75, temp: 36.9, pain: 2, by: "Nurse B." }], emar: [], labs: [], notes: [], io: {intake:0, output:0} },
    { id: "P-1009", room: "307-A", name: "Jose Rizalino", age: 53, gender: 'M', status: "Critical", statusColor: "danger", admitted: "2026-03-26", attending: "Dr. Reyes", allergies: "Ibuprofen", tags: ["Isolation"], diet: "NPO", vitalsHistory: [{ time: "12:45 PM", bp_sys: 90, bp_dia: 55, hr: 120, temp: 39.5, pain: 9, by: "Nurse C." }], emar: [], labs: [], notes: [], io: {intake:0, output:0} },
    { id: "P-1010", room: "312-A", name: "Pedro Gomez", age: 55, gender: 'M', status: "Newly Admitted", statusColor: "primary", admitted: "Today", attending: "Dr. Reyes", allergies: "None", tags: [], diet: "Pending MD Order", vitalsHistory: [], emar: [], labs: [], notes: [], io: {intake:0, output:0} }
];

const admissionsDB = [
    { id: "ER-099", name: "Lito Lapid", age: 65, issue: "Severe Chest Pain", priority: "High", time: "10:15 AM" },
    { id: "ER-100", name: "Gloria Macapagal", age: 41, issue: "Post-Op Transfer (Appy)", priority: "Normal", time: "11:30 AM" },
    { id: "ER-101", name: "Ferdinand Marcos", age: 28, issue: "Dengue Fever", priority: "High", time: "01:00 PM" }
]; 

const pharmacyDB = [
    { med: "Paracetamol 500mg IV", type: "Analgesic", stock: 150, threshold: 50, exp: "2027-10", prescribedTo: ["Maria Santos", "Elena Garcia", "Jose Rizalino"] },
    { med: "Omeprazole 40mg IV", type: "Antacid", stock: 12, threshold: 20, exp: "2026-05", prescribedTo: ["Arturo Magno", "Gloria Macapagal"] },
    { med: "Ceftriaxone 1g", type: "Antibiotic", stock: 5, threshold: 15, exp: "2026-04", prescribedTo: ["Juan Dela Cruz", "Luzviminda Ocampo"] },
    { med: "Normal Saline 1L", type: "IV Fluid", stock: 45, threshold: 30, exp: "2028-01", prescribedTo: ["Ramon Bautista", "Jose Rizalino", "Ferdinand Marcos"] },
    { med: "Amlodipine 5mg", type: "Anti-hypertensive", stock: 200, threshold: 50, exp: "2027-11", prescribedTo: ["Luzviminda Ocampo"] },
    { med: "Losartan 50mg", type: "Anti-hypertensive", stock: 18, threshold: 30, exp: "2026-08", prescribedTo: ["Maria Santos", "Elena Garcia"] },
    { med: "Ibuprofen 400mg", type: "NSAID", stock: 120, threshold: 40, exp: "2027-02", prescribedTo: ["Teresa Villanueva"] }
];

const staffDB = [
    { name: "Sarah Jenkins, RN", role: "Charge Nurse", contact: "Loc: 101", status: "On Duty", initial: "S" },
    { name: "Michael Torres, RN", role: "Staff Nurse", contact: "Loc: 102", status: "On Duty", initial: "M" },
    { name: "Jessica Alba, RN", role: "Staff Nurse", contact: "Loc: 103", status: "On Break", initial: "J" },
    { name: "David Pineda, RN", role: "Staff Nurse", contact: "Loc: 104", status: "On Duty", initial: "D" },
    { name: "Maria Clara, RN", role: "Reliever", contact: "Loc: 105", status: "On Duty", initial: "M" },
    { name: "Dr. Alan Reyes", role: "Attending Physician", contact: "Loc: 205", status: "Rounds", initial: "AR" },
    { name: "Dr. Emily Lim", role: "Attending Physician", contact: "Loc: 206", status: "Consultation", initial: "EL" },
    { name: "Dr. Juan Cruz", role: "Resident on Duty", contact: "Loc: 207", status: "Rounds", initial: "JC" }
];

// --- GLOBAL HELPERS ---
function getTimeAgo(timeStr) {
    if (!timeStr) return "Pending";
    const now = new Date(); const [time, modifier] = timeStr.split(' '); let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00'; if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    const recordDate = new Date(); recordDate.setHours(hours, minutes, 0, 0);
    let diffMs = now - recordDate;
    if (diffMs < 0) return "Just now";
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    return `${Math.floor(diffMins / 60)}h ago`;
}

function getPatientAcuity(patient) {
    if (patient.vitalsHistory.length === 0) return 'stable';
    const latest = patient.vitalsHistory[patient.vitalsHistory.length - 1];
    if (latest.bp_sys >= 160 || latest.temp >= 39.0) return 'critical';
    if (latest.bp_sys >= 140 || latest.temp >= 38.0) return 'warning';
    return 'stable';
}

function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastPlacement');
    const toastId = 'toast_' + Date.now();
    const icon = type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger';
    const toastHTML = `<div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000"><div class="toast-header"><i class="bi ${icon} me-2"></i><strong class="me-auto">${title}</strong><button type="button" class="btn-close" data-bs-dismiss="toast"></button></div><div class="toast-body text-dark">${message}</div></div>`;
    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

function simulateAction(msg) { showToast('System Update', msg); }

function toggleButtonLoading(btnId, isLoading, defaultText = "Submit") {
    const btn = document.getElementById(btnId);
    if (isLoading) { btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Processing...`; btn.disabled = true; } 
    else { btn.innerHTML = defaultText; btn.disabled = false; }
}

function simulateLoading(targetId, callback) {
    const container = document.getElementById(targetId);
    container.innerHTML = `<div class="p-4"><div class="skeleton mb-4" style="width: 60%; height: 40px;"></div><div class="skeleton mb-4" style="width: 100%; height: 40px;"></div><div class="row g-3 mb-4"><div class="col-md-4"><div class="skeleton" style="height: 160px;"></div></div><div class="col-md-4"><div class="skeleton" style="height: 160px;"></div></div><div class="col-md-4"><div class="skeleton" style="height: 160px;"></div></div></div><div class="skeleton mb-3" style="width: 100%; height: 100px;"></div><div class="skeleton" style="width: 100%; height: 200px;"></div></div>`;
    setTimeout(callback, 300); 
}

function triggerCodeBlue() {
    const overlay = document.getElementById('emergencyOverlay');
    overlay.classList.remove('d-none');
    overlay.classList.add('code-blue-active');
    showToast("EMERGENCY ACTIVATED", "CODE BLUE INITIATED ON PAY WARD 1.", "danger");
    setTimeout(() => { overlay.classList.add('d-none'); overlay.classList.remove('code-blue-active'); }, 5000);
}