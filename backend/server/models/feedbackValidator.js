const z = require('zod');

const newFeedbackValidation = (data) => {
  const feedbackValidationSchema = z.object({
    Star: z.number().min(1, 'There must be at least 1 star'),
    Name: z.string().min(3, 'Name must be 3 characters or more'),
    Email: z.string().email('Please input a valid email'),
    IssueType: z.string(),
    Message: z.string().min(1, 'Message must be 1 or more characters').trim(),
  });

  return feedbackValidationSchema.safeParse(data);
};


module.exports.newFeedbackValidation = newFeedbackValidation;