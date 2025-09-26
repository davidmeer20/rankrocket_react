def get_pages_scanned(data):
    return len(data) if isinstance(data, list) else 0
def get_drilldown_all(data):
    types = {
        'Heading': ['H1', 'H2'],
        'Canonical': ['Canonical'],
        'Meta Description': ['Meta Description']
    }
    drilldown = {label: 0 for label in types}

    for page in data:
        for issue in page.get('issues', []):
            issue_type = issue.get('type')
            for label, keys in types.items():
                if issue_type in keys:
                    drilldown[label] += 1

    return drilldown

def get_drilldown_high(data):
    types = {
        'Heading': ['H1', 'H2'],
        'Canonical': ['Canonical'],
        'Meta Description': ['Meta Description']
    }
    drilldown = {label: 0 for label in types}

    for page in data:
        for issue in page.get('issues', []):
            issue_type = issue.get('type')
            severity = issue.get('severity')
            for label, keys in types.items():
                if issue_type in keys and severity == 'HIGH':
                    drilldown[label] += 1

    return drilldown
import json

def get_metrics(data):
    high_severity_count = 0
    total_count = 0

    for page in data:
        for issue in page['issues']:
            if issue['severity'] is not None:
                total_count += 1
                if issue['severity'] == 'HIGH':
                    high_severity_count += 1

    high_severity_percentage = (high_severity_count / total_count) * 100 if total_count > 0 else 0

    return {
        'high_severity_count': high_severity_count,
        'total_count': total_count,
        'high_severity_percentage': high_severity_percentage
    }

if __name__ == "__main__":
    try:
        with open('/Users/davidmeer/rank_rocket_base/my-react-app/sample.json', encoding='utf-8') as f:
            content = f.read()
            #print("File content preview:", content[:200])  # Print first 200 chars
            data = json.loads(content)
    except FileNotFoundError:
        print("sample.json not found. Check the path.")
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
    
    metrics = get_metrics(data)
    # print("High Severity Issues:", metrics['high_severity_count'])
    # print("Total Issues:", metrics['total_count'])
    # print(f"Health Score is: {metrics['high_severity_percentage']:.0f}")
    drilldown_data = get_drilldown(data)
    print("Drilldown Data:", drilldown_data)    