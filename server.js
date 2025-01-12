const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.options('*', cors(corsConfig));
app.use(cors(corsConfig));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
