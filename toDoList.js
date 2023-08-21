const incomplete = document.querySelector("#incomplete");
const complete = document.querySelector("#complete")

const toDoList = [
  // {item: 'Mow the lawn', completed: false},
  // {item: 'Clean the dishes', completed: true},
  // {item: "Shower", completed: true},
  // {item: "Take a nap", completed: false}
];

const renderToDoList = () => {

  const existingIncompleteList = document.querySelector("#incomplete-list");
  const existingCompleteList = document.querySelector("#complete-list");

  if (existingIncompleteList) {
    incomplete.removeChild(existingIncompleteList);
  }

  if (existingCompleteList) {
    complete.removeChild(existingCompleteList);
  }
  
  const incompleteListUl = document.createElement("ul");
  incompleteListUl.id = "incomplete-list";

  const completeListUl = document.createElement("ul");
  completeListUl.id = "complete-list";

  toDoList.forEach((activity, index) => {
    const chore = document.createElement("li");
    chore.textContent = activity.item;

    activity.completed ? completeListUl.appendChild(chore) : incompleteListUl.appendChild(chore);

    /* Longer version of ternary operator
    // if (activity.completed) {
    //   completeListUl.appendChild(chore);
    // } else {
    //   incompleteListUl.appendChild(chore);
    // }
    */

    chore.addEventListener("click", () => {
      if (activity.completed) {
        activity.completed = false;
        renderToDoList();
      } else {
        activity.completed = true;
        renderToDoList();
      }
    })
  })
  
  incomplete.appendChild(incompleteListUl);
  complete.appendChild(completeListUl);
}

const renderAddRemoveButtons = () => {

  const input = document.querySelector("#text-field");
  const addToListButton = document.querySelector("#btn-add");
  const removeFromListButton = document.querySelector("#btn-remove");

  
  addToListButton.addEventListener("click", () => {

    for (const activity of toDoList) {
      if (activity.item === input.value) {
        alert(`${input.value} is already on the list`);
        input.value = "";
        return;
      }
    }
    
    toDoList.push({item: input.value, completed: false});
    input.value = "";
    renderToDoList();
  })

  removeFromListButton.addEventListener("click", () => {
    
    for (let i = 0; i < toDoList.length; i++) {
      const activity = toDoList[i];

      if (input.value === activity.item) {
        toDoList.splice(i, 1);
        renderToDoList(); 
        input.value = "";
        return;
      }
    }

    alert(`${input.value} does not exist on the list`);
    input.value = "";
  })
}

renderToDoList();
renderAddRemoveButtons();