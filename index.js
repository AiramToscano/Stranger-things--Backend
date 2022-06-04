const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
app.use(express.json());

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
  );
  const strangerThingsService = new StrangerThingsService(
    strangerThingsRepository,
    );
    
    app.use(cors());
    const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE;

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  if (hereIsTheUpsideDown === 'true') { 
    const characters = strangerThingsService.search(
      req.query,
      true,
    );
    return res.status(200).json(characters);
  }
  const characters = strangerThingsService.search(
    req.query,
    false,
  );
  return res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
