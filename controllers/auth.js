const { response, request } = require("express");
const bcrypt = require("bcryptjs");
// mis importaciones
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req = request, res = response) => {
  // recupero los datos de la request
  const { email, password } = req.body;

  try {
    // Busco un usuario con ese mail para verificar que no exista
    let usuario = await Usuario.findOne({ email });
    // pregunto si existe, largo error en caso positivo
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe con ese correo",
      });
    }
    // creo una instancia de Usuario con
    usuario = new Usuario(req.body);

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // la guardo en la base de datos
    await usuario.save();

    // En este punto podemos generar el token
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador...",
    });
  }
};

const loginUsuario = async (req = request, res = response) => {
  // recupero los datos de la request
  const { email, password } = req.body;

  try {
    // Busco un usuario con ese mail para verificar que exista
    let usuario = await Usuario.findOne({ email });
    // pregunto si existe
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese correo",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    // En este punto podemos generar el token
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador...",
    });
  }
};

const revalidarToken = async (req = request, res = response) => {
  // Esto lo agrego en el middleware validarJWT
  const uid = req.uid;
  const name = req.name;

  // Ahora genero un nuevo token
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,    
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
