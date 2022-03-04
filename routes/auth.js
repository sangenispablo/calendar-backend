/* 
    Rutas de auth
    host + /api/auth
 */
const { Router } = require("express");

// Creamos un objeto Router
const router = Router();

router.post("/new", (req, res) => {
  res.json({
    ok: true,
    msg: "registro",
  });
});

router.post("/", (req, res) => {
  res.json({
    ok: true,
    msg: "login",
  });
});

router.get("/renew", (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
});

module.exports = router;
