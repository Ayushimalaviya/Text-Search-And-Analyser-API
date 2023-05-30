import venuesRoutes from './venues.js';


const constructorMethod = (app) => {
  app.use('/', venuesRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({error: ''});
  });
};

export default constructorMethod;