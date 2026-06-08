function validarHobbie(datos) {
    const errores = [];

    if (!datos.item || typeof datos.item !== 'string' || datos.item.trim().length < 3 || datos.item.trim().length > 4) {
        errores.push('El ítem es obligatorio y debe tener entre 3 y 4 caracteres');
    }

    if (!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length === 0) {
        errores.push('El nombre es obligatorio');
    }

    const clasificacionesValidas = ['safe', 'euclid', 'keter', 'thaumiel'];
    if (!datos.clasificacion || !clasificacionesValidas.includes(datos.clasificacion)) {
        errores.push('La clasificación no es válida');
    }

    return errores;
}

async function verificarYPrecargarSCPs() {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) as total FROM hobbies');
        if (rows[0].total === 0) {
            const scpsPredefinidos = [
                ['057', 'The Daily Grind', 'safe'],
                ['173', 'The Sculpture', 'euclid'],
                ['682', 'Hard-to-Destroy Reptile', 'keter'],
                ['3000', 'Ananta-Shesha', 'thaumiel']
            ];
            for (const scp of scpsPredefinidos) {
                await db.execute(
                    'INSERT INTO hobbies (item, nombre, clasificacion) VALUES (?, ?, ?)',
                    scp
                );
            }
        }
    } catch (error) {
        console.error('Error al precargar SCPs por defecto:', error.message);
    }
}
verificarYPrecargarSCPs();

router.get('/', async (req, res) => {
    try {
        const [hobbies] = await db.execute(
            'SELECT id, item, nombre, clasificacion, created_at, updated_at FROM hobbies ORDER BY id ASC'
        );

        res.json({
            status: 'success',
            data: hobbies,
            count: hobbies.length
        });
    } catch (error) {
        console.error('Error al listar SCPs:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [hobbies] = await db.execute(
            'SELECT id, item, nombre, clasificacion, created_at, updated_at FROM hobbies WHERE id = ?',
            [id]
        );

        if (hobbies.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `SCP con ID ${id} no encontrado`
            });
        }

        res.json({ status: 'success', data: hobbies[0] });
    } catch (error) {
        console.error('Error al obtener SCP:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        const errores = validarHobbie(req.body);
        if (errores.length > 0) {
            return res.status(400).json({
                status: 'error',
                message: errores.join('; ')
            });
        }

        const { item, nombre, clasificacion } = req.body;

        const [resultado] = await db.execute(
            'INSERT INTO hobbies (item, nombre, clasificacion) VALUES (?, ?, ?)',
            [item.trim(), nombre.trim(), clasificacion.trim().toLowerCase()]
        );

        const [nuevoHobbie] = await db.execute(
            'SELECT id, item, nombre, clasificacion, created_at FROM hobbies WHERE id = ?',
            [resultado.insertId]
        );

        res.status(201).json({
            status: 'success',
            data: nuevoHobbie[0]
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un SCP registrado con ese ítem'
            });
        }
        console.error('Error al crear SCP:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [existente] = await db.execute('SELECT id FROM hobbies WHERE id = ?', [id]);
        if (existente.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `SCP con ID ${id} no encontrado`
            });
        }

        const errores = validarHobbie(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join('; ') });
        }

        const { item, nombre, clasificacion } = req.body;

        await db.execute(
            'UPDATE hobbies SET item = ?, nombre = ?, clasificacion = ? WHERE id = ?',
            [item.trim(), nombre.trim(), clasificacion.trim().toLowerCase(), id]
        );

        const [actualizado] = await db.execute(
            'SELECT id, item, nombre, clasificacion, created_at, updated_at FROM hobbies WHERE id = ?',
            [id]
        );

        res.json({ status: 'success', data: actualizado[0] });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe otro SCP registrado con ese ítem'
            });
        }
        console.error('Error al actualizar SCP:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [hobbie] = await db.execute(
            'SELECT id, item FROM hobbies WHERE id = ?', [id]
        );

        if (hobbie.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `SCP con ID ${id} no encontrado`
            });
        }

        await db.execute('DELETE FROM hobbies WHERE id = ?', [id]);

        res.json({
            status: 'success',
            data: {
                eliminado: hobbie[0],
                mensaje: `SCP Item "${hobbie[0].item}" eliminado correctamente`
            }
        });
    } catch (error) {
        console.error('Error al eliminar SCP:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;