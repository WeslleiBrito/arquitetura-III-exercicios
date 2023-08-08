import z from 'zod'

export interface EditCourseInputDTO {
    idToEdit: string,
    id?: string,
    name?: string,
    lessons?: number
}

export interface EditCourseOutputDTO {
    message: string,
    course: {
        id: string,
        name: string,
        lessons: number,
        createdAt: string
    }
}

export const EditCourseSchema = z.object(
    {
        idToEdit: z.string(
            {
                required_error: "O 'idToEdit' é obrigatório.",
                invalid_type_error: "'idToEdit' deve ser do tipo string."
            }
        ).min(4,
            {
                message: "O 'id' deve ter no mínimo 4 caracters."
            }
        ).max(4,
            {
                message: "O 'id' deve ter no máximo 4 caracters."
            }
        ),
        id: z.string(
            {
                invalid_type_error: "'id' deve ser do tipo string."
            }
        ).min(4,
            {
                message: "O 'id' deve ter no mínimo 4 caracters."
            }
        ).max(4,
            {
                message: "O 'id' deve ter no máximo 4 caracters."
            }
        ).optional(),
        name: z.string(
            {
                invalid_type_error: "'name' deve ser do tipo string."
            }
        ).min(3,
            {
                message: "O 'name' deve ter no mínimo 3 caracters."
            }
        ).optional(),
        lessons: z.number(
            {
                invalid_type_error: "'lessons' deve ser do tipo number."
            }
        ).gt(0, { message: "O 'lessons' deve ser maior que zero." }).optional()
    }
).transform(data => data as EditCourseInputDTO)