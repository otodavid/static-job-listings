class UI {
    constructor() {
        this.filteredSkills = document.querySelector('.filtered-skills');
    }

    // Display all job postings
    displayJobs(data) {
        let output = '';
        data.forEach(job => {
            // get individul languages for each job posting
            const languages = job.languages;
            let languageOutput = '';
            if (languages !== undefined) {
                languages.forEach(language => {
                    languageOutput +=
                        `<li class='filter language'>${language}</li>`;
                })
            }

            // get individual tools for each job posting
            const tools = job.tools;
            let toolsOutput = '';
            if (tools !== undefined) {
                tools.forEach(tool => {
                    toolsOutput +=
                        `<li class='filter tool'>${tool}</li>`
                })
            }

            // concatenate all job posting
            output +=
                `<div class="job">
                    <div class="logo">
                        <img src="${job.logo}" alt="photosnap logo">
                    </div>
        
                    <div class="job-details">
                        <div class="priority">
                            <p class="company">${job.company}</p>
                            ${job.new ? "<span>New!</span>" : ''}
                            ${job.featured ? "<span>Featured</span>" : ''}
                        </div>
                        <h3 class="job-title">${job.position}
                        </h3>
                        <p class="type-location">
                            ${job.postedAt}<span>.</span>
                            ${job.contract}<span>.</span>
                            ${job.location}
                        </p>
                    </div>
        
                    <div class="skills">
                        <ul class="role-level-languages">
                            <li class='filter role'>${job.role}</li>
                            <li class='filter level'>${job.level}</li>
                            ${languageOutput}
                            ${toolsOutput}
                        </ul>
                    </div>
                </div>`
        });

        document.querySelector('.job-listings').innerHTML = output;
    }

    // display Filter Box
    showFilterBox(criteria) {
        const filterBox = document.querySelector('.filter-box');
        filterBox.classList.add('show');

        // create UI for filter being added to the filter box
        this.createFilterUI(criteria);

        this.filterJobs();
    }

    filterJobs() {
        //  get what is present in the filter box and convert to array
        let filtersPresent = [...document.querySelectorAll('.filter-name')];

        // get filter(s) text
        filtersPresent = filtersPresent.map(item => item.textContent);

        // remove hide class before performing main filtering operation
        const jobs = document.querySelectorAll('.job');
        jobs.forEach(job => {
            job.classList.remove('hide');
        })

        /* 
            retrieve categories for each job posting and put each category set (one category set will be an array) in an array
         */
        let categories = [...document.querySelectorAll('.role-level-languages')];
        categories = categories.map(categorySet => {
            return [...categorySet.children].map(item => {
                return {
                    name: item.textContent,
                    company: item.parentElement.parentElement.parentElement
                };
            });
        })

        // use the filters present to filter through each category set
        filtersPresent.forEach(filter => {
            categories.forEach(categorySet => {
                if (categorySet.map(item => item.name)
                    .includes(filter)) {
                    return;
                }
                // put the hide class on any one category set elements
                categorySet[0].company.classList.add('hide');
            })
        })
    }

    // create UI filter in filter box
    createFilterUI(criteria) {
        const filter = document.createElement('div');
        filter.classList.add('filter');

        // create filter text
        const filterValue = document.createElement('span');
        filterValue.append(document.createTextNode(criteria));
        filterValue.classList.add('filter-name');

        // create delete button for filter
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');

        filter.appendChild(filterValue);
        filter.appendChild(deleteBtn);

        this.filteredSkills.appendChild(filter);
    }

    // clear all filters from filter box
    clearFilterBox() {
        this.filteredSkills.innerHTML = '';
        this.filteredSkills.parentElement.classList.remove('show');

        // display all the data after clearing
        this.filterJobs();
    }

    // remove a single filter
    clearSingleFilter(button) {
        if (this.filteredSkills.children.length < 1) {
            this.clearFilterBox();
        } else {
            button.parentElement.remove();
            this.filterJobs();
        }
    }
}
