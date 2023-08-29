const { createToken } = require('../auth/authfunctions');
const { userService } = require('../services');

async function createUser(req, res) {
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

async function getAllUsers(req, res) {
  try {
    const allUsers = await userService.getAllUsers();
    const users = allUsers.map((user) => {
      const { password: _password, ...usersWithNoPassword } = user.dataValues;
      return usersWithNoPassword;
    });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const { password: _password, ...userWithoutPassword } = user.dataValues;
    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};