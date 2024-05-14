
module.exports = function (req, res, next) {
    const userRole = req.user.role
    if (userRole != "ADMIN" ) {
        return res.status(403).json({message: "Доступ запрещен"})
    }
    next()
}