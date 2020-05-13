class App{
    constructor(){
        console.log("app works!");
        this.notes = new Array(); // notes array


        //DOM - elements
        this.$form = document.querySelector('#form'); // we use $ to differentiate html elements as compared to data
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText =  document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');

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
    }

    handleFormClick(event){
        const isFormClicked  = this.$form.contains(event.target);
        if(isFormClicked){
            // open the form
            this.openForm();
        } else{
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
    }

    addNote(note) {
        // we also need to maintain note ID and color along with text and title
         const newNote = {
             title : note.title,
             text : note.text ,
             // if notes exist then we take id of last note and add 1
             id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1

         };
        this.notes = [...this.notes , newNote]; //using spread operator
         console.log(this.notes);

    }

}

new App();