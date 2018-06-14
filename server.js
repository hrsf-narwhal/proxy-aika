const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');
const publicPath = path.resolve(__dirname, './public');

app.use(express.static( publicPath ));
app.use('/listing/:productID', express.static(path.join(__dirname, './public')));

app.use('/images/', proxy({target:'http://localhost:3001', changeOrigin:true}));
app.use('/api/listing/', proxy({target:'http://localhost:3002', changeOrigin:true}));
app.use('/purchase', proxy({target:'http://localhost:3003', changeOrigin:true}));


app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
