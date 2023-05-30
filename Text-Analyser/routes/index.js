import analyzeRoutes from './textanalyzer.js';


const constructorMethod = (app) => {
  app.use('/', analyzeRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not Found'});
  });
};

export default constructorMethod;