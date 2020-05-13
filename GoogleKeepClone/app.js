class App{
    constructor(){
        console.log("app works!");
        this.notes = new Array(); // notes array


        //DOM - elements
        this.$form = document.querySelector('#form'); // we use $ to differentiate html elements as compared to data
        this.$notes = document.querySelector('#notes');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText =  document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');
        this.$formCloseButton = document.querySelector("#form-close-button");
        this.$placeHolder = document.querySelector('#placeholder');

        this.addEventListeners(); // to make sure all events are added when app starts up
    }

    //method where we add all event listeners used in our app

    addEventListeners(){
        document.body.addEventListener('click',event =>{
            this.handleFormClick(event);
        });
        // when we submit a form an automatic page refresh happens , default behaviour as usually make a request to a server
        // but we have to  prevent the default behaviour
        this.$form.addEventListener('submit',event => {
            event.preventDefault(); // prevents default refresh
            const title  = this.$noteTitle.value;
            const text = this.$noteText.value;
            // we basically need to verify if user has at least typed the note title or note text
            const hasNote = title || text;
            if(hasNote){
                //add note
                this.addNote({title,text}); // here we pass as object shorthand  because then order of passing wont matter
            }


        });

        // for close event
        this.$formCloseButton.addEventListener('click',event =>{
            event.stopPropagation(); // so that it doesnt trigger our click event on body 
            this.closeForm();
            // console.log("closed");
        });

    }

    handleFormClick(event){
        const isFormClicked  = this.$form.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNote =  title || text;
        if(isFormClicked){
            // open the form
            this.openForm();
        } else if(hasNote){
            // that means the user clicks away from the form and the form has data so we have to save the note
            this.addNote({title,text});
        }
        else{
            //close form
            this.closeForm();
        }
    }

    openForm(){
        this.$form.classList.add('form-open'); // adding class to style it a bit
        this.$noteTitle.style.display = 'block'; 
        this.$formButtons.style.display = 'block';
    }

    closeForm(){
        this.$form.classList.remove('form-open');
        this.$noteTitle.style.display = 'none'; 
        this.$formButtons.style.display = 'none';
        // to clear inputs when form is collapsed
        this.$noteTitle.value = '';
        this.$noteText.value = '';
    }

    addNote(note) {
        // we also need to maintain note ID and color along with text and title
         const newNote = {
             title : note.title,
             text : note.text ,
             // if notes exist then we take id of last note and add 1
             id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
             color:"white"

         };
        this.notes = [...this.notes , newNote]; //using spread operator
          console.log(this.notes);
         this.displayNotes();
         this.closeForm();
    }

    displayNotes(){
            const hasNotes = this.notes.length > 0;
            // if we have notes in our array we hide our placeholder text
            if(hasNotes){
                this.$placeHolder.style.display = "none";
            } else{
                this.$placeHolder.style.display = "flex";
            }

           this.$notes.innerHTML = this.notes.map(note => `
             <div style ="background : ${note.color};" class = "note">
                <div class = "${note.title && 'note-title'}">${note.title}</div>
                <div class ="note-text">${note.text}</div>
                <div class = "toolbar-container">
                    <div class = "toolbar">
                    <img class = "toolbar-color" src ="https://icon.now.sh/palette">
                    <img class = "toolbar-delete" src ="https://icon.now.sh/delete">
                        
                    </div>
                </div>
             </div>
            `) .join("");

            //.join to join everything into an empty string is used to get rid of the commasbetween array elements that is shown on the webpage if we don't use it

    }
   
}

new App();