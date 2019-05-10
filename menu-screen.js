// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {

  constructor(containerElement, _showflashcard) {
    this.containerElement = containerElement;
    this._showflashcard = _showflashcard;
    this._goto = this._goto.bind(this);
    const choices = containerElement.querySelector('#choices');

    for (var val of FLASHCARD_DECKS) {
	    const title = document.createElement('div');
	    title.textContent = val.title;
	    title.addEventListener('click', this._goto);
	    choices.append(title);
	}
    
  }

  _goto(event) {

  	// const eventInfo = {
   //    titleName: event.target.textContent,
   //    answer : null
   //  };
   //  document.dispatchEvent( new CustomEvent('title-clicked', { detail: eventInfo }) );
   this._showflashcard(event.target.textContent, null);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
