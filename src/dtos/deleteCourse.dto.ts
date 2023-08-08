import z from 'zod'


export interface DeleteCourseInputDTO {
    idToDelete: string
}

export interface DeleteCourseOutputDTO {
    message: string,
    course: {
        id: string,
        name: string,
        lessons: number,
        createdAt: string
    }
}

export const DeleteCourseSchema = z.object(
    {
        idToDelete: z.string().min(4, { message: "O 'id' deve ter no mínimo 4 caracteres." }).max(4, "O 'id' deve ter no máximo 4 caracteres.")
    }
)