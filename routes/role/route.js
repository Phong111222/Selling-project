const express = require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const roleController = require('../../controller/roleController');
const { authorize } = require('../../middlewares/authorize');
const router = express.Router();

router
  .route('/')
  .get(authMiddleware, authorize('guest'), roleController.getAllRole)
  .post(authMiddleware, roleController.createNewRole);

router.patch('/:id', authMiddleware, roleController.updateRoleById);

router.delete('/:id', authMiddleware, roleController.deleteRoleById);

module.exports = router;
