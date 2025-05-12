# Flask Demo Application

A simple Flask web application that demonstrates basic Flask functionality including routes, templates, and API endpoints.

## Features

- Home page displaying a list of items
- About page with API documentation
- RESTful API endpoints for managing items
- Responsive design with CSS
- Interactive features with JavaScript

## Project Structure

```
flask_project/
├── app.py                  # Main Flask application file
├── requirements.txt        # Python dependencies
├── README.md               # This file
├── static/                 # Static assets
│   ├── css/
│   │   └── style.css       # CSS styles
│   └── js/
│       └── script.js       # JavaScript functionality
└── templates/              # HTML templates
    ├── index.html          # Home page template
    └── about.html          # About page template
```

## Installation and Setup

1. Create a virtual environment (recommended):
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install required packages:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Open your web browser and go to `http://127.0.0.1:5000/`

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get a specific item by ID
- `POST /api/items` - Create a new item

## Example API Usage

### Get all items
```javascript
fetch('/api/items')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Get a specific item
```javascript
fetch('/api/items/1')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Create a new item
```javascript
fetch('/api/items', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'New Item',
        description: 'This is a new item created via API'
    })
})
.then(response => response.json())
.then(data => console.log(data));
```