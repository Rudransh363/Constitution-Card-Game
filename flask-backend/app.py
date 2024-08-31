from flask import Flask, jsonify
import csv

app = Flask(__name__)

# Define the route to read the CSV file
@app.route('/api/cards', methods=['GET'])
def read_csv():
    data = []
    try:
        # Open the CSV file
        with open('questions.csv', newline='') as csvfile:
            csvreader = csv.reader(csvfile, delimiter=',')
            header = next(csvreader)  # Read the header row
            for row in csvreader:
                data.append(dict(zip(header, row)))  # Convert each row to a dictionary
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return an error message if something goes wrong
    
    return jsonify(data)  # Return the CSV data as JSON

if __name__ == '__main__':
    app.run(debug=True)
