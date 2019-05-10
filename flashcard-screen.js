// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, context, answer, _showresult) {
    this.containerElement = containerElement;
    this._showresult = _showresult;
    this.answer = answer;

    this.cardContext = context;
    this.show = this.show.bind(this);
  }

  _getTitle(e) {
    const title = event.detail.titleName;
    
    for (var val of FLASHCARD_DECKS) {
      if( val.title === title ){
        this.cardContext = val;
        console.log(val);
        console.log(this.cardContext);
        break;
      }
    }
  }

  show() {

    var KEY;
    var CONTEXT;
    var STARTINDEX;
    var key = Object.keys(this.cardContext.words);
    var context = Object.values(this.cardContext.words)

    var ans = [];
    if(this.answer == null){
      for(let i = 0; i < key.length; i++){
        ans.push(0);
      }
      this.answer = ans;
      KEY = key[0];
      CONTEXT = context[0];
      STARTINDEX = 0;
    }
    else{
      for(let i = 0; i < this.answer.length; i++){
        if( this.answer[i] === 0 ){
          KEY = key[i];
          CONTEXT = context[i];
          STARTINDEX = i;
          break;
        }
      }
    }

    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const card = new Flashcard(flashcardContainer, KEY, CONTEXT, key, context, this.answer, STARTINDEX, this._showresult);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
