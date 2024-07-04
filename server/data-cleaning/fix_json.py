import json

def fix_json_formatting(input_file, output_file):
    try:
        # Read the JSON file
        with open(input_file, 'r') as file:
            data = file.read()
        
        # Ensure it is valid JSON by loading it
        json_data = json.loads(data)

        # Write the fixed JSON to the output file with pretty print and ensure_ascii=False
        with open(output_file, 'w') as file:
            json.dump(json_data, file, indent=4, ensure_ascii=False)
        
        print(f"JSON formatting fixed and saved to {output_file}")
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

fix_json_formatting(r'server\data-cleaning\data.json', r'server\fixed_data.json')
