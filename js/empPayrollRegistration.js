const nameRef = document.getElementById('name-cnt');
const profileRef = document.getElementsByName('inputProfile')
const genderRef = document.getElementsByName('input');
const salaryRef = document.getElementById("salary-cnt");
const departmentRef = document.getElementsByName('inputCheckbox');
const submitBtnRef = document.getElementById('submitButton');
const dateRef = document.getElementById('date-cnt');
const monthRef = document.getElementById('month-cnt');
const yearRef = document.getElementById('year-cnt');
const notesRef = document.getElementById('notes-cnt');
const resetBtnRef = document.getElementById("resetButton");
const cancelBtnRef = document.getElementById("cancelButton");


function resetform(){
    nameRef.value = "";
    profileRef.forEach(radio => radio.checked = false);
    genderRef.forEach(radio => radio.checked = false);
    departmentRef.forEach(checkbox => checkbox.checked = false);
    salaryRef.selectedIndex = 0;
    dateRef.selectedIndex = 0;
    monthRef.selectedIndex = 0;
    yearRef.selectedIndex = 0;
    notesRef.value = "";    
}

submitBtnRef.addEventListener('click', (e) =>{
    e.preventDefault();
    const nameValue = nameRef.value;
    let selectedProfile = null;
    for(let element of profileRef){
        if(element.checked){
            selectedProfile = element.nextElementSibling.getAttribute('src')
        }
    }
    let selectedGender = null;
    for(let element of genderRef){
        if(element.checked){
            selectedGender = element.nextElementSibling.textContent;
        }
    };

    let selectedSalary = salaryRef.value;
    let selectedDepartmentObj = [];
    for(let element of departmentRef){
        if(element.checked){
            selectedDepartmentObj.push(element.nextElementSibling.textContent);
        }
    }

    let dateObj = {
        date: dateRef.value,
        month: monthRef.value,
        year: yearRef.value
    }
    
    
    let notesContent = notesRef.value;
    const empObj = {
        name: nameValue,
        profile: selectedProfile,
        gender: selectedGender,
        department: selectedDepartmentObj,
        salary: selectedSalary,
        startDate: dateObj,
        notes: notesContent
    }
    
    let empRecordList = JSON.parse(localStorage.getItem('empDataList'))
    empRecordList?.length > 0 ? localStorage.setItem("empDataList", JSON.stringify(empObj)):
    localStorage.setItem("empDataList", JSON.stringify(empObj));
    empRecordList = localStorage.getItem('empDataList');
    console.log(empObj)
    resetform();
});





resetBtnRef.addEventListener('click', () =>{
  resetform();
})


cancelBtnRef.addEventListener('click', (e)=>{
    e.preventDefault();
    resetform();
})



// Error message validation
// UI changes
// Json server
// Jquery
// Practice Folder
