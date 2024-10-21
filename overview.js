document.addEventListener('DOMContentLoaded', () => {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const priceElement = document.getElementById('price');
    const respondedElement = document.getElementById('responded');
    const priceBar1 = document.getElementById('price-bar-1');
    const priceBar2 = document.getElementById('price-bar-2');
    const priceBar3 = document.getElementById('price-bar-3');

    let count1 = 0, count2 = 0, count3 = 0;

    reviews.forEach(review => {
        if (review.spend === 'Rp 1-25.000') {
            count1++;
        } else if (review.spend === 'Rp 25.000-50.000') {
            count2++;
        } else if (review.spend === 'Rp 50.000-75.000') {
            count3++;
        }
    });

    const totalResponses = count1 + count2 + count3;

    if (totalResponses > 0) {
        const percentage1 = (count1 / totalResponses) * 100;
        const percentage2 = (count2 / totalResponses) * 100;
        const percentage3 = (count3 / totalResponses) * 100;

        priceBar1.style.width = `${percentage1}%`;
        priceBar2.style.width = `${percentage2}%`;
        priceBar3.style.width = `${percentage3}%`;

        respondedElement.textContent = `Responded by ${totalResponses} users`;

        let highestRange = 'Rp 1-25.000';
        if (count2 > count1 && count2 > count3) {
            highestRange = 'Rp 25.000-50.000';
        } else if (count3 > count1 && count3 > count2) {
            highestRange = 'Rp 50.000-75.000';
        }
        priceElement.innerHTML = `<img src="Foto/iKON/icons8-money-50.png" alt="Money Icon"> ${highestRange} per person`;
    } else {
        priceBar1.style.width = '0%';
        priceBar2.style.width = '0%';
        priceBar3.style.width = '0%';
        respondedElement.textContent = 'Responded by 0 users';
        priceElement.innerHTML = `<img src="Foto/iKON/icons8-money-50.png" alt="Money Icon"> Rp 1-25.000 per person`;
    }
});
