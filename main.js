const fs = require('fs');
const path = require('path');

// File path to the JSON file
const filePath = path.join(__dirname, 'users.json');

// Helper function to read JSON data from file
function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading file:', err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Helper function to write JSON data to file
function writeJSONFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject('Error writing file:', err);
            } else {
                resolve('File written successfully');
            }
        });
    });
}

// Function to add a user
async function addUser(newUser) {
    try {
        const users = await readJSONFile(filePath);
        users.push(newUser);
        await writeJSONFile(filePath, users);
        console.log('User added successfully.');
    } catch (error) {
        console.error(error);
    }
}

// Function to remove a user by ID
async function removeUser(userId) {
    try {
        let users = await readJSONFile(filePath);
        users = users.filter(user => user.id !== userId);
        await writeJSONFile(filePath, users);
        console.log('User removed successfully.');
    } catch (error) {
        console.error(error);
    }
}

// Function to update a user's details by ID
async function updateUser(userId, updatedData) {
    try {
        let users = await readJSONFile(filePath);
        const index = users.findIndex(user => user.id === userId);

        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            await writeJSONFile(filePath, users);
            console.log('User updated successfully.');
        } else {
            console.log('User not found.');
        }
    } catch (error) {
        console.error(error);
    }
}


// const fs = require('fs');

// const jsonFilePath = process.argv[2];

// fs.readFile(jsonFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error(`Error reading file: ${err}`);
//     return;
//   }

//   const users = JSON.parse(data);

//   // TODO: Perform the required operations on the users data

//   // Print the total number of users
//   console.log(`Total number of users: ${users.length}`);

//   // Find the user with the highest score and print their details
//   const highestScoreUser = users.reduce((prev, current) => (prev.score > current.score ? prev : current));
//   console.log('User with the highest score:', highestScoreUser);

//   // Sort the users based on their scores in descending order
//   users.sort((a, b) => b.score - a.score);

//   // Write the sorted data back to the JSON file
//   fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2), (err) => {
//     if (err) {
//       console.error(`Error writing file: ${err}`);
//       return;
//     }
//     console.log('Data sorted and written back to the JSON file.');
//   });
// });
