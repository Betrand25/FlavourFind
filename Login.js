document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-box form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Cek apakah email terdaftar di localStorage
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (email === storedEmail && password === storedPassword) {
            // Simpan informasi bahwa pengguna sudah login
            localStorage.setItem('loggedInEmail', email);
            
            // Pengguna terdaftar, arahkan ke halaman Home
            window.location.href = 'Home.html';
        } else {
            // Pengguna tidak terdaftar, tampilkan pesan kesalahan
            alert('Email atau password salah, atau Anda belum terdaftar.');
        }
    });
});
