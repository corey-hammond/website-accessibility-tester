const pa11y = require('pa11y');

export default async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: 'url is required' });
  } else {
    const results = await pa11y(req.query.url);
    res.status(200).json(results);
  }
};
