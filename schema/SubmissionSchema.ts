import mongoose, { Schema, Document } from 'mongoose';

// Interface for TypeScript to define the data structure
export interface ISubmission extends Document {
  studentName: string;
  codepenLink: string;
  email: string;
  status: string;
  submissionDate: Date;
}

// Schema for the Submission model
const SubmissionSchema: Schema = new Schema(
  {
    studentName: { type: String, required: true },
    codepenLink: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'loading' }, // Default status
    submissionDate: { type: Date, default: Date.now }, // Automatically set to the current date
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Export the model based on the schema
const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;
