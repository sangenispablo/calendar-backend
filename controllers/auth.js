const { response, request } = require("express");

const crearUsuario = (req = request, res = response) => {
  // recupero los datos de la request
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "registro",
    user: { name, email, password },
  });

};

const loginUsuario = (req = request, res = response) => {
  // recupero los datos de la request
  const { email, password } = req.body;
  
  res.json({
    ok: true,
    msg: "login",
    user: { email, password },
  });
};

const revalidarToken = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
