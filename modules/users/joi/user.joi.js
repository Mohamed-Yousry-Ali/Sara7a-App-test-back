const Joi = require("joi")

module.exports = {
    registerSchema: {
        body: Joi.object().keys({
            userName: Joi.string().min(3).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
                .required()
                .messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and include at least one letter and one number.',
                }),
            cPassword: Joi.string()
                .valid(Joi.ref("password"))
                .required()
                .messages({
                    'any.only': 'Passwords do not match.'
                }),
            phone: Joi.string().required(),
            address: Joi.string().required(),
            gender: Joi.string().valid("male", "female").required(),
            age: Joi.number().required(),
        })
    },
    loginSchema: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
                .required()
                .messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and include at least one letter and one number.',
                }),
        })
    },
    resetPasswordSchema: {
        body: Joi.object().keys({
            currentPassword: Joi.string().required(),
            newPassword: Joi.string()
                .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
                .required()
                .messages({
                    'string.pattern.base': 'Password must be at least 8 characters long and include at least one letter and one number.',
                }),
        })
    },
    addIdSchema: {
        body: Joi.object.keys({
            id: Joi.string().required()
        })
    },
    addNewAdminAndRemoveAdmin: {
        body: Joi.object.keys({
            email: Joi.string().email().required()
        })
    }
}