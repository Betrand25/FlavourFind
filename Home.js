document.addEventListener('DOMContentLoaded', () => {
    const firstName = localStorage.getItem('firstName');
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    if (loggedInEmail && firstName) {
        // Hide the login and sign-in buttons
        document.querySelector('.auth-buttons').style.display = 'none';

        // Create the welcome message with the logout icon
        const welcomeMessageContainer = document.querySelector('.welcome-message-container');
        const welcomeMessage = document.createElement('div');
        welcomeMessage.classList.add('welcome-message');
        welcomeMessage.innerHTML = `Hi, ${firstName} <img src="Foto/iKON/icons8-log-out-50 (1).png" class="logout-icon" id="logout-icon" alt="Logout">`;

        // Append the welcome message to the container
        welcomeMessageContainer.appendChild(welcomeMessage);

        // Add an event listener for the logout icon
        document.getElementById('logout-icon').addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('loggedInEmail');
                localStorage.removeItem('firstName');
                window.location.reload();
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const locationIcon = document.getElementById("location-icon");
    const locationText = document.getElementById("location-text");
    let previousLocation = locationText.textContent; 

    locationIcon.addEventListener("click", function() {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "location-input");
        input.setAttribute("placeholder", "Enter your location...");
        input.value = previousLocation;
        locationText.parentNode.replaceChild(input, locationText);

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                const locationName = input.value;
                if (locationName) {
                    previousLocation = locationName;
                    locationText.textContent = locationName;
                    input.parentNode.replaceChild(locationText, input);
                }
            }
        });

        input.addEventListener("blur", function() {
            input.parentNode.replaceChild(locationText, input);
        });

        input.focus(); 
    });
});

function navigateToPage(page) {
    window.location.href = page;
}
