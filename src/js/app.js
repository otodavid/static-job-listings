const roles = Array.from(document.querySelectorAll('li[data-role]'));
const languages = Array.from(document.querySelectorAll('li[data-languages]'));
const levels = Array.from(document.querySelectorAll('li[data-level]'));
const tools = Array.from(document.querySelectorAll('li[data-tools]'));
const filterBox = document.querySelector('.filter-box');
const filteredSkills = document.querySelector('.filtered-skills');
const clearAllBtn = document.querySelector('.clear');
const allJobs = Array.from(document.querySelectorAll('.job'));

const categories = [].concat(roles, languages, levels, tools);

categories.forEach(category => {
    category.addEventListener('click', () => {
        filterBox.classList.add('show');
        createFilterUI(category);
        filterJobs();
    })
})

const createFilterUI = function (filterName) {
    const filter = document.createElement('div');
    filter.classList.add('filter');

    const filterValue = document.createElement('span');
    filterValue.textContent = filterName.textContent;
    filterValue.classList.add('filter-name');

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-btn');

    filter.appendChild(filterValue);
    filter.appendChild(deleteBtn);
    filteredSkills.appendChild(filter);

    const removeFilter = Array.from(document.querySelectorAll('.delete-btn'));
    removeFilter.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            filterJobs();
            if(filteredSkills.childNodes.length < 1) {
                filterBox.classList.remove('show');
            }
        })
    })
}

const filterJobs = function () {
    //retrieve each job categories
    let   jobCategories = Array.from(document.querySelectorAll('.role-level-languages'));
 
    jobCategories = jobCategories.map(item => Array.from(item.children));

    // retrieve the name and first parent element of each job category
    const eachCategoryDetails = jobCategories.map(category => {
        return category.map(item => {
            return {
                name: item.textContent,
                company: item.parentElement.parentElement.parentElement
            }
        })
    })

    // this is to show all job-listing when a filter's delete button is clicked
    // the codes below it will filter through again based on the filters present in the filter box
    allJobs.forEach(job => job.classList.remove('hide'));

    // use the filters in the filterbox to filter through the job listing
    const filtersPresent = Array.from(document.querySelectorAll('.filter-name'));
    filtersPresent.forEach(filter => {
        eachCategoryDetails.forEach(category => {
            if (category.map(item => item.name)
            .includes(filter.textContent)) {
                return;
            }
            category.forEach(item => {
                item.company.classList.add('hide');
            })
        })
    })
}

const clearAllFilters = function () {
    while (filteredSkills.firstChild) {
        filteredSkills.removeChild(filteredSkills.firstChild);
    }

    allJobs.forEach(item => {
        item.classList.remove('hide');
    })

    filterBox.classList.remove('show');
}

clearAllBtn.addEventListener('click', clearAllFilters);