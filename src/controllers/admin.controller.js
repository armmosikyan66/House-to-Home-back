class AdminController {
    async createPrd(req, res, next) {
        try {
            res.json({success: req.files.map((file) => `/uploads/${file.filename}`)})
        } catch (e) {
            next(e)
        }
    }
}

export default new AdminController();