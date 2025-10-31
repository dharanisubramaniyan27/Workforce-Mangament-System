document.addEventListener('DOMContentLoaded', function() {
    const datePicker = document.getElementById('date-picker');
    const selectedWeekSpan = document.getElementById('selected-week');
    const weekHeader = document.getElementById('week-header');
  
    // Add event listener to the date picker
    datePicker.addEventListener('change', function() {
        const selectedDate = new Date(datePicker.value);
      
        // Calculate the Monday of the selected week
        const monday = new Date(selectedDate);
        const day = monday.getDay();
        const differenceToMonday = day === 0 ? -6 : 1 - day; // if Sunday, move to previous Monday
        monday.setDate(monday.getDate() + differenceToMonday);
  
        // Update the week header and selected week range display
        updateWeekHeader(monday);
        updateWeekRangeDisplay(monday);
    });
  
    // Function to update the table header (weekdays)
    function updateWeekHeader(monday) {
        const options = { day: '2-digit', month: 'short' };
  
        for (let i = 1; i <= 7; i++) {
            const currentDay = new Date(monday);
            currentDay.setDate(monday.getDate() + i - 1);
            weekHeader.children[i].innerHTML = `${currentDay.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}<br>${currentDay.toLocaleDateString('en-GB', options)}`;
        }
    }
  
    // Function to update the displayed week range (Monday to Sunday)
    function updateWeekRangeDisplay(monday) {
        const options = { day: '2-digit', month: 'short' };
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
  
        const formattedStart = monday.toLocaleDateString('en-GB', options);
        const formattedEnd = sunday.toLocaleDateString('en-GB', options);
  
        selectedWeekSpan.innerText = `${formattedStart} - ${formattedEnd}`;
    }
    
    // Add event listener to make shifts editable
    const shifts = document.querySelectorAll('.shift.editable-morning, .shift.editable-afternoon, .shift.flexible');

    shifts.forEach(shift => {
        shift.addEventListener('click', function() {
            // Check if the cell is already in edit mode by checking if it contains input fields
            if (shift.querySelector('input')) return;

            editShift(shift);
        });
    });

    // Function to edit shift time
    function editShift(cell) {
        const currentText = cell.innerText.trim();
        const [startTime, endTime] = currentText.split(' - '); // split the shift into start and end time

        // Ensure the input values are in the correct "HH:MM" format for the time input fields
        const formattedStartTime = formatToTimeInput(startTime.trim());
        const formattedEndTime = formatToTimeInput(endTime.split(' ')[0].trim()); // split to remove "09 hrs."

        // Create input elements for editing
        const startInput = document.createElement('input');
        startInput.type = 'time';
        startInput.value = formattedStartTime; // Show the previously scheduled start time
        
        const endInput = document.createElement('input');
        endInput.type = 'time';
        endInput.value = formattedEndTime; // Show the previously scheduled end time

        // Replace the cell content with input fields
        cell.innerHTML = '';
        cell.appendChild(startInput);
        cell.appendChild(document.createTextNode(' - '));
        cell.appendChild(endInput);

        // Automatically save when Enter is pressed
        function saveShift() {
            const newStartTime = startInput.value;
            const newEndTime = endInput.value;
        
            // Determine the class based on the new start time
            const newClass = getShiftClass(newStartTime);
        
            // Update the cell content
            cell.className = `shift ${newClass}`; // Set the new class
            cell.innerHTML = `${newStartTime} - ${newEndTime} <br> 08 hrs.`; // Assuming 8 hours for the text
        
            // Re-enable the ability to edit again after saving
            cell.addEventListener('click', function() {
                if (!cell.querySelector('input')) {
                    editShift(cell);
                }
            });
        }
        
        // Helper function to determine the class based on start time
        function getShiftClass(startTime) {
            const hours = parseInt(startTime.split(':')[0], 10);
        
            if (hours >= 6 && hours < 14) {
                return 'editable-morning'; // Morning shift
            } else if (hours >= 14 && hours < 22) {
                return 'editable-afternoon'; // Afternoon shift
            } else {
                return 'flexible'; // Default to flexible if time doesn't match
            }
        }
        

        // Add event listeners to automatically save when Enter is pressed
        startInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if in a form
                saveShift();
            }
        });

        endInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if in a form
                saveShift();
            }
        });
    }

    // Helper function to format time (like "9:00" or "18:00") into the correct "HH:MM" format for input[type="time"]
    function formatToTimeInput(time) {
        let [hours, minutes] = time.split(':');

        // Ensure hours and minutes are two digits (e.g., "9:00" becomes "09:00")
        hours = hours.padStart(2, '0');
        minutes = minutes ? minutes.padStart(2, '0') : '00'; // Handle cases where minutes might be missing

        return `${hours}:${minutes}`;
    }
});