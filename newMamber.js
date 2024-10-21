document.addEventListener('DOMContentLoaded', () => {
    const couponCodeElement = document.getElementById('coupon-code');
    const redeemButton = document.querySelector('.redeem-button');
    const loggedInEmail = localStorage.getItem('loggedInEmail');

    window.redeemCoupon = function() {
        if (!loggedInEmail) {
            alert('Please login to redeem the coupon.');
            window.location.href = 'Login.html';
        } else {
            // Check if the user has given a review
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const hasReviewed = reviews.some(review => review.author === loggedInEmail.split('@')[0]);

            if (!hasReviewed) {
                alert('You need to give a review before redeeming the coupon.');
            } else {
                // Check if the new member coupon has already been redeemed
                const redeemedCoupons = JSON.parse(localStorage.getItem('redeemedCoupons')) || {};
                if (redeemedCoupons[loggedInEmail] && redeemedCoupons[loggedInEmail]['HAPPYBIRTHDAY']) {
                    alert('You have already redeemed this coupon. It can only be used once.');
                } else {
                    const couponCode = generateCouponCode('HAPPYBIRTHDAY');
                    couponCodeElement.textContent = `Your Coupon Code: ${couponCode}`;
                    couponCodeElement.classList.remove('hidden');

                    if (!redeemedCoupons[loggedInEmail]) {
                        redeemedCoupons[loggedInEmail] = {};
                    }
                    redeemedCoupons[loggedInEmail]['HAPPYBIRTHDAY'] = true;
                    localStorage.setItem('redeemedCoupons', JSON.stringify(redeemedCoupons));

                    alert(`Your coupon code is: ${couponCode}. It can only be used once.`);
                    redeemButton.disabled = true;
                    redeemButton.textContent = 'Redeemed';
                }
            }
        }
    }

    function generateCouponCode(prefix) {
        return prefix + Math.floor(100000 + Math.random() * 900000);
    }

    const redeemedCoupons = JSON.parse(localStorage.getItem('redeemedCoupons')) || {};
    if (redeemedCoupons[loggedInEmail] && redeemedCoupons[loggedInEmail]['HAPPYBIRTHDAY']) {
        redeemButton.disabled = true;
        redeemButton.textContent = 'Redeemed';
    }
});
