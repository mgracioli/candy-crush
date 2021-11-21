import { useState, useEffect } from "react"
import ScoreBoard from "./components/ScoreBoard"
import blueCandy from './images/blueCandy.jpg'
import greenCandy from './images/greenCandy.jpg'
import orangeCandy from './images/orangeCandy.jpg'
import purpleCandy from './images/purpleCandy.jpg'
import redCandy from './images/redCandy.jpg'
import yellowCandy from './images/yellowCandy.jpg'
import blank from './images/blank.jpg'

const width = 8
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

const App = () => {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const createBoard = () => {
    const randomColorArrangement = []

    for (let i = 0; i < (width * width); i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      //O método every() retorna true se a função callback retorna um valor verdadeiro para cada elemento do array; caso contrário, o método every() vai retornar false. Observe que o método every() executa a função callback em todos os elementos do array até ele encontrar um que causar um retorno false
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      //O método every() retorna true se a função callback retorna um valor verdadeiro para cada elemento do array; caso contrário, o método every() vai retornar false. Observe que o método every() executa a função callback em todos os elementos do array até ele encontrar um que causar um retorno false
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        setScoreDisplay((score) => score + 3)
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64] //notValid são as duas ultimas colunas do "tabuleiro" do jogo que não precisam ser avaliadas 
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      //O método every() retorna true se a função callback retorna um valor verdadeiro para cada elemento do array; caso contrário, o método every() vai retornar false. Observe que o método every() executa a função callback em todos os elementos do array até ele encontrar um que causar um retorno false
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        setScoreDisplay((score) => score + 4)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64] //notValid são as duas ultimas colunas do "tabuleiro" do jogo que não precisam ser avaliadas 
      const isBlank = currentColorArrangement[i] === blank

      if (notValid.includes(i)) continue

      //O método every() retorna true se a função callback retorna um valor verdadeiro para cada elemento do array; caso contrário, o método every() vai retornar false. Observe que o método every() executa a função callback em todos os elementos do array até ele encontrar um que causar um retorno false
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor) && !isBlank) {
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        setScoreDisplay((score) => score + 3)
        return true
      }
    }
  }

  const moveIntoSquareBellow = () => {
    for (let i = 0; i <= 65; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      //se tiver doces iguais a primeira linha vai ficar sem doces pq eles vão "descer" para a linha de baixo, nesse caso, eu preciso gerar novos doces para preencher esses da primeira linha
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomCandy = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomCandy]
      }

      if ((currentColorArrangement[i + width]) === blank) {  //se o doce de baixo for vazio, eu preencho esse doce vazio com o doce atual, isso simula o doce descendo para a coluna de baixo
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }

  const dragStart = (e) => {
    //console.log(e.target) //esse evento traz todas as informações do elemento que está sendo arrastado
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
    //console.log(e.target)
  }

  //verifica se o movimento efetuado é válido, dragEnd ocorre depois que foi feito o drop do elemento
  const dragEnd = () => {
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))

    //faz a troca de cor
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1, //quadrado do lado esquerdo
      squareBeingDraggedId - width, //quadrado de cima
      squareBeingDraggedId + 1, //quadrado do lado direito
      squareBeingDraggedId + width  //quadrado de baixo
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')

      setCurrentColorArrangement([...currentColorArrangement])
    }

    //console.log(squareBeingDraggedId)
  }


  //esse useEffect (quando tem o array de dependências vazio) só vai rodar uma vez, ou seja, na primeira vez que o aplicativo renderizar na tela (sempre que apertar o F5, por exemplo)
  useEffect(() => {
    createBoard()
  }, [])

  //esse useEffect só vai funcionar quando a variável/função checkForColumnOfThree for alterada, ou seja, a tela vai renderizar sempre que ela for modificada
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfFour()
      checkForRowOfThree()
      moveIntoSquareBellow()

      //como eu mudei o valor da variável currentColorArrangement lá no método checkForColumnOfThree() eu preciso atualizar o valor dessa variável para ela não voltar a ser a cor que era antes do método ser aplicado
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForColumnOfThree, checkForRowOfFour, checkForRowOfThree, moveIntoSquareBellow, currentColorArrangement])

  return (
    <div className="app">
      <div className='game'>
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart} //The onDragStart event occurs when the user starts to drag an element or text selection.
            onDragOver={e => e.preventDefault()} //The ondragover attribute fires when a draggable element or text selection is being dragged over a valid drop target. By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element. This is done by calling the event.preventDefault() method for the ondragover attribute.
            onDragEnter={e => e.preventDefault()} //The ondragenter attribute fires when a draggable element or text selection enters a valid drop target. The ondragenter and ondragleave events can help the user to understand that a draggable element is about to enter or leave a drop target. This can be done by, for example, setting a background color when the draggable element enters the drop target, and removing the color when the element is moved out of the target.
            onDragLeave={e => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        ))}
      </div>

      <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default App;
