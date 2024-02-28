const z = require('zod');

const tournamentValidation = data => {
    const tournamentValidationSchema = z.object({
        locationPark: z.string().min(1, 'Location Park is required'),
        locationSegment: z.string().min(1, 'Location Segment is required'),
        startDate: z.date().min(new Date(), 'Start Date cannot be in the past'),
        endDate: z.date().min(new Date(), 'End Date cannot be in the past'),
        gender: z.string().min(1, 'Gender is required'),
        age: z.string().min(1, 'Age is required')
    });
    return tournamentValidationSchema.safeParse(data);
};

module.exports.tournamentValidation = tournamentValidation;
