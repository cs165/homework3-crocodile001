// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {

    this._showflashcard = this._showflashcard.bind(this);
    //document.addEventListener('title-clicked', this._showflashcard);
    
    this._showresult = this._showresult.bind(this);
    //document.addEventListener('flashcard-finished', this._showresult);

    this._toMenu = this._toMenu.bind(this);
    //document.addEventListener('toMenu', this._toMenu);

    //document.addEventListener('startOver', this._showflashcard);


    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement, this._showflashcard);

    //const mainElement = document.querySelector('#main');
    //this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement, this._showflashcard, this._toMenu);

  }

  _showflashcard(title, answer) {
    
    // Uncomment this pair of lines to see the "flashcard" screen:
    
    if(title != null)
        this.title = title;
    var context; 
    for (var val of FLASHCARD_DECKS) {
      if( val.title === this.title ){
        context = val;
        break;
      }
    }

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, context, answer, this._showresult);

    this.menu.hide();
    this.results.hide();
    this.flashcards.show();
  }

  _showresult(correct, wrong, answer) {
    
    // Uncomment this pair of lines to see the "results" screen:

    this.flashcards.hide();
    this.results.show(correct, wrong, answer);
  }

  _toMenu() {
    this.results.hide();
    this.menu.show();
  }

}
