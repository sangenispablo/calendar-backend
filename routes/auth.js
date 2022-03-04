/* 
    Rutas de auth
    host + /api/auth
 */
const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

// Creamos un objeto Router
const router = Router();

router.post(
  "/new",
  [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("email", "Email obligatorio o formato incorrecto").isEmail(),
    check("password", "Password obligatorio o minimo de 4 caracteres").isLength(
      { min: 6 }
    ),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "Email obligatorio o formato incorrecto").isEmail(),
    check("password", "Password obligatorio o minimo de 4 caracteres").isLength(
      { min: 6 }
    ),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", revalidarToken);

module.exports = router;
