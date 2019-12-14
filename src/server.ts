require('custom-env').env(process.env.APP_ENV);
import app from './app';
import http from 'http';


http.createServer(app).listen(process.env.PORT, () => {
  console.log('Express server listening on port ' + process.env.PORT);
})
