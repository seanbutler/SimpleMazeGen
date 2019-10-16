
class WidgetFactory {

    getRangeWidget(id, labelText, min = 0, val = 50, max = 100, step = 1) {
        let labelElement = document.createElement('label')
        labelElement.innerHTML = labelText

        let inputElement = document.createElement('input')

        inputElement.setAttribute('type',"range")
        inputElement.setAttribute('id', id)

        // inputElement.setAttribute('name',"username")

        inputElement.setAttribute('value', val)
        inputElement.setAttribute('min', min)
        inputElement.setAttribute('max', max)
        inputElement.setAttribute('step', step)
        labelElement.appendChild(inputElement)
        return labelElement;
    }

    getCanvas(width, height) {
        let element = document.createElement('canvas')
        element.width = width
        element.height = height
        return element
    }

    getButton(id, labelText) {
        let element = document.createElement('input')
        element.setAttribute('type',"button")
        element.setAttribute('id', id)
        element.setAttribute('value',labelText)
        return element
    }
}

class MazeDrawer {

    constructor(element) {
        this.target = element
    }

    clear() {
        const context = this.target.getContext('2d');
        context.clearRect(0, 0, this.target.width, this.target.height);
    }

    draw(maze, size = 16, spacing = 2) {
        console.log("MazeDrawer constructor")
        this.clear()

        const cellSize = size
        const cellSpacing = spacing

        var ctx = this.target.getContext('2d')

        const background_color = '#07F'
        const foreground_color = '#F70'

        for (var x = 0; x< maze.width; x++) {
            for (var y = 0; y< maze.height; y++) {

                if ( maze.cells[x + (y * maze.width)] ==  1)
                {
                    this.target.fillStyle = foreground_color
                    ctx.fillRect(x * cellSize + (x + 1) * cellSpacing,
                            y * cellSize + (y + 1) * cellSpacing,
                            cellSize, cellSize)
                }
            }
        }    
    }
}

class App {
    constructor() {
        console.log("App constructor")
        // this.gui = new GUI()
        this.widgetFactory = new WidgetFactory()
        this.maze = new BlockMaze()

        this.size = 32
        this.space = 2
        this.width = 21
        this.height = 21

        let widthWidget = this.widgetFactory.getRangeWidget('width', 'width', 5, this.width, 505, 2)
        widthWidget.onchange = (evt) => {
            this.width = evt.target.value
            this.maze.initialise(this.width, this.height)
            this.maze.generate()    
            this.drawer.draw(this.maze, this.size, this.space)
        };
        document.body.appendChild(widthWidget)

        let heightWidget = this.widgetFactory.getRangeWidget('height', 'height', 5, this.height, 505, 2)
        heightWidget.onchange = (evt) => {
            this.height = evt.target.value
            this.maze.initialise(this.width, this.height)
            this.maze.generate()    
            this.drawer.draw(this.maze, this.size, this.space)
        };
        document.body.appendChild(heightWidget)
    
        let sizeWidget = this.widgetFactory.getRangeWidget('size', 'size', 0, this.size, 100)
        sizeWidget.onchange = (evt) => {
            this.size = evt.target.value
            this.drawer.draw(this.maze, this.size, this.space)
        };
        document.body.appendChild(sizeWidget)

        let spaceWidget = this.widgetFactory.getRangeWidget('space', 'space', 0, this.space, 100)
        spaceWidget.onchange = (evt) => {
            this.space = evt.target.value
            this.drawer.draw(this.maze, this.size, this.space)
        };
        document.body.appendChild(spaceWidget)

        let generateBtnWidget = this.widgetFactory.getButton('generate', 'generate')
        generateBtnWidget.onclick = (evt) => {
            this.maze.initialise(this.width, this.height)
            this.maze.generate()    
            this.drawer.draw(this.maze, this.size, this.space)
        };
        document.body.appendChild(generateBtnWidget)

        this.canvas = this.widgetFactory.getCanvas(window.innerWidth, window.innerHeight*0.9)
        document.body.appendChild(this.canvas)

        this.maze.initialise(this.width, this.height)
        this.maze.generate()

        this.drawer = new MazeDrawer(this.canvas)
        this.drawer.draw(this.maze, this.size, this.space)        
    }
}
