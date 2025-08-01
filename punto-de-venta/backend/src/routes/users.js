const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Registro de usuario
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
], usersController.registerUser);

// Login de usuario
router.post('/login', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').exists()
], usersController.loginUser);

// Debug endpoint
router.get('/debug', usersController.debugUsers);

// Obtener todos los usuarios (solo admin)
router.get('/', usersController.getAllUsers);

// Obtener usuario por ID
router.get('/:id', auth, usersController.getUserById);

// Actualizar usuario
router.put('/:id', [
    auth,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un email válido').isEmail()
], usersController.updateUser);

// Eliminar usuario
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router;