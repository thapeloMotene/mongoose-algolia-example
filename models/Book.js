var mongoose = require('mongoose');
var mongoolia = require('mongoolia').default;
const mongooseAlgolia = require('mongoose-algolia');


// Pass `{algoliaIndex: true}` to push theses attributes for indexing to Algolia
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, algoliaIndex: true },
    author: { type: String, required: true, algoliaIndex: true },
    description: { type: String, required: true, algoliaIndex: true }
  });

  // Specify your Algolia credentials which you can find into your dashboard
// BookSchema.plugin(mongoolia, {
//     appId: 'F9Q8GKVFW6',
//     apiKey: '2d61c6313aea1e4e68840e62f4bb69ee',
//     indexName: 'Books'
//   });

BookSchema.plugin(mongooseAlgolia,{
    appId: 'F9Q8GKVFW6',
    apiKey: '2d61c6313aea1e4e68840e62f4bb69ee',
    indexName: 'Books', //The name of the index in Algolia, you can also pass in a function 
    //selector: '-author', //You can decide which field that are getting synced to Algolia (same as selector in mongoose) 
    // populate: {
    //   path: 'comments',
    //   select: 'author'
    // },
    defaults: {
      author: 'unknown'
    },
    // mappings: {
    //   title: function(value) {
    //     return `Book: ${value}`
    //   }
    // },
    // virtuals: {
    //   whatever: function(doc) {
    //     return `Custom data ${doc.title}`
    //   }
    // },
    // filter: function(doc) {
    //   return !doc.softdelete
    // },
    debug: true // Default: false -> If true operations are logged out in your console 
  });


  let Model = mongoose.model('Book', BookSchema);
  Model.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings) 
  Model.SetAlgoliaSettings({
    searchableAttributes: ['name','properties','shows'] //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info. 
  })

  module.exports =Model;