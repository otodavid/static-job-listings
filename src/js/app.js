const app = () => {
    const skill = document.querySelectorAll('.skills li');
    const filteredSkill = document.querySelector('.filtered-skill');
    const filterBox = document.querySelector('.filter-box');
    const clearButton = document.querySelector('.clear');
  

    const skillArray = [].slice.call(skill);

    const createFilteredElement = () => {

    }

    skillArray.forEach(item => {
        item.addEventListener('click', () => {
            // show the filter box
            filterBox.classList.add('show');

            // create an element
            const filteredElement = document.createElement('div');
            const elementText = document.createElement('p');
            filteredElement.appendChild(elementText);
            elementText.textContent = item.textContent;

            const removeSign = document.createElement('span');
            removeSign.textContent = 'X';
            removeSign.classList.add('remove-skill');

            filteredElement.appendChild(removeSign);
            filteredElement.classList = 'filtered-jobs';


            // add element to the filter box
            filteredSkill.appendChild(filteredElement);


            // remove individual skill
            const removeSkill = document.querySelectorAll('.remove-skill');

        let removeSkillArray = [].slice.call(removeSkill);

        removeSkillArray.forEach(element => {
            console.log(removeSkillArray);
        
            element.addEventListener('click', () => {
                let elementParent = element.parentNode.parentNode;
                elementParent.removeChild(element.parentNode);
            })
        });
        });
    });


    clearButton.addEventListener('click', () => {
        // remove filtered skills
        while (filteredSkill.firstChild) {
            filteredSkill.removeChild(filteredSkill.firstChild);
        }

        // remove the filter box
        filterBox.classList.remove('show');
    })

}

app();