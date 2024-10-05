from flask import Flask, jsonify, request
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables (OpenAI API key)
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# Check if the API key is set
if openai_api_key is None:
    raise ValueError("Please set the OPENAI_API_KEY environment variable")

# Initialize OpenAI client with the API key
client = OpenAI(api_key=openai_api_key)

# Initialize Flask app and enable CORS
app = Flask(__name__)

# Load and preprocess the drone data
input_file = "drone_data.json"
with open(input_file, encoding='utf-8') as f:
    parsed_json = json.load(f)
# print("PARSED JSON", parsed_json)

drone_data = parsed_json["data"]
# print("drone_data", drone_data)

# Function to query OpenAI with the new API structure
def query_openai(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150,
        temperature=0.5
    )
    # print("query_openai response:", response)
    return response.choices[0].message.content.strip()

@app.route('/')
def home():
    return "Drone Deploy Technical Assessment API"

# Route to return the raw drone data as JSON
@app.route('/api/data')
def show_data():
    return jsonify(drone_data)

# Route to process user queries using OpenAI
@app.route('/api/input', methods=['POST'])
def process_query():
    # Parse the incoming JSON to get the query
    try:
        user_input = request.json.get("query", "")
        print(f"Parsed user query: {user_input}")
    except Exception as e:
        print(f"Failed to parse incoming JSON data: {e}")
        return jsonify({"error": "Failed to parse incoming JSON data"}), 400
    
    # Construct the prompt to handle various questions about drone metadata
    prompt = f"""
    You are an assistant that helps answer questions about drone image data. The data includes metadata for a series of images captured during a drone flight. Your job is to interpret the user's question and identify the specific attribute(s), calculations, or conditions they are asking about.

    Here is the drone image data:
    {json.dumps(drone_data, indent=2)}

    The images are numbered sequentially from 1 to {len(drone_data)}. Users may ask questions about various attributes of the images, such as altitude, battery level, GPS coordinates, timestamp, or other aspects of the metadata.

    ### User Query ###
    User query: "{user_input}"

    ### Expected Response ###
    The response should include only the answer to the user’s question in one of the following formats:

    1. **For individual attributes**: "image_index, attribute: value"
    2. **For attributes for all images**: "image_index, attribute: value; image_index, attribute: value; ..."
    3. **For aggregate calculations**: "The [aggregate type] [attribute] is [value]."
    4. **For condition-based queries**: "image_index, attribute: value; image_index, attribute: value; ..."
    5. **For tag-based queries**: "image_index, tags: ['tag1', 'tag2']"

    Do **not** provide an explanation of how to generate the response. Return only the data that matches the user’s query.
    """


    # Query OpenAI with the constructed prompt
    try:
        openai_response = query_openai(prompt)
        print(f"OpenAI Response: {openai_response}") 

    except Exception as e:
        print(f"Error processing OpenAI query: {e}")
        return jsonify({"error": "Error processing request"}), 500

    # Identify type of response and parse accordingly

    # AGGREGATE Responses (calculations). e.g., What is the average file_size?
    if "average" in openai_response or "total" in openai_response or "minimum" in openai_response or "maximum" in openai_response:
        return jsonify({"type": "aggregate_response", "aggregate_response": openai_response})
    
    # MULTIPLE ATTRIBUTE Responses (condition based queries). e.g., Which images have altitudes greater than 80?
    elif ";" in openai_response:
        pairs = openai_response.split(";")
        print("pairs", pairs)
        results = []

        for pair in pairs:
            try:
                image_index, rest = map(str.strip, pair.split(","))
                attribute, value = rest.split(":")
                image_index = int(image_index)
                results.append({
                    "image_index": image_index,
                    "attribute": attribute.strip(),
                    "value": value.strip()
                })
            except (ValueError, IndexError):
                continue
        return jsonify({"type": "multiple_image_response", "multiple_image_response": results})
    
    # TAG BASED Query Responses, e.g, What image is tagged "elk"?
    elif "[" in openai_response and "]" in openai_response:
        try:
            image_index, tags = openai_response.split(", tags:")
            image_index_cleaned = image_index.split(":")[0].strip().replace('"', '')
            image_index = int(image_index_cleaned)
            tags_cleaned = tags.strip().replace("'", '"')
            tags_list = json.loads(tags_cleaned)
            # print("image_index", image_index)
            # print("tags", tags_list)
            return jsonify({"raw_openai_response" :openai_response})

        except (ValueError, IndexError, json.JSONDecodeError) as e:
            print(f"Error parsing tag-based response: {e}")
            return jsonify({"error": "Failed to interpret OpenAI response"}), 400

    # SINGLE IMAGE/ATTRIBUTE & FALLBACK Response: e.g., What is the altitude of image 3?
    else: 
        try: 
            image_index, rest = map(str.strip, openai_response.split(","))
            attribute, value = rest.split(":")
            image_index = int(image_index)
            return jsonify({ "type": "single_attribute_response",
                "image_index": image_index,
                "attribute": attribute.strip(),
                "value": value.strip()
            })
        # if the response is not in the expected format, return the raw response
        except (ValueError, IndexError):
            print("Returning a raw response as fallback")
            return jsonify({"type": "raw_response", "raw_openai_response": openai_response})


# Start the Flask server
if __name__ == '__main__':
    app.run(debug=True)
