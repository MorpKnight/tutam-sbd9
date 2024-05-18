const express = require('express');
const router = express.Router();
const copypastaController = require('../controllers/Copypasta.controllers');

router.get('/get', copypastaController.getCopyPasta);
router.post('/create', copypastaController.createCopyPasta);
router.put('/update', copypastaController.updateCopyPasta);
router.delete('/delete/:content_id', copypastaController.deleteCopyPasta);
router.post('/verify-edit-perms', copypastaController.verifyEditPerms);
router.get('/get-details/:content_id', copypastaController.getCopyPastaDetail);

module.exports = router;