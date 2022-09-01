// Init JobPosting
const jobPosting = new JobPosting();

// Init UI
const ui = new UI();

jobPosting.getJobs()
    .then(data => {
        ui.displayJobs(data);;
        appEvents();

    })
    .catch(err => console.log(err));

function appEvents() {
    // general user interactions event
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter')) {
            ui.showFilterBox(e.target.textContent);
        }

        // delete filter event
        const deleteFilter = document.querySelectorAll('.delete-btn');
        deleteFilter.forEach(button => {
            button.addEventListener('click', (e) => {
                ui.clearSingleFilter(e.target);
            })
        })

        // clear all filters event 
        const clearFilters = document.querySelector('.clear');
        clearFilters.addEventListener('click', () => {
            ui.clearFilterBox()
        })
    })
}