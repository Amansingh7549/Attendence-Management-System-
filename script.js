let teachers = []; // Mock teacher data
let attendanceRecords = []; // Mock attendance data

// Add Teacher
document.getElementById('addTeacherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    teachers.push({ id: Date.now(), name, email });
    loadAttendanceTable();
    alert('Teacher added successfully!');
    this.reset();
});

// Load Attendance Table
function loadAttendanceTable() {
    const tbody = document.querySelector('#attendanceTable tbody');
    tbody.innerHTML = '';
    teachers.forEach(teacher => {
        const row = `
            <tr>
                <td>${teacher.name}</td>
                <td>
                    <input type="checkbox" data-id="${teacher.id}">
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Submit Attendance
document.getElementById('attendanceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const checkboxes = document.querySelectorAll('#attendanceTable tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const teacher = teachers.find(t => t.id == checkbox.dataset.id);
        if (teacher) {
            attendanceRecords.push({
                date,
                teacherName: teacher.name,
                status: checkbox.checked ? 'Present' : 'Absent'
            });
        }
    });

    loadAttendanceRecords();
    alert('Attendance submitted successfully!');
});

// Load Attendance Records
function loadAttendanceRecords() {
    const tbody = document.getElementById('attendanceRecords');
    tbody.innerHTML = '';
    attendanceRecords.forEach(record => {
        const row = `
            <tr>
                <td>${record.date}</td>
                <td>${record.teacherName}</td>
                <td>${record.status}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
