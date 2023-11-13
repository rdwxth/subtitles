import express from 'express';
import { search, download, getShowTitles } from 'addic7ed-api';

const app = express();
app.use(express.json());

// Search for subtitles
app.get('/search', async (req, res) => {
  const { title, season, episode, languages } = req.query;
  try {
    const subtitlesList = await search(title, season, episode, languages);
    res.json(subtitlesList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subtitles' });
  }
});

// Download subtitles
app.post('/download', async (req, res) => {
  const { link, filename } = req.body;
  try {
    await download({ link }, filename);
    res.json({ message: 'Subtitles file downloaded' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download subtitles' });
  }
});

// Get all available show titles
app.get('/showTitles', async (req, res) => {
  try {
    const showTitles = await getShowTitles();
    res.json(showTitles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch show titles' });
  }
});


const port = 3000; 
const hostname = "0.0.0.0"

app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});

