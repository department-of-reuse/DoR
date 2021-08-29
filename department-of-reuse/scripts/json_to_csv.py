import json
import sys

if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise Exception('The path to the JSON file must be provided as an argument')

    filename = sys.argv[1]
    with open(filename, 'r') as file:
        raw_json = file.read().replace('\n','')
    file.close()

    outfilename = filename.replace('json', 'csv')
    outfile = open(outfilename, 'w')

    processed_data = json.loads(raw_json)

    outfile.write(','.join(processed_data[0].keys()) + '\n')

    for record in processed_data:
        out = []
        for key in record.keys():
            out.append('"' + record[key] + '"')

        outfile.write(','.join(out) + '\n')

    outfile.close()
