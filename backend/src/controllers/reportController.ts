import { Request, Response } from 'express';
import Report from '../models/Report';

export const createReport = async (req: Request, res: Response) => {
  try {
    const { title, description, category, severity, latitude, longitude, photos } = req.body;

    if (!latitude || !longitude || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ message: 'Location and image are required!' });
    }

    const report = await Report.create({
      title, description, category, severity, latitude, longitude, photos
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};
