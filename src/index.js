import app from './app';
import http from 'http';
import { port } from './Config/environmentSetup';

const setPort = port || '3300';

app.set('port', setPort);

let server = http.createServer(app);

app.listen(setPort, () => {
  console.log(`App is now listening on port ${setPort}`);
});

export default server;