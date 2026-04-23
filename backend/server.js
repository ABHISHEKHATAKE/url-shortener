const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database File Path
const dataFilePath = path.join(__dirname, 'links.json');

// Ensure data file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({}));
}

// Route: Get all shortened URLs
app.get('/api/urls', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const urls = Object.entries(data).map(([short, original]) => ({
      short,
      original,
      shortUrl: `http://localhost:${PORT}/${short}`
    }));
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Route: Create a short URL
app.post('/api/shorten', (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  // Basic URL validation
  try {
    new URL(originalUrl);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    // Check if the URL already exists
    const existingShort = Object.keys(data).find(key => data[key] === originalUrl);
    if (existingShort) {
      return res.json({ 
        short: existingShort, 
        original: originalUrl,
        shortUrl: `http://localhost:${PORT}/${existingShort}`
      });
    }

    // Create new short code
    const short = shortid.generate();
    data[short] = originalUrl;
    
    // Save to file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    res.json({ 
      short, 
      original: originalUrl,
      shortUrl: `http://localhost:${PORT}/${short}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while saving' });
  }
});

// Route: Redirect short URL to Original
app.get('/:short', (req, res) => {
  const { short } = req.params;
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const originalUrl = data[short];
    
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
