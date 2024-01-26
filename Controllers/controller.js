// controllers/dataController.js
const fs = require('fs').promises;
const LRU = require('lru-cache');

// Set up an LRU cache with a maximum size of 100 MB for caching file contents
const fileCache = new LRU({
    max: 100 * 1024 * 1024,
    length: (value) => value.length,
    maxAge: 1000 * 60 * 60, // Cache items for 1 hour
});

async function getData(filePath, lineNumber, res) {
    try {
        let fileContent;

        // Check if the content is in the cache
        if (fileCache.has(filePath)) {
            fileContent = fileCache.get(filePath);
        } else {
            // Read the file asynchronously and cache the content
            fileContent = await fs.readFile(filePath, 'utf-8');
            fileCache.set(filePath, fileContent);
        }

        if (lineNumber) {
            const lines = fileContent.split('\n');
            const requestedLine = lines[lineNumber - 1];

            if (requestedLine) {
                return requestedLine;
            } else {
                throw new Error(`Line ${lineNumber} not found in file`);
            }
        } else {
            res.status(200).json({ data: fileContent });
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('File not found');
        } else {
            throw error;
        }
    }
}

module.exports = { getData };
