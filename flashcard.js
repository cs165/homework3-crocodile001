// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, key, context, answer, startIndex, _showresult) {
    
    this.containerElement = containerElement;
    this._showresult = _showresult;
    this.titleCount = startIndex;
    this.cardKey = key;
    this.cardContext = context;
    this.answer = answer;
    this.answer = answer;
    var numberCorrect = 0;
    var numberWrong = 0;
    for(let i = 0; i < key.length; i++){
      if( answer[i] === 1 )
        numberCorrect += 1;
    }
    console.log(this.cardKey);
    console.log(this.cardContext);
    console.log(this.answer);

    // create first card
    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    
    // move function
    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.started = false;
    this.moved = 0;
    this._start = this._start.bind(this);
    this._move = this._move.bind(this);
    this._end = this._end.bind(this);
    this.flashcardElement.addEventListener('pointerdown', this._start);
    this.flashcardElement.addEventListener('pointermove', this._move);
    this.flashcardElement.addEventListener('pointerup', this._end);

    // background + number
    this.bg = document.querySelector('body');
    this.correct = document.querySelector('#main .correct');
    this.wrong = document.querySelector('#main .incorrect');
    this.corrects = numberCorrect;
    this.wrongs = numberWrong;
    this.answerflag = false;
    this.correct.textContent = this.corrects;
    this.wrong.textContent = this.wrongs;

  }

  _start(event) {

    this.moved = 0;
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.started = true;
    event.currentTarget.setPointerCapture(event.pointerId);

    event.currentTarget.style.transition = '';
    
    //console.log('start');
  }

  _move(event) {

    if (!this.started) {
      return;
    }

    //console.log('move');
    this.moved = (event.clientX - this.originX) + (event.clientY - this.originY);

    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;
    event.currentTarget.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) ' + 'rotate(' + 0.2*deltaX + 'deg' + ')';
  
    // backgroundColor + number
    if(deltaX > 0){
      if(deltaX >= 150){
        if(!this.answerflag){
          this.corrects += 1;
          this.answerflag = true;
          //this.bg.style.backgroundColor = " #97b7b7 ";
          this.bg.classList.add("change");
          this.correct.textContent = this.corrects;
          this.answer[this.titleCount] = 1;
        }
        
      }
      else{
        if(this.answerflag){
          this.corrects -= 1;
          this.answerflag = false;
          //this.bg.style.backgroundColor = " #d0e6df ";
          this.bg.classList.remove("change");
          this.correct.textContent = this.corrects;
        }
      }
    }

    if(deltaX < 0){
      if(deltaX <= -150){
        if(!this.answerflag){
          this.wrongs += 1;
          this.answerflag = true;
          //this.bg.style.backgroundColor = " #97b7b7 ";
          this.bg.classList.add("change");
          this.wrong.textContent = this.wrongs;
          this.answer[this.titleCount] = 0;
        }
        
      }
      else{
        if(this.answerflag){
          this.wrongs -= 1;
          this.answerflag = false;
          //this.bg.style.backgroundColor = " #d0e6df ";
          this.bg.classList.remove("change");
          this.wrong.textContent = this.wrongs;
        }
      }
    }

  }

  _end(event) {

    //console.log('end');
    this.started = false;
    this.moved = 0;
    this.answerflag = false;
    this.offsetX *= -1;
    this.offsetY *= -1;
    event.currentTarget.style.transition = 'all 0.6s';
    event.currentTarget.style.transform = 'translate(' + this.offsetX + 'px, ' + this.offsetY + 'px) ';

    this.offsetX = 0;
    this.offsetY = 0;

    const deltaX = event.clientX - this.originX;
    
    // go to results screen or create a new card
    if( (deltaX >= 150) || (deltaX <= -150) ){
      
      this.containerElement.removeChild(this.flashcardElement);
      //this.bg.style.backgroundColor = " #d0e6df ";
      this.bg.classList.remove("change");

      // go to results screen
      // const eventInfo = {
      //   answer : this.answer,
      //   correct : this.corrects,
      //   wrong : this.wrongs
      // };
      if(this.titleCount === this.cardKey.length-1){
        //console.log('finish');
        //document.dispatchEvent( new CustomEvent('flashcard-finished', { detail: eventInfo }) );
        this._showresult(this.corrects, this.wrongs, this.answer);
      }
      else{   // create a new card
        
        do{
          this.titleCount += 1;
        }
        while( this.answer[this.titleCount] !== 0 && this.titleCount < this.cardKey.length )
        
        if(this.titleCount === this.cardKey.length){
          //console.log('finish');
          //document.dispatchEvent( new CustomEvent('flashcard-finished', { detail: eventInfo }) );
          this._showresult(this.corrects, this.wrongs, this.answer);
        }
        else{
          this.flashcardElement = this._createFlashcardDOM(this.cardKey[this.titleCount], this.cardContext[this.titleCount]);
          this.containerElement.append(this.flashcardElement);
          this.flashcardElement.addEventListener('pointerup', this._flipCard);
          this.flashcardElement.addEventListener('pointerdown', this._start);
          this.flashcardElement.addEventListener('pointermove', this._move);
          this.flashcardElement.addEventListener('pointerup', this._end);
        }

      }
    }
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    //console.log('filp');
    //console.log(this.moved);
    if(this.moved === 0)
      this.flashcardElement.classList.toggle('show-word');
  }
}
