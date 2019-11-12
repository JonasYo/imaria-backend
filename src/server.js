import app from './app';

const port = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

app.listen(port);
