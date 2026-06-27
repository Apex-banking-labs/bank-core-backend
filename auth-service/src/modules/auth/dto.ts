export const signUpSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['firstName', 'lastName', 'email', 'password'],
            properties: {
                firstName: {
                    type: 'string',
                    minLength: 2
                },
                lastName:{
                    type: 'string',
                    minLength: 2
                },
                email: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                    minLength: 8
                }
            },
            additionalProperties: false
        }
    }
};