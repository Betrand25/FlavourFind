document.addEventListener('DOMContentLoaded', () => {
    const foodStars = document.querySelectorAll('.food-stars .star');
    const serviceStars = document.querySelectorAll('.service-stars .star');
    const averageStars = document.querySelectorAll('.average-stars .star');
    const spendOptions = document.querySelectorAll('.spend-option');
    const addButton = document.querySelector('.add-button');
    const customSpendInput = document.getElementById('custom-spend');
    const fileInput = document.getElementById('file-input');
    const commentBox = document.getElementById('comment');
    const uploadedPhotosContainer = document.querySelector('.uploaded-photos');
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    

    function handleStarClick(stars, index) {
        stars.forEach((star, i) => {
            star.classList.toggle('active', i <= index);
        });
    }

    function updateAverageRating() {
        const foodRating = [...foodStars].filter(star => star.classList.contains('active')).length;
        const serviceRating = [...serviceStars].filter(star => star.classList.contains('active')).length;
        const averageRating = Math.round((foodRating + serviceRating) / 2);

        handleStarClick(averageStars, averageRating - 1);
    }

    foodStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            handleStarClick(foodStars, index);
            updateAverageRating();
        });
    });

    serviceStars.forEach((star, index) => {
        star.addEventListener('click', () => {
            handleStarClick(serviceStars, index);
            updateAverageRating();
        });
    });

    spendOptions.forEach(option => {
        option.addEventListener('click', () => {
            spendOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            customSpendInput.style.display = 'none';
        });
    });

    addButton.addEventListener('click', () => {
        spendOptions.forEach(opt => opt.classList.remove('selected'));
        customSpendInput.style.display = 'block';
        customSpendInput.focus();
    });

    customSpendInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let value = customSpendInput.value.trim();
            if (value) {
                if (!value.startsWith('Rp')) {
                    value = 'Rp ' + value;
                }
                addButton.textContent = value;
                addButton.classList.add('selected');
                customSpendInput.style.display = 'none';
            }
        }
    });

    document.querySelector('.upload-button').addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target.result;
                image.style.maxWidth = '100px';
                image.style.maxHeight = '100px';
                image.style.border = '2px solid #4998E3';
                image.style.borderRadius = '5px';
                uploadedPhotosContainer.appendChild(image);
            };
            reader.readAsDataURL(file);
        }
    });

    
    window.submitReview = function() {
        const foodRating = [...foodStars].filter(star => star.classList.contains('active')).length;
        const serviceRating = [...serviceStars].filter(star => star.classList.contains('active')).length;
        const averageRating = Math.round((foodRating + serviceRating) / 2);
        const spendOption = document.querySelector('.spend-option.selected');
        const spend = spendOption ? spendOption.dataset.value : customSpendInput.value.trim();
        const comment = commentBox.value;
        const photos = Array.from(uploadedPhotosContainer.querySelectorAll('img')).map(img => img.src);
        const firstName = loggedInEmail.split('@')[0]; 

        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        const newReview = { foodRating, serviceRating, averageRating, spend, comment, photos, author: firstName };
        reviews.push(newReview);

        localStorage.setItem('reviews', JSON.stringify(reviews));

        window.location.href = 'Review.html';
    }

});
