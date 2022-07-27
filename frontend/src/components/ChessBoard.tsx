import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { rows, columns } from '../redux/chess/reducer';
import classes from './ChessBoard.module.css';
import Square from './Square';
import Pawn from './Pawn';
import Rook from './Rook';
import Knight from './Knight';
import Bishop from './Bishop';
import King from './King';
import Queen from './Queen';
import FinishedModal from './FinishedModal';

type ChessBoardProps = {
    chess: any;
}

class ChessBoard extends React.Component<ChessBoardProps> {
    constructor(props: ChessBoardProps) {
        super(props);
        this.getPieceFromString = this.getPieceFromString.bind(this);
    }

    getPieceFromString(piece: string, colour: string, square: string, column: string, move: string) {
        const {
            chess
        } = this.props;
        switch (piece) {
            case 'p':
                return <Pawn colour={colour} square={square} column={column} move={move} />;
            case 'r':
                return <Rook colour={colour} square={square} column={column} move={move} />;
            case 'n':
                return <Knight colour={colour} square={square} column={column} move={move} />;
            case 'b':
                return <Bishop colour={colour} square={square} column={column} move={move} />;
            case 'k':
                return <King colour={colour} square={square} column={column} move={move} />;
            case 'q':
                return <Queen colour={colour} square={square} column={column} move={move} />;
            default:
                return null;
        }
    }

    render() {
        const {
            chess
        } = this.props;

        // const board = chess.game.board
        console.log(chess);
        const moves: string[] = chess.game.moves({ square: chess.selectedSquare });
        const movesVerbose: string[] = chess.game.moves({ square: chess.selectedSquare, verbose: true });
        const game_end = chess.game.in_checkmate() || chess.game.in_draw() || chess.game.in_stalemate() || chess.game.in_threefold_repetition();
        console.log(movesVerbose, moves, game_end);
        return (
            <div className={classes.container}>
                {game_end ? <FinishedModal/> : null}
                { rows.map((rowNum, i) => (
                    <div className={i % 2 ? classes.rowEven : classes.rowOdd} key={rowNum}>
                        { columns.map((col) => (
                            <Square key={col} row={rowNum} column={col} className={classes.square}>
                                {(() => {
                                    const square = chess.game.get(`${col}${rowNum}`);
                                    if (square && square.type) {
                                        const move = moves.filter((m) => m.includes(`${col}${rowNum}`) && m.includes('x'));
                                        // console.log('movessss', moves.filter((m) => m.includes(`${col}${rowNum}`) && m.includes('x')))
                                        return this.getPieceFromString(
                                            square.type, 
                                            square.color, 
                                            col + rowNum, 
                                            col, 
                                            move && move[0]
                                        );
                                    }
                                    const move = moves.filter((m) => m.includes(`${col}${rowNum}`));
                                    if (moves && (
                                        moves.includes(`${col}${rowNum}`) || 
                                        move.length > 0
                                    )) {
                                        return (<div 
                                            className={classes.marker} 
                                            style={{backgroundImage: `url(/img/marker.png)`}} 
                                            data-marker={true}
                                            data-square={`${col}${rowNum}`}
                                            data-move={move[0]}></div>)
                                    }
                                    return null;
                                })()}
                            </Square>
                        )) }
                    </div>
                )) }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    chess: state.chess
});


export default compose(
    connect(mapStateToProps)
)(ChessBoard);