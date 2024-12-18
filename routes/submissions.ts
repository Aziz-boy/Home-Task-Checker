import { Router } from 'express';
import { getSubmissions, addSubmission, updateSubmission } from '../controllers/submissionController';
import Submission from '../models/SubmissionService';

const router = Router();

// Route for the student dashboard (rendering the student submission form)
router.get('/student-dashboard', async (req, res) => {
  try {
     const submissions = await Submission.find();
     res.render('studentDashboard', { submissions }); // Pass submissions to the EJS template
  } catch(err) {
    console.error('Error fetching submissions:', err);
    res.status(500).send('Error fetching submissions');
  }
});


// Route to get all submissions for the teacher dashboard
router.get('/teacher-dashboard', async (req, res) => {
  try {
    const submissions = await Submission.find(); // Fetch all submissions from DB
    res.render('teacherDashboard', { submissions }); // Render the teacher dashboard and pass submissions data
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).send('Error fetching submissions');
  }
});

// Route to add a new submission
router.post('/', addSubmission);

// Route to update the status of a submission (approve, reject, resubmit)
router.put('/:id', updateSubmission);

// Route to update submission status via the teacher dashboard
router.get('/update/submission/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.query; // ?status=pass/fail/resubmit

  try {
    // Update the status of the submission
    const submission = await Submission.findByIdAndUpdate(id, { status }, { new: true });

    if (!submission) {
      return res.status(404).send('Submission not found');
    }

    // Redirect back to the teacher dashboard
    res.redirect('/api/submissions/teacher-dashboard');
  } catch (err) {
    console.error('Error updating submission:', err);
    res.status(500).send('Error updating submission');
  }
});

export default router;
