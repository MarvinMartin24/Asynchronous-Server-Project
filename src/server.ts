require('custom-env').env(process.env.APP_ENV);
import app from './app';

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
      console.log('Express server listening on port ' + process.env.PORT);
    });
}


export = app; // for testing
