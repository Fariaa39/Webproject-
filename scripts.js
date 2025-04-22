document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const uploadPrescriptionBtn = document.getElementById('uploadPrescriptionBtn');
    const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const prescriptionImage = document.getElementById('prescriptionImage');
    const mainContent = document.getElementById('mainContent');
    
    // Event Listeners
    loginBtn.addEventListener('click', showLoginModal);
    uploadPrescriptionBtn.addEventListener('click', showUploadModal);
    uploadSubmitBtn.addEventListener('click', handlePrescriptionUpload);
    loginSubmitBtn.addEventListener('click', handleLogin);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadSection(this.id.replace('Link', ''));
        });
    });
    
    // Quick action buttons
    document.getElementById('checkPrescriptionBtn').addEventListener('click', () => loadSection('interactions'));
    document.getElementById('viewHistoryBtn').addEventListener('click', () => loadSection('history'));
    
    // Functions
    function showLoginModal() {
        loginModal.show();
    }
    
    function showUploadModal() {
        uploadModal.show();
    }
    
    function handlePrescriptionUpload() {
        const file = prescriptionImage.files[0];
        const notes = document.getElementById('prescriptionNotes').value;
        
        if (!file) {
            alert('Please select a prescription image to upload');
            return;
        }
        
        // In a real app, we would upload to server here
        // For demo, we'll simulate upload
        showLoading();
        
        setTimeout(() => {
            uploadModal.hide();
            showAlert('success', 'Prescription uploaded successfully!');
            loadSection('prescriptions');
            hideLoading();
        }, 1500);
    }
    
    function handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const role = document.getElementById('loginRole').value;
        
        if (!email || !password || !role) {
            showAlert('danger', 'Please fill in all fields');
            return;
        }
        
        // In a real app, we would authenticate with server here
        // For demo, we'll simulate login
        showLoading();
        
        setTimeout(() => {
            loginModal.hide();
            updateUIForLoggedInUser(role, email);
            showAlert('success', `Logged in as ${role}`);
            hideLoading();
        }, 1000);
    }
    
    function updateUIForLoggedInUser(role, email) {
        // Update navbar
        loginBtn.textContent = 'Logout';
        loginBtn.removeEventListener('click', showLoginModal);
        loginBtn.addEventListener('click', handleLogout);
        
        registerBtn.style.display = 'none';
        
        // Add user info to navbar
        const userInfo = document.createElement('div');
        userInfo.className = 'navbar-text ms-3';
        userInfo.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)}: ${email}`;
        document.querySelector('.navbar-collapse').appendChild(userInfo);
        
        // Load appropriate dashboard based on role
        loadDashboard(role);
    }
    
    function handleLogout() {
        // Reset UI
        loginBtn.textContent = 'Login';
        loginBtn.removeEventListener('click', handleLogout);
        loginBtn.addEventListener('click', showLoginModal);
        
        registerBtn.style.display = 'block';
        
        // Remove user info
        const userInfo = document.querySelector('.navbar-text');
        if (userInfo) userInfo.remove();
        
        // Load default content
        loadSection('home');
        showAlert('info', 'Logged out successfully');
    }
    
    function loadSection(section) {
        showLoading();
        
        // Simulate loading content from server
        setTimeout(() => {
            let content = '';
            
            switch(section) {
                case 'prescriptions':
                    content = generatePrescriptionsContent();
                    break;
                case 'interactions':
                    content = generateInteractionsContent();
                    break;
                case 'history':
                    content = generateHistoryContent();
                    break;
                default:
                    content = generateHomeContent();
            }
            
            mainContent.innerHTML = content;
            hideLoading();
        }, 500);
    }
    
    function loadDashboard(role) {
        showLoading();
        
        // Simulate loading dashboard based on role
        setTimeout(() => {
            let content = '';
            
            switch(role) {
                case 'patient':
                    content = generatePatientDashboard();
                    break;
                case 'doctor':
                    content = generateDoctorDashboard();
                    break;
                case 'pharmacist':
                    content = generatePharmacistDashboard();
                    break;
                case 'admin':
                    content = generateAdminDashboard();
                    break;
                default:
                    content = generateHomeContent();
            }
            
            mainContent.innerHTML = content;
            hideLoading();
        }, 500);
    }
    
    function generatePatientDashboard() {
        return `
            <div class="row">
                <div class="col-md-8">
                    <h2>Patient Dashboard</h2>
                    <p>Welcome to your personal health portal. Here you can manage your prescriptions and view safety information.</p>
                    
                    <div class="card prescription-card">
                        <div class="card-body">
                            <h5 class="card-title">My Prescriptions</h5>
                            <button class="btn btn-primary mb-3" id="newUploadBtn">
                                <i class="bi bi-upload"></i> Upload New Prescription
                            </button>
                            
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Prescription</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2023-06-15</td>
                                            <td>Prescription_001.jpg</td>
                                            <td><span class="badge bg-success">Verified</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                                <button class="btn btn-sm btn-outline-danger">Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2023-06-10</td>
                                            <td>Prescription_002.jpg</td>
                                            <td><span class="badge bg-warning text-dark">Pending Review</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                                <button class="btn btn-sm btn-outline-danger">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card mt-4">
                        <div class="card-body">
                            <h5 class="card-title">Recent Safety Checks</h5>
                            <div class="alert alert-success">
                                <strong>Last Check:</strong> No interactions found in your current medications.
                            </div>
                            <button class="btn btn-info">Run New Safety Check</button>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Quick Actions</h5>
                            <button class="btn btn-primary w-100 mb-2" id="dashboardUploadBtn">
                                <i class="bi bi-upload"></i> Upload Prescription
                            </button>
                            <button class="btn btn-secondary w-100 mb-2">
                                <i class="bi bi-file-medical"></i> Request Refill
                            </button>
                            <button class="btn btn-info w-100 mb-2">
                                <i class="bi bi-heart-pulse"></i> Update Health Profile
                            </button>
                        </div>
                    </div>
                    
                    <div class="card mt-4">
                        <div class="card-body">
                            <h5 class="card-title">Current Medications</h5>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Lipitor
                                    <span class="badge bg-primary rounded-pill">20mg</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Metformin
                                    <span class="badge bg-primary rounded-pill">500mg</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function generateDoctorDashboard() {
        // Similar structure but tailored for doctors
        return `<h2>Doctor Dashboard</h2>`;
    }
    
    function generatePharmacistDashboard() {
        // Similar structure but tailored for pharmacists
        return `<h2>Pharmacist Dashboard</h2>`;
    }
    
    function generateAdminDashboard() {
        // Similar structure but tailored for administrators
        return `<h2>Administrator Dashboard</h2>`;
    }
    
    function generatePrescriptionsContent() {
        return `<h2>Prescriptions</h2>`;
    }
    
    function generateInteractionsContent() {
        return `<h2>Medication Interactions</h2>`;
    }
    
    function generateHistoryContent() {
        return `<h2>Medical History</h2>`;
    }
    
    function generateHomeContent() {
        return `
            <div class="row">
                <div class="col-md-8">
                    <h2>Welcome to Prescription Safety Checker</h2>
                    <p>A web-based program that assists doctors and pharmacists in reviewing prescriptions for potential concerns.</p>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Key Features</h5>
                            <ul>
                                <li>Detects prescription interactions</li>
                                <li>Checks for allergies</li>
                                <li>Verifies medical history conflicts</li>
                                <li>Suggests alternative medications</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Quick Actions</h5>
                            <button class="btn btn-primary w-100 mb-2">Check Prescription</button>
                            <button class="btn btn-secondary w-100 mb-2">Upload Prescription</button>
                            <button class="btn btn-info w-100">View Medical History</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function showLoading() {
        mainContent.innerHTML = '<div class="loading-spinner"></div>';
    }
    
    function hideLoading() {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) spinner.style.display = 'none';
    }
    
    function showAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.prepend(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    // Initialize the page
    loadSection('home');
});