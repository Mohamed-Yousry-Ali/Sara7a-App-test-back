const roles = require("../../enum/roles");
const adminPolicy = require("./adminPolicy")
const userPolicy = require("./userPolicy")
const managerPolicy = require("./managerPolicy")
const opts = {
    [roles.ADMIN]: {
        can: adminPolicy
    },

    [roles.USER]: {
        can: userPolicy
    },

    [roles.MANAGER]: {
        can: managerPolicy
    },
}

module.exports = opts