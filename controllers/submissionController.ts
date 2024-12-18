import { Request, Response } from 'express';
import * as SubmissionService from '../models/SubmissionService';
import * as EmailService from '../models/emailService';

// 1. Get all submissions
export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await SubmissionService.getAllSubmissions();
    res.status(200).json(submissions); // Return the list of submissions
  } catch (err) {
    res.status(500).json({ message: 'Error fetching submissions', error: err });
  }
};

// 2. Add a new submission
export const addSubmission = async (req: Request, res: Response) => {
  try {
    const { studentName, codepenLink, email } = req.body;

    const newSubmission = await SubmissionService.addNewSubmission(
      studentName,
      codepenLink,
      email
    );

    res.status(201).json({ message: 'Submission added successfully', newSubmission });
  } catch (err) {
    res.status(500).json({ message: 'Error adding submission', error: err });
  }
};

// 3. Update the status of a submission (pass/fail/resubmit)
export const updateSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedSubmission = await SubmissionService.updateSubmissionStatus(id, status);

    if (!updatedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Send email notification after status update
    let emailSubject = '';
    let emailText = '';

    if (status === 'pass') {
      emailSubject = 'Your submission has been approved';
      emailText = 'Congratulations! Your homework submission has been approved.';
    } else if (status === 'fail') {
      emailSubject = 'Your submission has been rejected';
      emailText = 'Unfortunately, your homework submission has been rejected. Please resubmit.';
    } else if (status === 'loading') {
      emailSubject = 'Your submission is being reviewed';
      emailText = 'Your homework submission is being reviewed by the teacher.';
    }

    await EmailService.sendEmail(updatedSubmission.email, emailSubject, emailText);

    res.status(200).json({ message: 'Status updated successfully', submission: updatedSubmission });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err });
  }
};