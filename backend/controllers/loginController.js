const jwtHelper = require("../helpers/jwt.helper");

const db = require('../models')
let tokenList = {};
// create main Model
const Acount = db.accounts
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "3600000";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-quanghungdev.com-green-cat-a@";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "240hr";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";


const login = async (req, res) => {
  try {
    let id = req.params.id
    let acountdata = await Acount.findOne({ attributes: ['account_id', 'department_id', 'username', 'fullname', 'avatar', 'role_deparment', 'email', 'phone'], where: { username: req.body.username, password: req.body.password } })
    const userFakeData = {
      _id: acountdata.account_id,
      name: acountdata.username,
      department_id: acountdata.department_id,
      role_deparment: acountdata.role_deparment
      // email: req.body.email,
    };
    const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generaterefresh(userFakeData, refreshTokenSecret, refreshTokenLife);

    let item = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: acountdata
    }
    tokenList[refreshToken] = { accessToken, refreshToken };
    return res.status(200).send(item);
  } catch (error) {
    return res.status(404).send({ message: error })
  }
}


let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // debug("tokenList: ", tokenList);
  // console.log("refreshTokenFromClient", refreshTokenFromClient)
  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      // console.log("decoded", decoded)
      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      // debug("decoded: ", decoded);
      const userFakeData = decoded.data;

      // debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

      // console.log("accessToken", accessToken)
      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
      debug(error);

      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};

module.exports = {
  login: login,
  refreshToken: refreshToken,
}