import express from 'express';
import {
  createIngredient,
  getIngredients,
  getSingleIngredient,
} from '../controllers/ingredientController.js';
import validateRequest from '../middleware/validateRequest.js';
// import {
//   createLibraryValidation,
//   getSingleLibraryValidation,
//   updateLibraryValidation,
//   deleteLibraryValidation,
// } from '../validations/libraryValidation.js';

const router = express.Router();

router.route('/').post(createIngredient).get(getIngredients);
router.route('/:id').get(getSingleIngredient);

export default router;
