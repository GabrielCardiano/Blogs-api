// const { createToken } = require('../auth/authfunctions');
const { createToken } = require('../auth/authfunctions');
const userService = require('../services');

async function CreateUser(req, res) {
  try {
    const { body } = req;
    
    // verifica o email da requisição já existe no DB
    const isUser = await userService.getUserByEmail(body.email);
    if (isUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    // caminho feliz - requisição atende a todos os requisitos
    const user = await userService.createUser(body); // id e password
    const { password: _password, ...userWithoutPassword } = user.dataValues;
    const payload = { data: userWithoutPassword };
    const token = createToken(payload);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

module.exports = CreateUser;