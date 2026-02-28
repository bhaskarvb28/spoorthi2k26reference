import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';

const app = express();
const PORT = 3000;

// Initialize Database
const db = new Database('spoorthi.db');
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    usn TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL,
    event TEXT NOT NULL,
    teamMembers TEXT,
    phone TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usn, event)
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imageData TEXT NOT NULL,
    caption TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// API Routes

// Get all registrations (internal use or debugging, maybe results?)
// app.get('/api/registrations', (req, res) => { ... });

// Register for an event
app.post('/api/register', (req, res) => {
  try {
    const { fullName, usn, department, year, event, teamMembers, phone } = req.body;
    
    if (!fullName || !usn || !department || !year || !event || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stmt = db.prepare(`
      INSERT INTO registrations (fullName, usn, department, year, event, teamMembers, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(fullName, usn, department, year, event, teamMembers || '', phone);
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ error: 'You have already registered for this event.' });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get gallery images
app.get('/api/gallery', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM gallery ORDER BY createdAt DESC');
    const images = stmt.all();
    res.json(images);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload gallery image
app.post('/api/gallery', (req, res) => {
  try {
    const { imageData, caption } = req.body;
    if (!imageData) {
      return res.status(400).json({ error: 'Image data required' });
    }

    const stmt = db.prepare('INSERT INTO gallery (imageData, caption) VALUES (?, ?)');
    const info = stmt.run(imageData, caption || '');
    res.json({ success: true, id: info.lastInsertRowid });
  } catch (error) {
    console.error('Upload gallery error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Setup Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    // But for this environment, we rely on the dev server mostly.
    // If we were to build, we'd serve static here.
    // For now, let's assume dev mode or handle static serving if built.
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
