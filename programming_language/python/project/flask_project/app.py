from flask import Flask, render_template, request, jsonify

# Create Flask application
app = Flask(__name__)

# Sample data - in a real app, this would typically come from a database
items = [
    {'id': 1, 'name': 'Item 1', 'description': 'This is the first item'},
    {'id': 2, 'name': 'Item 2', 'description': 'This is the second item'},
    {'id': 3, 'name': 'Item 3', 'description': 'This is the third item'}
]

# Route for home page
@app.route('/')
def index():
    return render_template('index.html', items=items)

# Route for about page
@app.route('/about')
def about():
    return render_template('about.html')

# API route to get all items
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

# API route to get a specific item
@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item['id'] == item_id), None)
    if item:
        return jsonify(item)
    return jsonify({'error': 'Item not found'}), 404

# API route to create a new item
@app.route('/api/items', methods=['POST'])
def create_item():
    if not request.json or not 'name' in request.json:
        return jsonify({'error': 'Name is required'}), 400
    
    new_item = {
        'id': items[-1]['id'] + 1 if items else 1,
        'name': request.json['name'],
        'description': request.json.get('description', '')
    }
    items.append(new_item)
    return jsonify(new_item), 201

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
