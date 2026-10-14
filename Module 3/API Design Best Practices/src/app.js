
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');

function createApp() {
  const app = express();

  app.use(express.json());

  app.use('/', postRoutes);
  app.get('/explode', controller.explode);

  // Safe JSON error handler
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid JSON request body',
        },
      });
    }

    console.error(err);

    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      },
    });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;

  app.listen(port, () => {
    console.log(`Starter API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData,
};
