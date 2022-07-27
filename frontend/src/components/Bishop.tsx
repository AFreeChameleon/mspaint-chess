import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSelectedSquare, setIsDragging, setCurrentTurn } from '../redux/chess/actions';
import classes from './Piece.module.css';

type BishopProps = {
    colour: string;
    square: string;
    column: string;
    move: string;

    chess: any;
    dispatchSetSelectedSquare: (square: string) => void;
    dispatchSetIsDragging: (value: boolean) => void;
    dispatchSetCurrentTurn: (value: 'white' | 'black') => void;
}

type BishopState = {
    position: {
        x: number,
        y: number
    };
}

class Bishop extends React.Component<BishopProps, BishopState> {
    mouseUpCompleted: boolean = false;
    constructor(props: BishopProps) {
        super(props);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.state = {
            position: {
                x: 0,
                y: 0
            },
        }
    }

    onMouseMove(e: any) {
        e.stopPropagation();
        e.preventDefault();
        const { chess, square } = this.props;
        const isDragging = chess.isDragging && chess.selectedSquare === square;
        if (!isDragging) return
        this.setState({
          position: {
            x: e.clientX - 40,
            y: e.clientY - 40
          }
        });
    }

    onDragStart(e: any) {
        e.stopPropagation()
        e.preventDefault()
        if (e.button !== 0) return
        const {
            square,
            dispatchSetSelectedSquare,
            dispatchSetIsDragging
        } = this.props;
        this.setState({
            position: {
                x: e.pageX - 40,
                y: e.pageY - 40
            }
        })
        console.log(square)
        dispatchSetSelectedSquare(square)
        dispatchSetIsDragging(true);
        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.onDragEnd)
        console.log('dragstart')
        this.mouseUpCompleted = false;
    }
    
    onDragEnd(e: any) {
        const { 
            chess,
            dispatchSetIsDragging, 
            dispatchSetSelectedSquare, 
            dispatchSetCurrentTurn 
        } = this.props;
        console.log('event:', e, this.mouseUpCompleted)
        dispatchSetIsDragging(false);
        if (e.target.dataset && !this.mouseUpCompleted) {
            if (e.target.dataset.marker === 'true') {
                const move = chess.game.move(`${ e.target.dataset.move}`);
                console.log(chess.game.board());
                dispatchSetCurrentTurn(chess.currentTurn === 'white' ? 'black' : 'white');
            } else if (e.target.dataset.takeable === 'true') {
                const move = chess.game.move(`${e.target.dataset.move}`);
                console.log(chess.game.board());
                dispatchSetCurrentTurn(chess.currentTurn === 'white' ? 'black' : 'white');
            }
        }
        this.mouseUpCompleted = true;
    }

    render() {
        const { 
            colour, 
            square, 
            move,
            chess, 
            dispatchSetSelectedSquare 
        } = this.props;
        const { position } = this.state;
        const takeable = move ? move.includes('x') : false;
        const colourName = colour === 'w' ? 'white' : 'black';
        const isDragging = chess.isDragging && chess.selectedSquare === square;
        const draggable = chess.currentTurn === colourName && chess.game.moves({square}).length > 0;
        // console.log(position)
        return (
            <div 
                draggable="false"
                id={`bishop_${colourName}_${square}`}
                style={isDragging ? { 
                    backgroundImage: `url(/img/bishop_${colourName}.png)`, 
                    position: 'absolute',
                    top: position.y + 'px', 
                    left: position.x + 'px',
                    pointerEvents: 'none'
                } : {backgroundImage: `url(/img/bishop_${colourName}.png)`}}
                className={`${classes.piece} ${isDragging && classes.pieceDragging}`}
                onMouseDown={draggable ? this.onDragStart : (e) => {}}
                onMouseUp={this.onDragEnd}
                data-takeable={takeable}
                data-square={`${square}`}
                data-move={move}
            >
                {takeable ? <img 
                    src="/img/takeable.png" 
                    className={classes.takeable} 
                    data-takeable={takeable} 
                    data-square={`${square}`}
                    data-move={move}
                /> : null}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    chess: state.chess
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatchSetSelectedSquare: (square: string) => dispatch(setSelectedSquare(square)),
    dispatchSetIsDragging: (value: boolean) => dispatch(setIsDragging(value)),
    dispatchSetCurrentTurn: (value: 'white' | 'black') => dispatch(setCurrentTurn(value))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Bishop);