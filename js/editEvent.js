export async function modifyEvent(event) {
    const eventID = event.target.getAttribute("data-event-id");
    const elementsToBlur = document.querySelectorAll("body > *:not(form)");
    elementsToBlur.forEach(element => {
      element.classList.add("blur");
    });
    // fetch event data
    fetch(`http://localhost:3000/api/events/${eventID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        createForm(data, eventID);
      })
      .catch((error) => console.error(error));
  }
  
  function createForm(data, eventID) {
    const form = document.createElement("form");
    form.classList.add("modalForm");
    form.innerHTML = `
      <label for="name">Name</label>
      <input type="text" id="name" name="name" value="${data.name}">
      <label for="author">Author</label>
      <input type="text" id="author" name="author" value="${data.author}">
      <label for="description">Description</label>
      <textarea id="description" name="description">${data.description}</textarea>
      <div class="actions">
      <button type="submit" id="submit-form">Submit</button>
      <button type="button" id="cancel-button">Cancel</button>
      </div>
    `;
    document.body.appendChild(form);
    console.log(form);
    // get form inputs
    const nameInput = form.querySelector("#name");
    const authorInput = form.querySelector("#author");
    const descriptionInput = form.querySelector("#description");
  
    // handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = {
        name: nameInput.value,
        author: authorInput.value,
        description: descriptionInput.value,
      };
      submitForm(formData, eventID, form);
      removeBlur();
    });
  
    // handle cancel button click
    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", () => {
      removeBlur();
      form.remove();
    });
  }
  function removeBlur() {
    // remove blur effect from all elements
    const elementsToBlur = document.querySelectorAll("body > *:not(form)");
    elementsToBlur.forEach(element => {
      element.classList.remove("blur");
    });
  }
  
  function submitForm(formData, eventID, form) {
    fetch(`http://localhost:3000/api/events/${eventID}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.remove();
        } else {
          throw new Error("Failed to update event");
        }
      })
      .catch((error) => console.error(error));
  }