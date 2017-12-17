import{BaseService} from './Base.Service'

export const ApiConfig= {
    signUp: BaseService._baseServiceUrl+ "signup",
    login: BaseService._baseServiceUrl+ "login",
    forgotPassword: BaseService._baseServiceUrl+ "forgotPassword",
    restPassword: BaseService._baseServiceUrl+ "restPassword",
   

    projectList: BaseService._baseServiceUrl+ "project/getAll",
    saveProject: BaseService._baseServiceUrl+ "project/save",
    updateProject: BaseService._baseServiceUrl+ "project/update",
    getProjectById: BaseService._baseServiceUrl+ "project/get",
    deleteProject:BaseService._baseServiceUrl+ "project/delete",

    taskList: BaseService._baseServiceUrl+ "task/getAll",
    saveTask: BaseService._baseServiceUrl+ "task/save",
    updateTask: BaseService._baseServiceUrl+ "task/update",
    getTaskById: BaseService._baseServiceUrl+ "task/get",
    deleteTask:BaseService._baseServiceUrl+ "task/delete",

    rfiList: BaseService._baseServiceUrl+ "rfi/getAll",
    saveRfi: BaseService._baseServiceUrl+ "rfi/save",
    updateRfi: BaseService._baseServiceUrl+ "rfi/update",
    getRfiById: BaseService._baseServiceUrl+ "rfi/get",
    deleteRfi:BaseService._baseServiceUrl+ "rfi/delete",


}