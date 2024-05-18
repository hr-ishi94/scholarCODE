export const initialstate = {
    // list all the users
    userList :{
        users : [],
        status: 'idle',
        error:''
    },
    // list all the mentors
    mentorsList:{
        mentors :[],
        status:'idle',
        error:''
    },
    // list all the single mentor
    mentorDetails:{
        mentor:[],
        status:'idle',
        error:''
    },
    // list all the single user
    userDetails:{
        user:[],
        status:'idle',
        error:''
    },
    // list all courses
    coursesList:{
        courses:[],
        status:'idle',
        error:''
    },
    // List details of single course
    courseDetails:{
        course:[],
        status:'idle',
        error:''
    },
    // list all categories
    categoriesList:{
        categories:[],
        status:'idle',
        error:''
    },
    // list single category courses
    categoryDetails:{
        category:[],
        status:'idle',
        error:''
    },
    // list all tasks
    taskList:{
        tasks:[],
        status:'idle',
        error:''
    },
    // show single task
    tasks:{
        task:[],
        status:'idle',
        error:''
    },
    AdminToken:{
        access: null,
        refresh: null,
        is_authenticated: false,
        is_superuser: false,
        type: null,
        registerSuccess: null,
    },
    MentorToken:{
        access: null,
        refresh: null,
        is_authenticated: false,
        is_superuser: false,
        type: null,
        registerSuccess: null,
    },
    UserToken:{
        access: null,
        refresh: null,
        is_authenticated: false,
        is_superuser: false,
        type: null,
        registerSuccess: null,
    },
}