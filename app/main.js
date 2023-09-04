const fs = require('fs');
const yaml = require('js-yaml');

// Function to update id of each element
const updateId = (element) => {
  const id = parseInt(element.id, 10);
  if (id >= 268 && id <= 510) {
    element.id = id + 2048;
  }
};

// Load YAML data
try {
  const filePath = '../card-models.yaml';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);

  // Iterate through each element and update id as necessary
  for (const element of data) {
    // updateId(element);
  }

  // Convert back to YAML format
  const updatedYaml = yaml.dump(data, {
    noRefs: true, // Disable anchors and aliases
    noCompatMode: true // Disable string quoting
  });

  // Write updated YAML back to the same file
  fs.writeFileSync(filePath, updatedYaml, 'utf8');

  console.log('YAML file updated successfully.');
} catch (e) {
  console.log(`Error: ${e}`);
}
