// Sistema de autenticación
class AuthSystem {
    constructor() {
        this.currentUser = localStorage.getItem('currentUser') || null;
        this.isRegistering = false;
        this.init();
    }

    init() {
        this.updateNavbar();
        this.setupEventListeners();
    }

    updateNavbar() {
        const navbarUsername = document.getElementById('navbar-username');
        const authButtons = document.getElementById('auth-buttons');
        
        if (navbarUsername) {
            navbarUsername.textContent = this.currentUser || '';
        }

        if (authButtons) {
            if (this.currentUser) {
                authButtons.innerHTML = `
                    <button class="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded" 
                            onclick="authSystem.logout()">
                        Cerrar Sesión
                    </button>
                `;
            } else {
                authButtons.innerHTML = `
                    <button class="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded" 
                            onclick="authSystem.showLoginModal()">
                        Iniciar Sesión
                    </button>
                `;
            }
        }
    }

    setupEventListeners() {
        const loginForm = document.getElementById('login-form');
        const toggleRegister = document.getElementById('toggle-register');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        if (toggleRegister) {
            toggleRegister.addEventListener('click', () => {
                this.toggleRegistration();
            });
        }
    }

    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            UIkit.modal(modal).show();
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            UIkit.modal(modal).hide();
        }
    }

    toggleRegistration() {
        this.isRegistering = !this.isRegistering;
        const modalTitle = document.getElementById('modal-title');
        const submitBtn = document.getElementById('submit-btn');
        const toggleBtn = document.getElementById('toggle-register');

        if (modalTitle) {
            modalTitle.textContent = this.isRegistering ? 'Registrarse' : 'Iniciar Sesión';
        }
        if (submitBtn) {
            submitBtn.textContent = this.isRegistering ? 'Registrarse' : 'Iniciar Sesión';
        }
        if (toggleBtn) {
            toggleBtn.textContent = this.isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?';
        }
    }

    handleSubmit() {
        const usernameInput = document.getElementById('username-input');
        const passwordInput = document.getElementById('password-input');
        
        if (usernameInput && passwordInput) {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (username && password) {
                this.login(username);
                usernameInput.value = '';
                passwordInput.value = '';
            }
        }
    }

    login(username) {
        this.currentUser = username;
        localStorage.setItem('currentUser', username);
        this.updateNavbar();
        this.hideLoginModal();
        
        UIkit.notification({
            message: `Bienvenido ${username}`,
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateNavbar();
        
        UIkit.notification({
            message: 'Sesión cerrada exitosamente',
            status: 'success',
            pos: 'top-center',
            timeout: 3000
        });
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Inicializar el sistema de autenticación
const authSystem = new AuthSystem();