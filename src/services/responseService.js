module.exports = {
    handleSuccess: (req, res, data, template = null) => {
        if (req.accepts('html') && template) {
            return res.render(template, data);
        }
        res.json({ status: "OK", ...data });
    },

    handleError: (req, res, error, template = null) => {
        console.error(error);
        
        if (req.accepts('html') && template) {
            return res.render(template, { error: error.message });
        }
        
        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message
        });
    }
};