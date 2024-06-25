const fs = require('fs');

// Example 1: Reading Files
// Asynchronous Read

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});


// Synchronous Read

// Synchronous Operations
// Synchronous operations are tasks that are performed one after the other, 
// where each task waits for the previous one to complete before starting.


try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content:', data);
} catch (err) {
    console.error('Error reading file:', err);
}


// Example 2: Writing Files
// Asynchronous Write


const content = 'This is some content to write into the file.';

fs.writeFile('example.txt', content, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('File has been written');
});


// Synchronous Write


const content = 'This is some content to write into the file.';

try {
    fs.writeFileSync('example.txt', content, 'utf8');
    console.log('File has been written');
} catch (err) {
    console.error('Error writing to file:', err);
}


// Example 3: Appending to Files
// Asynchronous Append


const content = '\nThis is some content to append to the file.';

fs.appendFile('example.txt', content, 'utf8', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Content has been appended');
});


// Synchronous Append


const content = '\nThis is some content to append to the file.';

try {
    fs.appendFileSync('example.txt', content, 'utf8');
    console.log('Content has been appended');
} catch (err) {
    console.error('Error appending to file:', err);
}


// Example 4: Deleting Files
// Asynchronous Delete


fs.unlink('example.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File has been deleted');
});


// Synchronous Delete



try {
    fs.unlinkSync('example.txt');
    console.log('File has been deleted');
} catch (err) {
    console.error('Error deleting file:', err);
}


// Example 5: Renaming Files
// Asynchronous Rename


fs.rename('oldName.txt', 'newName.txt', (err) => {
    if (err) {
        console.error('Error renaming file:', err);
        return;
    }
    console.log('File has been renamed');
});


// Synchronous Rename


try {
    fs.renameSync('oldName.txt', 'newName.txt');
    console.log('File has been renamed');
} catch (err) {
    console.error('Error renaming file:', err);
}


// Example 6: Creating Directories
// Asynchronous Create Directory


fs.mkdir('newDir', (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Directory has been created');
});


// Synchronous Create Directory


try {
    fs.mkdirSync('newDir');
    console.log('Directory has been created');
} catch (err) {
    console.error('Error creating directory:', err);
}


// Example 7: Reading Directories
// Asynchronous Read Directory


fs.readdir('path/to/directory', (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    console.log('Directory contents:', files);
});


// Synchronous Read Directory


try {
    const files = fs.readdirSync('path/to/directory');
    console.log('Directory contents:', files);
} catch (err) {
    
    console.error('Error reading directory:', err);
}


// Example 8: Deleting Directories
// Asynchronous Delete Directory


fs.rmdir('path/to/directory', (err) => {
    if (err) {
        console.error('Error deleting directory:', err);
        return;
    }
    console.log('Directory has been deleted');
});


// Synchronous Delete Directory


try {
    fs.rmdirSync('path/to/directory');
    console.log('Directory has been deleted');
} catch (err) {
    console.error('Error deleting directory:', err);
}