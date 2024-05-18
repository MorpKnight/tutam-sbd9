const copypastaServices = require('../services/Copypasta.services');

exports.getCopyPasta = async (req, res) => {
    try {
        const result = await copypastaServices.getCopyPasta();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.createCopyPasta = async (req, res) => {
    try {
        const result = await copypastaServices.createCopyPasta(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.updateCopyPasta = async (req, res) => {
    try {
        const result = await copypastaServices.updateCopyPasta(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.deleteCopyPasta = async (req, res) => {
    try {
        const result = await copypastaServices.deleteCopyPasta(req.params, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.getCopyPastaDetail = async (req, res) => {
    try {
        const result = await copypastaServices.getCopyPastaDetail(req.params);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.verifyEditPerms = async (req, res) => {
    try {
        const result = await copypastaServices.verifyEditPerms(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}