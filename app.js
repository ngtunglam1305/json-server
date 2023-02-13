var listCoursesBlock = document.querySelector("#list-courses")
var coursesApi = "http://localhost:3000/courses/"

function start() {
    getCourses(renderCourses)

    handleCreateForm()
}

start()
// Function

function createCourse(data, cb) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi, options)
        .then(function (response) {
            response.json()
        })
        .then(cb)
}

function getCourses(cb) {
    fetch(coursesApi)
        .then(function(response) {
            return response.json()
        })
        .then(cb)
}
function renderCourses(course) {
    var html = course.map(function(course) {
        return `<li>
                    <h4>${course.name}</h4>
                    <span>Được tạo bởi: ${course.author}</span><br>
                    <button>&times;</button>
                </li>`
    })
    listCoursesBlock.innerHTML = html.join('')
}
function handleCreateForm() {
    var creatBtn = document.querySelector('#create')
    creatBtn.onclick = function() {
        var name = document.querySelector('input[name="name"').value;
        var author = document.querySelector('input[name="author"').value;
        
        var formData = {
            name: name,
            author: author
        }
        createCourse(formData, function() {
            getCourses(renderCourses)
        })
    }
}