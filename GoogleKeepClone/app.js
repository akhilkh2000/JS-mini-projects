class App{
    constructor(){
        console.log("app works!");
        this.addEventListeners(); // to make sure all events are added when app starts up
        this.$form = document.querySelector('#form'); // we use $ to differentiate html elements as compared to data
        this.$noteTitle = document.querySelector('#note-title');
        this.$formButtons = document.querySelector('#form-buttons');
    }

    //method where we add all event listeners used in our app

    addEventListeners(){
        document.body.addEventListener('click',event =>{
            this.handleFormClick(event);
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

}

new App();