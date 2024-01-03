const z = require('zod')

const newFeedbackValidation = (data) => {
    const feedbackValidationSchema = z.object({
        Name : z.string().min(3, 'name must be 3 characters or more'),
        Email: z.string().email('Please Input a valid email'),
        Message: z.string().min(1, 'message must be 1 or more characters').trim(),
      });

      return feedbackValidationSchema.safeParse(data)
    };

    module.exports.newFeedbackValidation = newFeedbackValidation;