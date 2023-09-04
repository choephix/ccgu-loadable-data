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
  abdul-alhazred
  aglea
  aramis
  bluebeard
  boudica
  briar-rose
  carmilla
  coyolxauhqui
  dupin
  freyr
  gerda
  goldilocks
  grace-o-malley
  gretel
  guillaume-d-orange
  hansel
  harun-al-rasahid
  hasan-of-basra
  hyde
  irene-adler
  jekyll
  jengu-sawa
  kai
  lady-macbeth
  little-red-riding-hood
  madame-defarge
  morgiana
  moriarty
  nostradamus
  ogma
  oshun
  pippi
  porthos
  queen-of-hearts
  queen-tomyris
  ran
  rebecca
  rose-red
  rusalka
  siegfried
  snow-queen
  snow-white
  stribog
  tangra
  tawaddud
  tsarevna
  ukko
  yemaya
  yue-fei
  zhar-ptitsa
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

  let index = 0;
  for (const slug of newSlugs) {
    if (data.some(o => o.slug === slug)) continue;

    const obj = {
      id: 2112 + index,
      slug: slug,
      effects: {},
      guid: "53de8275-75a6-0b72-584f-ec52a6b7a" + (530 + index),
      art: "/hires/" + slug,
      power: 5,
      name: slug.replace(/\-/ig, ' ')
    };

    data.unshift(obj);

    index++;
  }
}

function foo3(data) {
  function capitalizeWord(word) {
    // List of words to not capitalize
    const ignoreList = ['the', 'of', 'in', 'and', 'or', 'at', 'by', 'to'];
    if (ignoreList.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  for (const item of data) {
    if (item.name) {
      // Replace any "-" or "_" with spaces
      let newName = item.name.replace(/[-_]/g, ' ');

      // Make sure there are no more than one adjacent space
      newName = newName.replace(/\s+/g, ' ').trim();

      // Capitalize each word, considering exceptions
      newName = newName.split(' ').map(capitalizeWord).join(' ');

      // Update the name field
      item.name = newName;
    }
  }
}



// Load YAML data
try {
  const filePath = '../card-models.yaml';
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);

  foo3(data);

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
