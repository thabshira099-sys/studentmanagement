const studentForm=document.getElementById("studentForm");
const addName=document.getElementById("addName");
const addAge=document.getElementById("addAge");
const addCourse=document.getElementById("addCourse");
const addMark=document.getElementById("addMark");
const addButton=document.getElementById("addButton");
const studentList=document.getElementById("studentList");
let students=JSON.parse(localStorage.getItem("students")) || [];

addAge.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
addMark.addEventListener("input",function(){
    this.value=this.value.replace(/[^0-9]/g, '');
});
function savedStudents(){
    localStorage.setItem("students",JSON.stringify(students));
}
// let students=[];
studentForm.addEventListener("submit",async function(event) {

    event.preventDefault();

    const name = addName.value;
    const age = addAge.value;
    const course = addCourse.value;
    const mark = addMark.value;

    const student={
        name:name,
        age:age,
        course:course,
        mark:mark
    };
    const response=await fetch("http://localhost:3000/students",{
             method:"POST",
             headers:{
                "content-type":"application/json"
             },
             body:JSON.stringify(student)

    });
    if(response.ok){
        const newStudent=await response.json();

   
    
    students.push(newStudent);
    displayStudents();
    updateDashboard();
    savedStudents();
    studentForm.reset();
    console.log("student added succesfully");
    }
    else{
        console.log("failed to add student");
    }

});
function displayStudents(){
    studentList.innerHTML="";
students.forEach(function(student)
{
     studentList.innerHTML += `
    <tr>
    <td>${student.name}</td>
    <td>${student.age}</td>
    <td>${student.course}</td>
    <td>${student.mark}</td>
    <td>actions</td>
    </tr>
     `;
});
}
function updateDashboard(){
    addTotal.textContent=students.length;
    let totalmarks=0;
    students.forEach(function(student){
        totalmarks+=Number(student.mark);
    });
     let average = 0;

    if (students.length > 0) {
        average = totalmarks / students.length;
    }

   addAverage.textContent = average.toFixed(2);
   let highest=0;
   students.forEach(function(student){
    if(Number(student.mark) > highest){
        highest=Number(student.mark)
    }
    addHighest.textContent=highest;
   });
    
}
async function getStudents(){
    const response=await fetch("http://localhost:3000/students");
    students=await response.json();
    displayStudents();
    updateDashboard();
    
}
getStudents();
