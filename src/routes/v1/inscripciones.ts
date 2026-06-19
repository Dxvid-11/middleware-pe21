import { Request, Response, Router} from 'express';
// public router = new Router();
const router = Router(); 

//Post: estudianteId, materias (Arreglo), periodoId

router.post('/', (req: Request, res: Response, next) => {
    const {estudianteId, materias, periodoId} = req.body;


    if (!estudianteId || !materias.lenght || !periodoId) {
        console.error ("No existe el id del estudiante")
        res.status(400).json (
            {
                error: "Campos requeridos: estudianteId, materias, periodoId"
            }
        )
    }

    res.status(201).json ({
        version: 'v1',
        message: {
            estudianteId, materias, periodoId
        }
    })
});

export default router;