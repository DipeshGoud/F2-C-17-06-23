// Initialize the employee array
let employees = [];

let form = document.getElementById('employeeForm');
let messages = document.getElementById('messages');
let employeeList = document.getElementById('employeeList');

// Add event listener to the form
form.addEventListener('submit', formSubmission);

// Function to handle form submission
function formSubmission(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name').value.trim();
    const professionInput = document.getElementById('profession').value.trim();
    const ageInput = document.getElementById('age').value.trim();

    if (nameInput === "" || professionInput === "" || ageInput === "") {
        displayMessage('Error: Please fill in all the fields before adding an employee!', 'error');
        return;
    }

    const newEmployee = {
        id: generateId(),
        name: nameInput,
        profession: professionInput,
        age: parseInt(ageInput)
    };

    employees.push(newEmployee);
    form.reset();
    displayMessage('Employee added successfully.', 'success');
    renderEmployeeList();
}


// Function to Render & Display employee list
function renderEmployeeList() {

    employeeList.innerHTML = "";

    if (employees.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <p class="pre-list">You have 0 Employees</p>`;
        employeeList.appendChild(div);
    }

    employees.forEach((ele, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="display">
                <p>${index + 1}.</p>
                <p>Name: ${ele.name}</p>
                <p>Profession: ${ele.profession}</p>
                <p>Age: ${ele.age}</p>
            </div>
            <button class="deleteButton" data-id="${ele.id}" onclick="deleteEmployee('${ele.id}')">Delete</button>`;
        employeeList.appendChild(div);
    });
}

// Function to delete an employee
function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);

    displayMessage('Employee deleted!', 'error');
    renderEmployeeList();
}

// Function to generate a unique ID for each employee
function generateId() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

// Function to display messages
function displayMessage(message, className) {
    messages.innerHTML = `<p class="${className}">${message}</p>`;
}
