function addClient() {
    const clientName = document.getElementById('clientName').value;
    const clientImage = document.getElementById('clientImage').files[0];

    if (clientImage) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;
            const clientReview = {
                name: clientName,
                image: base64Image
            };
            // Store the client review in localStorage
            const reviews = JSON.parse(localStorage.getItem('clientReviews')) || [];
            reviews.push(clientReview);
            localStorage.setItem('clientReviews', JSON.stringify(reviews));
            alert('Client added successfully!');
        };
        reader.readAsDataURL(clientImage);
    } else {
        alert('Please upload an image.');
    }
}