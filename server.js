const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/cities', async (req, res) => {
  try {
    const payload = await axios.get(
      'http://covid19-api.weedmark.systems/api/v1/stats?country=US'
    );
    return res.status(200).json(payload.data);
  } catch (err) {
    return res.status(500).json(err);
  }
});
 
app.listen(PORT, () => console.log(`running on port ${PORT}`));
