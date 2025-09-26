/**
 * Creates a URL for a given page name, handling the specifics of the platform's routing.
 * This is a local development mock of the platform's built-in utility.
 * @param {string} pageName - The name of the page component file (without .js extension). Can include URL parameters like 'PageName?id=123'.
 * @returns {string} The platform-specific URL path for the page.
 */
export function createPageUrl(pageName) {
  // In a typical local setup or on the base44 platform, pages are often served under a specific path prefix.
  const [path, queryString] = pageName.split('?');
  
  let url = `/${path}`; // In local dev, you might not need '/p/'. Let's keep it clean.
  
  if (queryString) {
    url += `?${queryString}`;
  }
  
  // The live platform might map this to /p/PageName, but for local dev this is more direct.
  // If your local router is set up for /p/, you can change this line to:
  // let url = `/p/${path}`;
  
  return url;
}

// Utility functions for drilldown analysis


// Returns counts for all issues by type, plus total issues
export function getDrilldownAll(data) {
  const types = {
    Heading: ['H1', 'H2'],
    Canonical: ['Canonical'],
    'Meta Description': ['Meta Description'],
  };
  const drilldown = { Heading: 0, Canonical: 0, 'Meta Description': 0 };
  let totalIssues = 0;

  data.forEach(page => {
    (page.issues || []).forEach(issue => {
      totalIssues++;
      Object.entries(types).forEach(([label, keys]) => {
        if (keys.includes(issue.type)) {
          drilldown[label]++;
        }
      });
    });
  });

  return { ...drilldown, totalIssues };
}

// Returns counts for HIGH severity issues by type, plus total high severity issues
export function getDrilldownHigh(data) {
  const types = {
    Heading: ['H1', 'H2'],
    Canonical: ['Canonical'],
    'Meta Description': ['Meta Description'],
  };
  const drilldown = { Heading: 0, Canonical: 0, 'Meta Description': 0 };
  let totalHighIssues = 0;

  data.forEach(page => {
    (page.issues || []).forEach(issue => {
      if (issue.severity === 'HIGH') {
        totalHighIssues++;
      }
      Object.entries(types).forEach(([label, keys]) => {
        if (keys.includes(issue.type) && issue.severity === 'HIGH') {
          drilldown[label]++;
        }
      });
    });
  });

  return { ...drilldown, totalHighIssues };
}

// Returns the number of pages scanned
export function getPagesScanned(data) {
  return Array.isArray(data) ? data.length : 0;
}