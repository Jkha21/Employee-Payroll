$(document).ready(function() {
    const $nameRef = $('#name-cnt');
    const $profileRef = $('[name="inputProfile"]');
    const $genderRef = $('[name="input"]');
    const $salaryRef = $('#salary-cnt');
    const $departmentRef = $('[name="inputCheckbox"]');
    const $submitBtnRef = $('#submitButton');
    const $dateRef = $('#date-cnt');
    const $monthRef = $('#month-cnt');
    const $yearRef = $('#year-cnt');
    const $notesRef = $('#notes-cnt');
    const $resetBtnRef = $('#resetButton');
    const $cancelBtnRef = $('#cancelButton');
    
    const $nameErrorLabel = $('#empDash-nullValuecheck-cnt');
    const $checkProfile = $('#empDash-checkProfile-cnt');
    const $checkDepartment = $('#empDash-checkDepartment-cnt');
    const $checkGender = $('#empDash-checkGender-cnt');
    const $checkSalary = $('#empDash-checkSalary-cnt');
    const $checkDate = $('#empDash-checkStartDate-cnt');
    const $checkNotes = $('#empDash-checkNotes-cnt');

    function resetForm() {
        $nameRef.val('');
        $profileRef.prop('checked', false);
        $genderRef.prop('checked', false);
        $departmentRef.prop('checked', false);
        $salaryRef.prop('selectedIndex', 0);
        $dateRef.prop('selectedIndex', 0);
        $monthRef.prop('selectedIndex', 0);
        $yearRef.prop('selectedIndex', 0);
        $notesRef.val('');
    }

    $submitBtnRef.on('click', function(e) {
        e.preventDefault();
        
        const nameValue = $nameRef.val();
        if (!nameValidator(nameValue)) {
            $nameErrorLabel.text("Wrong Input! Enter the name again.")
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;        
        } else {
            $nameErrorLabel.text('');
        }

        let selectedProfile = null;
        $profileRef.each(function() {
            if ($(this).is(':checked')) {
                selectedProfile = $(this).next('img').attr('src');
            }
        });
        if (!selectedProfile) {
            $checkProfile.text("Error! Select Profile")
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;
        } else {
            $checkProfile.text('');
        }

        let selectedGender = null;
        $genderRef.each(function() {
            if ($(this).is(':checked')) {
                selectedGender = $(this).next('label').text();
            }
        });
        if (!selectedGender) {
            $checkGender.text("Error! Select Gender")
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;
        } else {
            $checkGender.text('');
        }

        let selectedDepartmentObj = [];
        $departmentRef.each(function() {
            if ($(this).is(':checked')) {
                selectedDepartmentObj.push($(this).next('label').text());
            }
        });
        if (selectedDepartmentObj.length === 0) {
            $checkDepartment.text('Error! Select the department')
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;
        } else {
            $checkDepartment.text('');
        }

        let selectedSalary = $salaryRef.val();
        if ($salaryRef.prop('selectedIndex') === 0) {
            $checkSalary.text("Error! Select Salary Range")
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;
        } else {
            $checkSalary.text('');
        }

        let dateObj = {
            date: $dateRef.val(),
            month: $monthRef.val(),
            year: $yearRef.val()
        };
        
        if ($dateRef.prop('selectedIndex') === 0 || $monthRef.prop('selectedIndex') === 0 || $yearRef.prop('selectedIndex') === 0) {
            $checkDate.text("Error! Fill the Start Date")
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;
        } else {
            $checkDate.text('');
        }

        let notesContent = $notesRef.val();
        if (!notesContent) {
            $checkNotes.text("Error! Notes are empty")
                .css({ color: 'red', fontSize: '14px', fontWeight: 'bold' });
            return;
        } else {
            $checkNotes.text("");
        }
        
        const empObj = {
            name: nameValue,
            profile: selectedProfile,
            gender: selectedGender,
            department: selectedDepartmentObj,
            salary: selectedSalary,
            startDate: dateObj,
            notes: notesContent
        };

        $.ajax({
            url: 'http://localhost:3001/employees',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(empObj),
            success: function() {
                console.log('Data saved successfully');
                resetForm();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
            }
        });
    });

    $resetBtnRef.on('click', resetForm);
    
    $cancelBtnRef.on('click', function(e) {
        e.preventDefault();
        resetForm();
    });

    function nameValidator(name) {
        return /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(name);
    }
});
