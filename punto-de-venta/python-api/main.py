from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data for demonstration
sales = []
products = []
users = []

@app.route('/api/sales', methods=['GET', 'POST'])
def handle_sales():
    if request.method == 'POST':
        sale = request.json
        sales.append(sale)
        return jsonify(sale), 201
    return jsonify(sales)

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        product = request.json
        products.append(product)
        return jsonify(product), 201
    return jsonify(products)

@app.route('/api/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'POST':
        user = request.json
        users.append(user)
        return jsonify(user), 201
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)