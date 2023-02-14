const express = require ( 'express');
const expressJwt = require ( 'express-jwt');
const config = require ( '../../config/config');
const userRoutes = require ( './user.route');
const authRoutes = require ( './auth.route');


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/users', userRoutes);

router.use('/auth', authRoutes);



module.exports = router;
