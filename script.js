const doc = document;

const name_input = doc.getElementById('name');
const email_input = doc.getElementById('email');
const grade_input = doc.getElementById('gpa');
const age_input = doc.getElementById('age');
const degree_input = doc.getElementById('degree');
const table = doc.getElementById('table-body');
const editBtn = doc.getElementById('edit-btn');
const addBtn = doc.getElementById('add-btn');

let editId;

// Using grade instead of gpa as it is mentioned in the question.
// I have used GPA in a lot of places, because i used GPA at first, then changed only the important variables to Grade. So there will be some variables / class names / ids that are still 'gpa'

const studentsArray = [{ id: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' }, { id: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' }, { id: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' } ];
let ID = 1;

if(studentsArray.length > 0){
    studentsArray.forEach(data => {
        createData(data);
    })
    ID = studentsArray.length+1;
}

function getData(event){
    event.preventDefault();
    const details = {
        id: ID,
        name: name_input.value,
        email: email_input.value,
        grade: grade_input.value,
        age: Number(age_input.value),
        degree: degree_input.value
    }
    studentsArray.push(details);
    createData(details);
    ID++;
}

const input = document.getElementById('search');
let timeout;
input.addEventListener('input', ()=>{
    clearTimeout(timeout);
    timeout = setTimeout(() =>{
        const userInput = input.value;
        search(studentsArray, userInput);
    }, 300);
});

function search(studentsArray, userInput){
    userInput = userInput.toLowerCase();
    if(userInput === undefined || userInput === ''){
        console.log('students Array: ', studentsArray);
        filter(studentsArray);
        return;
    }
    const filteredArray = studentsArray.filter(data => {
        return data.name.toLowerCase().includes(userInput) || data.email.toLowerCase().includes(userInput) || data.degree.toLowerCase().includes(userInput);
    })
    console.log('filtered Array: ', filteredArray);
    filter(filteredArray);
}

function filter(array){
    table.innerHTML = '';
    array.forEach(data => {
        if(data) createData(data);
    })
}

function createData(data){
    let tempID = data.id;
    const tableRow = doc.createElement('tr');
    tableRow.id = `id_${tempID}`;
    table.appendChild(tableRow);
    tableRow.innerHTML = `
        <td class="id">${data.id}</td>
        <td class="name">${data.name}</td>
        <td class="email">${data.email}</td>
        <td class="age">${data.age}</td>
        <td class="grade">${data.grade}</td>
        <td class="degree">
        ${data.degree}
        <div class="hoverButtons">
            <button type="button" class="hover-btn edit" onclick="editDetails(${tempID})">
                <i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>
            </button>
            <button type="button" class="hover-btn delete" onclick="deleteDetails(${tempID})">
                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
            </button>
        </div>
        </td>`
}


function deleteDetails(id){
    const deleteRow = doc.getElementById(`id_${id}`);
    table.removeChild(deleteRow);
    delete studentsArray[id-1];
}

function editDetails(id){
    editId = id;
    editBtn.style.display = 'block';
    addBtn.style.display = 'none';

    const currentData = studentsArray[id-1];
    name_input.value = currentData.name;
    email_input.value = currentData.email;
    grade_input.value = currentData.grade;
    age_input.value = currentData.age;
    degree_input.value = currentData.degree;
}

function updateData(){
    const updateRow = doc.getElementById(`id_${editId}`);
    const name = name_input.value;
    const email = email_input.value;
    const grade = grade_input.value;
    const age = Number(age_input.value);
    const degree = degree_input.value;
    updateRow.innerHTML = `
    <td class="id">${editId}</td>
    <td class="name">${name}</td>
    <td class="email">${email}</td>
    <td class="age">${age}</td>
    <td class="grade">${grade}</td>
    <td class="degree">
    ${degree}
    <div class="hoverButtons">
        <button type="button" class="hover-btn edit" onclick="editDetails(${editId})">
            <i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>
        </button>
        <button type="button" class="hover-btn delete" onclick="deleteDetails(${editId})">
            <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
        </button>
    </div>
    </td>`

    const oldData = studentsArray[editId-1];
    oldData.name = name;
    oldData.email = email;
    oldData.grade = grade;
    oldData.age = age;
    oldData.degree = degree;

    editId = undefined;
    editBtn.style.display = 'none';
    addBtn.style.display = 'block';
}