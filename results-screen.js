// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement, _showflashcard, _toMenu) {
    this.containerElement = containerElement;
    this._showflashcard = _showflashcard;
    this._toMenu = _toMenu;

    this.show = this.show.bind(this);
    this._startOver = this._startOver.bind(this);
    this._continue = this._continue.bind(this);
  }

  show(numberCorrect, numberWrong, answer) {

	this.answer = answer;
  	const percent = document.querySelector('#results .percent');
  	const correct = document.querySelector('#results .correct');
  	const wrong = document.querySelector('#results .incorrect');
  	const Continue = document.querySelector('.continue');
  	const toMenu = document.querySelector('.to-menu');

  	percent.textContent = Math.round( numberCorrect*100 / (numberCorrect + numberWrong) );
  	correct.textContent = numberCorrect;
  	wrong.textContent = numberWrong;

  	// continue
  	if( percent.textContent == 100 ){
  		Continue.textContent = 'Start over?';
  		Continue.removeEventListener('click', this._continue);
  		Continue.addEventListener('click', this._startOver);
  	}
  	else{
  		Continue.textContent = 'Continue';
  		Continue.removeEventListener('click', this._startOver);
  		Continue.addEventListener('click', this._continue);
  	}

  	toMenu.addEventListener('click', this._toMenu);

    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  // _toMenu() {
  // 	document.dispatchEvent( new CustomEvent('toMenu') );
  // }

  _startOver() {
  	// const eventInfo = {
   //    titleName: null,
   //    answer : null
   //  };
   //  document.dispatchEvent( new CustomEvent('startOver', { detail: eventInfo }) );
	this._showflashcard(null, null);
  }

  _continue() {
  	// const eventInfo = {
   //    titleName: null,
   //    answer : this.answer
   //  };
   //  document.dispatchEvent( new CustomEvent('startOver', { detail: eventInfo }) );
   this._showflashcard(null, this.answer);
  }
}
