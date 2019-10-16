
class BlockMaze {

    constructor() {
        console.log("BlockMaze constructor")
        this.cells = []
    }

    initialise(width, height) {
        this.width = width
        this.height = height

        this.size = this.width*this.height

        if ( this.width/2 == this.width)
        {
            this.width+=1
        }

        if ( this.height/2 == this.height)
        {
            this.height+=1
        }

        for (var n=0; n<this.size; n++)
        {
            this.cells[n] = 1;  // wall
        }
    }

    generate(startX = 1, startY = 1) {

        this.generate2(startX, startY);

        this.cells[this.width] = 0;
        // this.cells[1] = 0;
        // this.cells[this.size-2] = 0;
    }

    generate2(currentCellX, currentCellY) {
        var randomDirections = this.generateRandomDirections();
        // console.log(currentCellX + " " + currentCellY + " " + randomDirections + " " + randomDirections.length);

        for (var i = 0; i < randomDirections.length; i++) {

            switch(randomDirections[i]) {
                case 'N':
                    if (currentCellY-2>0)
                    {
                        if (this.cells[currentCellX + ((currentCellY - 2)*this.width)] != 0 )
                        {
                            this.cells[currentCellX + ((currentCellY - 2)*this.width)] = 0;   // make cell empty
                            this.cells[currentCellX + ((currentCellY - 1)*this.width)] = 0;   // make wall between emtpy (also a cell)
                            this.generate2(currentCellX, currentCellY - 2);
                        }
                    }
                break;

                case 'S':
                    if ( currentCellY+2<this.height-1)
                    {
                        if (this.cells[currentCellX + ((currentCellY + 2)*this.width)] != 0 )
                        {
                            this.cells[currentCellX + ((currentCellY + 2)*this.width)] = 0;   // make cell empty
                            this.cells[currentCellX + ((currentCellY + 1)*this.width)] = 0;   // make wall between emtpy (also a cell)
                            this.generate2(currentCellX, currentCellY + 2);
                        }
                    }
                break;

                case 'W':
                    if ( currentCellX-2>0)
                    {
                        if (this.cells[currentCellX-2 + (currentCellY * this.width)] != 0 )
                        {
                            this.cells[currentCellX-2 + (currentCellY * this.width)] = 0;   // make cell empty
                            this.cells[currentCellX-1 + (currentCellY * this.width)] = 0;   // make wall between emtpy (also a cell)
                            this.generate2(currentCellX - 2, currentCellY);
                        }
                    }
                break;

                case 'E':
                    if ( currentCellX+2<this.width-1)
                    {
                        if (this.cells[currentCellX+2 + (currentCellY*this.width)] != 0 )
                        {
                            this.cells[currentCellX+2 + (currentCellY * this.width)] = 0;   // make cell empty
                            this.cells[currentCellX+1 + (currentCellY * this.width)] = 0;   // make wall between emtpy (also a cell)
                            this.generate2(currentCellX + 2, currentCellY);
                        }
                    }
                break;
            }
        }
    }

    generateRandomDirections(directions) {
        var directions = new Array()
        directions = [ 'N', 'E', 'S', 'W']
        // directions = [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'S', 'E', 'S', 'W']  
        // directions = [ 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'W', 'W', 'E', 'S', 'W']
        return UTILS.shuffle(directions)
    }

    log() {
        // console.log(this.cells)
    }

    occupied(row, col) {
        return this.cells[row*this.width + col]
    }
}
