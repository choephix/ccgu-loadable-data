const fs = require('fs');
const yaml = require('js-yaml');

function foo1(data) {
  // Function to update id of each element
  const updateId = (element) => {
    const id = parseInt(element.id, 10);
    if (id >= 268 && id <= 510) {
      element.id = id + 2048;
    }
  };

  // Iterate through each element and update id as necessary
  for (const element of data) {
    updateId(element);
  }
}

function foo2(data) {
  const newSlugs = `
  alexander-nevsky
anne-bonny
anne-dieu-le-veut
arjuna
benu-bird
beowulf
bran-the-blessed
camazotz
costello
dazhbog
dietrich
fafnir
fionn-mac-cumhaill
frithiof
hervor
huitzilopochtli
ilya-muromets
imp
kaliya-the-naga
kobold
lugh
momotaro
nuwa
reluctant-dragon
shennong
stribog
susanoo
vasilisa
viracocha`.trim().split('\n').map(s => s.trim()).filter(Boolean);


  for (const [index, slug] of newSlugs.entries()) {
    if (data.some(o => o.slug === slug)) continue;

    const obj = {
      id: 2672 + index,
      slug: slug,
      effects: {},
      guid: "53de8275-75a6-0b72-584f-ec52a6b7a" + (530 + index),
      art: "/hires/" + slug,
      power: 4,
      name: slug.replace(/\-/ig, ' ')
    };

    data.unshift(obj);
  }
}



// Load YAML data
try {
  const filePath = '../card-models.yaml';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);

  foo2(data);

  // Convert back to YAML format
  const updatedYaml = yaml.dump(data, {
    noRefs: true, // Disable anchors and aliases
    noCompatMode: true, // Disable string quoting
    quotingType: '"',
    forceQuotes: false,
  });

  // Write updated YAML back to the same file
  fs.writeFileSync(filePath, updatedYaml, 'utf8');

  console.log('YAML file updated successfully.');
} catch (e) {
  console.log(`Error: ${e}`);
}
