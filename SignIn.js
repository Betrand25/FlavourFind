document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.querySelector('.signin-box form');
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok.');
            return;
        }

        // Simulasi penyimpanan ke localStorage
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        alert('Data pendaftaran berhasil disimpan!');
        window.location.href = 'Login.html';
    });
});
