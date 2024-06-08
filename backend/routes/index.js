const ProfileRoutes = require('./AcountRoutes')
const flowRoutes = require('./flowRoutes')
const reciptRoutes = require('./reciptRoutes')
const loginRoutes = require('./loginRoutes')
const menuRoutes = require('./menuRouter')
const acountsRoutes = require('./AcountRoutes')
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/loginController");
const departsRoutes = require('./DepartmentRouter')
const permissRoutes = require('./permissRouter')
const ContractRoutes = require('./ContractRouter')
const nccRoutes = require('./NccRouter')
const cussRoutes = require('./CustomerRouter')
const thuchiRoutes = require('./ThuChiRoutes')
const permiss_userRoutes = require('./permission_User')

const routes = (app) => {
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });

  app.use('/api/thuchi', thuchiRoutes)
  app.use('/api/cus', cussRoutes)
  app.use('/api/acount', AuthController.login, loginRoutes)
  app.use('/api/acounts', acountsRoutes)
  app.use('/api/permiss', permissRoutes)
  app.use('/api/permiss_user', permiss_userRoutes)
  app.use('/api/depart', departsRoutes)
  app.use('/api/ncc', nccRoutes)
  app.use('/api/ctr', ContractRoutes)

  app.post("/refresh-token", AuthController.refreshToken);



  app.use(AuthMiddleWare.isAuth);

  app.use('/api/menu', menuRoutes)

  // app.use('/api/personalprofile', ProfileRoutes)
  // app.use('/api/flow', flowRoutes)
  // app.use('/api/recipt', reciptRoutes)
}
module.exports = routes