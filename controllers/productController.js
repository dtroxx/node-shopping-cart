const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  const productChunks = [];
  const chunkSize = 3;
  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }
  res.render('products', { title: 'Node Demo Shopping', productChunks });
};
