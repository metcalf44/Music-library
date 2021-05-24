const express = require('express');
const artistController = require('../controllers/artist');
const albumController = require('../controllers/album')
const router = express.Router();

router.get('/', artistController.read);
router.get('/:artistId', artistController.artistById);
router.post('/', artistController.create);
router.post('/:artistId/album', albumController.create)
router.patch('/:artistId', artistController.updateArtist);
router.delete('/:artistId', artistController.deleteArtist);

module.exports = router;
