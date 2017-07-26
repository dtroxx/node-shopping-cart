const Product = require('../models/Product');
const mongoose = require('mongoose');

// when using local database
// mongoose.connect('mongodb://localhost/shopping');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const products = [
  new Product({
    imagePath: 'https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/35.jpg',
    title: 'Gear of Wars',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    additionalInfo: 'Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla lectus, primis ad volutpat ante elementum torquent in ultricies, tincidunt congue lacinia fames varius tellus quis odio. Tristique lectus ligula placerat leo proin tincidunt enim lacinia lobortis, massa fames posuere ultrices aliquet mollis neque suspendisse accumsan, velit augue pretium vel ullamcorper eros dis arcu. Mi parturient ac odio luctus proin quam, arcu purus varius sed velit eu, ultrices lectus placerat dis a.',
    category: 'Games',   
    mfgPrice: 18, 
    price: 12
  }),
  new Product({
    imagePath: 'https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/1.jpg',
    title: 'Grand Theft Auto IV',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    additionalInfo: 'Tellus integer cubilia hendrerit duis sapien mus risus, venenatis aliquam nostra est elementum a, ac euismod eleifend penatibus at pretium. Vel vivamus ridiculus luctus curabitur porttitor mi bibendum egestas iaculis torquent ut lacinia lacus, quam porta nullam sem ultricies proin turpis natoque aenean ullamcorper eleifend laoreet. Dis mauris viverra id rutrum iaculis ultrices porta nostra ut nibh magna, libero varius integer arcu aenean netus a hendrerit natoque vel.',
    category: 'Games',
    mfgPrice: 23,
    price: 15
  }),
  new Product({
    imagePath: 'https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/42.jpg',
    title: 'Fallout 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    additionalInfo: 'Tellus integer cubilia hendrerit duis sapien mus risus, venenatis aliquam nostra est elementum a, ac euismod eleifend penatibus at pretium. Vel vivamus ridiculus luctus curabitur porttitor mi bibendum egestas iaculis torquent ut lacinia lacus, quam porta nullam sem ultricies proin turpis natoque aenean ullamcorper eleifend laoreet. Dis mauris viverra id rutrum iaculis ultrices porta nostra ut nibh magna, libero varius integer arcu aenean netus a hendrerit natoque vel.',
    category: 'Games',
    mfgPrice: 17,
    price: 11
  }),
  new Product({
    imagePath: 'http://www.treknews.net/wp-content/uploads/2012/12/star-trek-video-game-cover-art.jpg',
    title: 'Star Trek',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    additionalInfo: 'Tellus integer cubilia hendrerit duis sapien mus risus, venenatis aliquam nostra est elementum a, ac euismod eleifend penatibus at pretium. Vel vivamus ridiculus luctus curabitur porttitor mi bibendum egestas iaculis torquent ut lacinia lacus, quam porta nullam sem ultricies proin turpis natoque aenean ullamcorper eleifend laoreet. Dis mauris viverra id rutrum iaculis ultrices porta nostra ut nibh magna, libero varius integer arcu aenean netus a hendrerit natoque vel.',
    category: 'Games',
    mfgPrice: 29,
    price: 18
  }),
  new Product({
    imagePath: 'https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/27.jpg',
    title: 'Mass Effect',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    additionalInfo: 'Tellus integer cubilia hendrerit duis sapien mus risus, venenatis aliquam nostra est elementum a, ac euismod eleifend penatibus at pretium. Vel vivamus ridiculus luctus curabitur porttitor mi bibendum egestas iaculis torquent ut lacinia lacus, quam porta nullam sem ultricies proin turpis natoque aenean ullamcorper eleifend laoreet. Dis mauris viverra id rutrum iaculis ultrices porta nostra ut nibh magna, libero varius integer arcu aenean netus a hendrerit natoque vel.',
    category: 'Games',
    mfgPrice: 25,
    price: 14
  })
];

let done = 0;
for (let i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

const exit = () => {
  mongoose.disconnect();
};
