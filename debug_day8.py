
import json
import re

path = 'src/data/n3.json'
with open(path, 'r') as f:
    data = json.load(f)

# ID 7506 is Day 8
item = next((x for x in data if x['id'] == 7506), None)
if item:
    explanation = item['explanation']
    print(f"Original explanation length: {len(explanation)}")
    
    # Check cleaning
    cleaned = re.sub(r'<audio.*?>.*?</audio>', '', explanation)
    print(f"Cleaned length: {len(cleaned)}")
    
    # Check splitting
    # The regex from the script
    pattern = re.compile(r'(<strong>\s*[0-9０-９]+[．.][\s\S]*?</strong>)')
    parts = pattern.split(cleaned)
    
    print(f"Split parts count: {len(parts)}")
    
    matches = 0
    for i, part in enumerate(parts):
        if i % 2 == 1:
            matches += 1
            print(f"Match {matches}: '{part[:50]}...'")
        else:
            print(f"Non-match {i}: length {len(part)}")
else:
    print("Item 7506 not found")
