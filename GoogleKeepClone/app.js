class App{
    constructor(){
        console.log("app works!");
        this.notes = JSON.parse(localStorage.getItem('notes'))  || [] ; // notes array
        this.title = ''; // to store current note text and title
        this.text = ''; 
        this.id ='';


        //DOM - elements
        this.$form = document.querySelector('#form'); // we use $ to differentiate html elements as compared to data
        this.$notes = document.querySelector('#notes');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText =  document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');
        this.$formCloseButton = document.querySelector("#form-close-button");
        this.$placeHolder = document.querySelector('#placeholder');
        this.$modal = document.querySelector(".modal");
        this.$modalTitle = document.querySelector(".modal-title");
        this.$modalText = document.querySelector('.modal-text');
        this.$ModalCloseButton = document.querySelector('.modal-close-button');
        this.$colorTooltip = document.querySelector('#color-tooltip');

        this.render();
        this.addEventListeners(); // to make sure all events are added when app starts up
    }

    //method where we add all event listeners used in our app

    addEventListeners(){
        //body click event
        document.body.addEventListener('click',event =>{
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
            this.deleteNote(event);
            
           
        });

        // body mouse event
        document.body.addEventListener('mouseover',event =>{
            this.openTooltip(event);
        });

        //body mouseover event 

        document.body.addEventListener('mouseout',event =>{
            this.closeTooltip(event);
        });

        //color tooltip 
        this.$colorTooltip.addEventListener('mouseover', event =>{
           // console.log(event.target);
            // we need a reference to color tooltip here so we cant use arrow function as it has a lexical 'this'
        //    console.log(this.$colorTooltip);
           this.$colorTooltip.style.display = 'flex';
        });

        this.$colorTooltip.addEventListener('mouseout', event =>{
            //console.log(event.target);
            this.$colorTooltip.style.display = 'none';
        });

        //noteColor change click listener
        this.$colorTooltip.addEventListener('click',event =>{
            const color =  event.target.dataset.color;
            if(color){
                this.changeNoteColor(color);
            }
          
        })



        
        // form event listener
        this.$form.addEventListener('submit',event => {
            event.preventDefault(); // prevents default refresh of page when form is submitted
            const title  = this.$noteTitle.value;
            const text = this.$noteText.value;

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

        //modal close button
        this.$ModalCloseButton.addEventListener('click',event =>{
            this.closeModal(event);
        })

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

    openModal(event){
        if(event.target.closest('.toolbar')) return; // if we click on toolbar it shouldn't open modal
        // check if the element that fired the event is closest to the note class
        if(event.target.closest('.note')){
           // toggle class opne-modal on it to show the modal on click of a note
           this.$modal.classList.toggle('open-modal');
           this.$modalTitle.value = this.title;
           this.$modalText.value = this.text;

           
        }
    }

    closeModal(event){
        // edit the note and close the modal
        this.editNote();
        this.$modal.classList.toggle('open-modal');

    }

    openTooltip(event){
        if(event.target.matches('.toolbar-color')){
            const $parentDiv  = event.target.parentElement.parentElement.parentElement;
            // to get notes id
            this.id = $parentDiv.dataset.id;
            // position of tooltip should be taken care of based on how much user has scrolled
            const noteCoords = event.target.getBoundingClientRect();
            const horizontal = noteCoords.left + window.scrollX;
            const vertical = noteCoords.top + window.scrollY +60;
            this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
            this.$colorTooltip.style.display = 'flex';


        }
    }

    closeTooltip(event){
        // console.log(event.target);
        if(event.target.matches('.toolbar-color')){
            this.$colorTooltip.style.display = 'none';
        }
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
         this.render();
         this.closeForm();
    }

    render(){
        this.saveNotes();
        this.displayNotes();
    }

    saveNotes(){
        localStorage.setItem('notes',JSON.stringify(this.notes));
    }
    deleteNote(event){
        if(event.target.matches('.toolbar-delete')){
            event.stopPropagation(); // so that it doesnt open modal
         const choice = confirm('Are you sure you want to delete this note ?');
         if(!choice) return;
         const id  = event.target.dataset.id; // we dont need to upadte this.id because no other function needs access to it
         this.notes = this.notes.filter(note =>{
            return (note.id !== Number(id));
         });
         this.render();

        }
    }

    editNote(){
        const title = this.$modalTitle.value;
        const text = this.$modalText.value;
        this.notes =  this.notes.map((note)=>{
            if(note.id === Number(this.id)){
               return {...note , title , text} ; //updating title and text
            }
            else{
                return note;
            }
        });
        this.render();
    }

    changeNoteColor(color){
        console.log(this.id);
            this.notes = this.notes.map((note) =>{
                if(note.id === Number(this.id)){
                    return {...note , color}; //updating the color
                }
                else{
                    return note;
                }
            });

            this.render();
    }

    selectNote(event){
        const $selectedNote = event.target.closest('.note');
        if(!$selectedNote) // if not clicked on note then we shouldnt try to get its children,etc.
            return ;
        const [$noteTitle,$noteText] = $selectedNote.children; // gets children of the div
        this.title = $noteTitle.innerText;
        this.text = $noteText.innerText;
        this.id = $selectedNote.dataset.id; // gets the data element id (AS A STRING)
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
             <div style ="background : ${note.color};" class = "note" data-id = "${note.id}"> 
                <div class = "${note.title && 'note-title'}">${note.title}</div>
                <div class ="note-text">${note.text}</div>
                <div class = "toolbar-container">
                    <div class = "toolbar">
                    <img  class = "toolbar-color" src ="https://icon.now.sh/palette">
                    <img data-id = ${note.id} class = "toolbar-delete" src ="https://icon.now.sh/delete">
                        
                    </div>
                </div>
             </div>
            `) .join("");

            //.join to join everything into an empty string is used to get rid of the commasbetween array elements that is shown on the webpage if we don't use it
            //data - used to store custom/private data to the page or application
    }
   
}

new App();