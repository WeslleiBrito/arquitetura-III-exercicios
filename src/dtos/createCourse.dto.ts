import z from 'zod'

export interface CreateCourseInputDTO {
    id: string,
    name: string,
    lessons: number
}

export interface CreateCourseOutputDTO {
    message: string,
    course: {
        id: string,
        name: string,
        lessons: number,
        createdAt: string
    }
}

export interface GetCourseOutputDTO {
    id: string,
    name: string,
    lessons: number,
    createdAt: string
}

export const CreateCourseSchema = z.object({
    id: z.string(
        {
            required_error: "'id' é obrigatório.",
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
    ),
    name: z.string(
        {
            required_error: "'name' é obrigatório.",
            invalid_type_error: "'name' deve ser do tipo string."
        }
    ).min(3,
        {
            message: "O 'name' deve ter no mínimo 3 caracters."
        }
    ),
    lessons: z.number(
        {
            required_error: "'lessons' é obrigatório.",
            invalid_type_error: "'lessons' deve ser do tipo number."
        }
    ).gt(0, { message: "O 'lessons' deve ser maior que zero." })
}).transform(data => data as CreateCourseInputDTO)

