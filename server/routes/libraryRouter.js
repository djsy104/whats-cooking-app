import express from 'express';
import {
  createLibrary,
  getLibraries,
  getSingleLibrary,
  updateLibrary,
  deleteLibrary,
} from '../controllers/libraryController.js';

const router = express.Router();

router.route('/').post(createLibrary).get(getLibraries);
router
  .route('/:id')
  .get(getSingleLibrary)
  .delete(deleteLibrary)
  .patch(updateLibrary);

export default router;
