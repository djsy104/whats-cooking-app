import express from 'express';
import {
  createLibrary,
  getLibraries,
  getSingleLibrary,
  updateLibrary,
  deleteLibrary,
} from '../controllers/libraryController.js';
import validateRequest from '../middleware/validateRequest.js';
import {
  createLibraryValidation,
  getSingleLibraryValidation,
  updateLibraryValidation,
  deleteLibraryValidation,
} from '../validations/libraryValidation.js';

const router = express.Router();

router
  .route('/')
  .post(createLibraryValidation, validateRequest, createLibrary)
  .get(getLibraries);
router
  .route('/:id')
  .get(getSingleLibraryValidation, validateRequest, getSingleLibrary)
  .delete(deleteLibraryValidation, validateRequest, deleteLibrary)
  .patch(updateLibraryValidation, validateRequest, updateLibrary);

export default router;
