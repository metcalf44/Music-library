const express = require('express');
const albumController = require('../controllers/album');
const router = express.Router();

router.get('/', albumController.read);
router.get('/:albumId', albumController.readById);

router.post('/artist/:artistId/album', albumController.create)

router.patch('/:albumId', albumController.updateAlbum);

router.delete('/:albumId', albumController.deleteAlbum);

module.exports = router;
