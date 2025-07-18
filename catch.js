function showLogs() {
    const list = document.getElementById('catchLogs');
    list.innerHTML = '';
    let logs = JSON.parse(localStorage.getItem('catchLogs') || '[]');
    if(logs.length === 0) {
        list.innerHTML = '<li class="list-group-item">No catches logged yet.</li>';
    } else {
        logs.forEach(log => {
            let item = document.createElement('li');
            item.className = 'list-group-item';
            item.innerText = `${log.time}: ${log.species} - ${log.weight} kg`;
            list.appendChild(item);
        });
    }
}

document.getElementById('catchForm').addEventListener('submit', function(e){
    e.preventDefault();
    const species = document.getElementById('species').value;
    const weight = document.getElementById('weight').value;
    const log = {species, weight, time: new Date().toLocaleString()};
    let logs = JSON.parse(localStorage.getItem('catchLogs') || '[]');
    logs.push(log);
    localStorage.setItem('catchLogs', JSON.stringify(logs));
    showLogs();
    document.getElementById('species').value = '';
    document.getElementById('weight').value = '';
});

showLogs();
