document.getElementById('leaveForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const leaveDate = document.getElementById('leaveDate').value;
    const leaveReason = document.getElementById('leaveReason').value;

    if (leaveDate && leaveReason) {
        document.getElementById('message').innerText = `Leave request submitted for ${leaveDate}. Reason: ${leaveReason}`;
    } else {
        document.getElementById('message').innerText = `Please fill out all fields.`;
    }
});