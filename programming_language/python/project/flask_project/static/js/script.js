// Function to get item details from the API
function getItemDetails(itemId) {
    fetch(`/api/items/${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the item details section
            document.getElementById('item-name').textContent = data.name;
            document.getElementById('item-description').textContent = data.description;
            document.getElementById('item-id').textContent = data.id;
            
            // Show the details container
            document.getElementById('item-detail-container').style.display = 'block';
            
            // Scroll to the details section
            document.querySelector('.item-details').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
            alert('Failed to load item details. Please try again.');
        });
}

// Add event listener when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Flask Demo Application loaded successfully!');
});
