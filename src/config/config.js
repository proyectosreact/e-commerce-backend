
process.env.DB_MONGO = 'mongodb://pr-ecommerce-user:root@e-commerce-shard-00-00-s4yxw.mongodb.net:27017,e-commerce-shard-00-01-s4yxw.mongodb.net:27017,e-commerce-shard-00-02-s4yxw.mongodb.net:27017/test?ssl=true&replicaSet=e-commerce-shard-0&authSource=admin&retryWrites=true&w=majority'
process.env.SECRET = 'fernandolopez'

const CodeReques = {
  OK: 0,
  ERROR: 1,
  VAL: 2
};
const facebook={
  id:774711750018305,
  secret:'b30f510ae0a126f9caa375eda7442e87'
}
module.exports={
  facebook,
  CodeReques
}