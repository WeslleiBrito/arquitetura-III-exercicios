import { CourseDatabase } from "../database/CourseDatabase"
import { CreateCourseInputDTO, CreateCourseOutputDTO, GetCourseOutputDTO } from "../dtos/createCourse.dto"
import { DeleteCourseInputDTO, DeleteCourseOutputDTO } from "../dtos/deleteCourse.dto"
import { EditCourseInputDTO, EditCourseOutputDTO } from "../dtos/editCourse.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { CourseDB } from "../models/Course"
import { Course } from "../models/Course"

export class CourseBusiness {
  public getCourses = async (input: any): Promise<GetCourseOutputDTO[]> => {
    const { q } = input

    const courseDatabase = new CourseDatabase()
    const coursesDB = await courseDatabase.findCourses(q)

    const courses: Course[] = coursesDB.map((courseDB) => new Course(
      courseDB.id,
      courseDB.name,
      courseDB.lessons,
      courseDB.created_at
    ))

    const output: GetCourseOutputDTO[] = courses.map(course => ({
      id: course.getId(),
      name: course.getName(),
      lessons: course.getLessons(),
      createdAt: course.getCreatedAt()
    }))

    return output
  }

  public createCourse = async (input: CreateCourseInputDTO): Promise<CreateCourseOutputDTO> => {
    const { id, name, lessons } = input

    const courseDatabase = new CourseDatabase()
    const courseDBExists = await courseDatabase.findCourseById(id)

    if (courseDBExists) {
      throw new BadRequestError("'id' já existe")
    }

    const newCourse = new Course(
      id,
      name,
      lessons,
      new Date().toISOString()
    )

    const newCourseDB: CourseDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      lessons: newCourse.getLessons(),
      created_at: newCourse.getCreatedAt()
    }

    await courseDatabase.insertCourse(newCourseDB)

    const output: CreateCourseOutputDTO = {
      message: "Curso registrado com sucesso",
      course: {
        id: newCourse.getId(),
        name: newCourse.getName(),
        lessons: newCourse.getLessons(),
        createdAt: newCourse.getCreatedAt()
      }
    }

    return output
  }

  public editCourse = async (input: EditCourseInputDTO): Promise<EditCourseOutputDTO> => {
    const {
      idToEdit,
      id,
      name,
      lessons
    } = input



    const courseDatabase = new CourseDatabase()
    const courseToEditDB = await courseDatabase.findCourseById(idToEdit)

    if (!courseToEditDB) {
      throw new NotFoundError("'id' para editar não existe")
    }

    const course = new Course(
      courseToEditDB.id,
      courseToEditDB.name,
      courseToEditDB.lessons,
      courseToEditDB.created_at
    )

    id && course.setId(id)
    name && course.setName(name)
    lessons && course.setLessons(lessons)

    const updatedCourseDB: CourseDB = {
      id: course.getId(),
      name: course.getName(),
      lessons: course.getLessons(),
      created_at: course.getCreatedAt()
    }

    await courseDatabase.updateCourse(idToEdit, updatedCourseDB)

    const output: EditCourseOutputDTO = {
      message: "Curso editado com sucesso",
      course: {
        id: course.getId(),
        name: course.getName(),
        lessons: course.getLessons(),
        createdAt: course.getCreatedAt()
      }
    }

    return output
  }

  public deleteCourse = async (input: DeleteCourseInputDTO): Promise<DeleteCourseOutputDTO> => {
    const { idToDelete } = input

    const courseDatabase = new CourseDatabase()
    const courseToDeleteDB = await courseDatabase.findCourseById(idToDelete)

    if (!courseToDeleteDB) {
      throw new NotFoundError("'id' para deletar não existe")
    }

    const course = new Course(
      courseToDeleteDB.id,
      courseToDeleteDB.name,
      courseToDeleteDB.lessons,
      courseToDeleteDB.created_at
    )

    await courseDatabase.deleteCourseById(courseToDeleteDB.id)

    const output: DeleteCourseOutputDTO = {
      message: "Curso deletado com sucesso",
      course: {
        id: course.getId(),
        name: course.getName(),
        lessons: course.getLessons(),
        createdAt: course.getCreatedAt()
      }
    }

    return output
  }
}