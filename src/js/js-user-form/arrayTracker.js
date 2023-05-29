export class ArrayTracker {
    constructor(array) {
        this.array = array || [];
        this.index = 0;
      }
    
    getCurrentElement() {
        return this.array[this.index];
    }

    moveToNext() {
        if (this.index < this.array.length - 1) {
            this.index++;
        }
    }

    moveToPrevious() {
        if (this.index > 0) {
            this.index--;
        }
    }

    moveToIndex(index) {
        if (index >= 0 && index < this.array.length) {
            this.index = index;
        }
    }

    resetIndex() {
        this.index = 0;
    }

    getArrayLength() {
        return this.array.length;
    }

    add(value) {
        this.array.push(value);
    }  
    
    remove(value) {
        const index = this.array.indexOf(value);
        if (index > -1) {
          this.array.splice(index, 1);
          // Adjust the index if necessary
          if (index <= this.index) {
            this.index--;
          }
        }
    }
        
}


