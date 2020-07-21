
process.env.DB_MONGO = 'mongodb://pr-ecommerce-user:root@e-commerce-shard-00-00-s4yxw.mongodb.net:27017,e-commerce-shard-00-01-s4yxw.mongodb.net:27017,e-commerce-shard-00-02-s4yxw.mongodb.net:27017/test?ssl=true&replicaSet=e-commerce-shard-0&authSource=admin&retryWrites=true&w=majority'
process.env.SECRET = 'fernandolopez'
process.env.EMAIL='proyectosreact@gmail.com'
process.env.PASS='academiatemple2020'
process.env.HOST='localhost:4000'
process.env.CLOUD_NAME='dzfcc45y1'
process.env.API_KEY='919487441881635'
process.env.API_SECRET='YhHB8XW5gPCb99FhL4gNzCf7rjs'

const CodeReques = {
  OK: 0,
  ERROR: 1,
  VAL: 2,
  ERROR_SERVER:3
};

module.exports = CodeReques;