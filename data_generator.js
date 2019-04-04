const fs = require('fs');
const faker = require('faker');

const jsonData = { notes: [] }

// create 1000 notes
for (let i = 1; i <= 1000; i++) {
  jsonData.notes.push({ 
    id: i, 
    title: faker.lorem.sentence(),
    content: faker.lorem.sentences()
  })
}
 

// For set a readable format with 2 spaces
const jsonContent = JSON.stringify(jsonData, null, 2);

fs.writeFile("db.json", jsonContent, 'utf8', (err) => {  
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  } 
  console.log("JSON file has been saved.");
}); 