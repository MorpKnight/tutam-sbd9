const { pool } = require('../config/db');

exports.getCopyPasta = async () => {
    try {
        const copypasta = await pool.query('SELECT * FROM copypasta');
        // map so only content and copypasta_id is returned
        return { message: 'Copypasta found', copypasta: copypasta.rows.map(({ content, copypasta_id }) => ({ content, copypasta_id })) };
    } catch (error) {
        return { message: 'Error finding copypasta', error: error.message };
    }
};

exports.createCopyPasta = async (body) => {
    try {
        const { content } = body;
        if (!content) throw new Error('Missing required fields');

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const copypasta = await pool.query('INSERT INTO copypasta (content, code) VALUES ($1, $2) RETURNING *', [content, code]);
        return { message: 'Copypasta created', copypasta: copypasta.rows[0] };
    } catch (error) {
        return { message: 'Error creating copypasta', error: error.message };
    }
};

exports.updateCopyPasta = async (body) => {
    try {
        const { content_id, content, code } = body;
        if (!content_id || !content || !code) throw new Error('Missing required fields');
        const copypasta = await pool.query('UPDATE copypasta SET content = $1, updated_at = NOW() WHERE copypasta_id = $2 AND code = $3 RETURNING *', [content, content_id, code]);
        return { message: 'Copypasta updated', copypasta: copypasta.rows[0].map(({ content, copypasta_id }) => ({ content, copypasta_id })) };
    } catch (error) {
        return { message: 'Error updating copypasta', error: error.message };
    }
};

exports.deleteCopyPasta = async (params, body) => {
    try {
        const { content_id } = params;
        const { code } = body;
        if (!content_id || !code) throw new Error('Missing required fields');
        const copypasta = await pool.query('DELETE FROM copypasta WHERE copypasta_id = $1 AND code = $2 RETURNING *', [content_id, code]);
        if (copypasta.rows.length === 0) throw new Error('Copypasta not found');

        return { message: 'Copypasta deleted', copypasta: copypasta.rows[0] };
    } catch (error) {
        return { message: 'Error deleting copypasta', error: error.message };
    }
};

exports.getCopyPastaDetail = async (params) => {
    try {
        const { content_id } = params;
        if (!content_id) throw new Error('Missing required fields');
        const copypasta = await pool.query('SELECT * FROM copypasta WHERE copypasta_id = $1', [content_id]);
        if (copypasta.rows.length === 0) throw new Error('Copypasta not found');

        return { message: 'Copypasta found', copypasta: copypasta.rows.map(({ content, copypasta_id }) => ({ content, copypasta_id }))[0] };
    } catch (error) {
        return { message: 'Error finding copypasta', error: error.message };
    }
}

exports.verifyEditPerms = async (body) => {
    try {
        const { content_id, code } = body;
        if (!content_id || !code) throw new Error('Missing required fields');
        const copypasta = await pool.query('SELECT * FROM copypasta WHERE copypasta_id = $1 AND code = $2', [content_id, code]);
        if (copypasta.rows.length === 0) throw new Error('Copypasta not found');

        return { message: 'Copypasta found', copypasta: copypasta.rows[0] };
    } catch (error) {
        return { message: 'Error finding copypasta', error: error.message };
    }
} 