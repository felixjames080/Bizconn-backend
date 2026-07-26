router.post('/create', authMiddleware, reelController.createReel);

router.get('/feed', reelController.getFeed);

router.get('/:id', reelController.getReelById);

router.delete('/:id', authMiddleware, reelController.deleteReel);