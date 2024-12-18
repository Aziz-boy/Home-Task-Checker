import Submission, { ISubmission } from '../schema/SubmissionSchema';

// Service to get all submissions
export const getAllSubmissions = async (): Promise<ISubmission[]> => {
  try {
    return await Submission.find(); // Get all submissions from the database
  } catch (error) {
    throw new Error('Error fetching submissions');
  }
};

// Service to add a new submission
export const addNewSubmission = async (
  studentName: string,
  codepenLink: string,
  email: string
): Promise<ISubmission> => {
  try {
    const newSubmission = new Submission({
      studentName,
      codepenLink,
      email,
    });
    return await newSubmission.save(); // Save to database and return the new submission
  } catch (error) {
    throw new Error('Error adding submission');
  }
};

// Service to update a submission's status
export const updateSubmissionStatus = async (
  id: string,
  status: string
): Promise<ISubmission | null> => {
  try {
    return await Submission.findByIdAndUpdate(id, { status }, { new: true }); // Update the status and return the updated submission
  } catch (error) {
    throw new Error('Error updating submission status');
  }
};

export default Submission;