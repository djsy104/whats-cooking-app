import { query } from '../config/db.js';
import { StatusCodes } from 'http-status-codes';

export const createLibrary = async (req, res) => {
  return res.send('Create library');
};

export const getLibraries = async (req, res) => {
  return res.send('Get libraries');
};

export const getSingleLibrary = async (req, res) => {
  return res.send('Get library');
};

export const updateLibrary = async (req, res) => {
  return res.send('Update library');
};

export const deleteLibrary = async (req, res) => {
  return res.send('Delete library');
};
