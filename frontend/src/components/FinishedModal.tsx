import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classes from './FinishedModal.module.css';

type FinishedModalProps = {
    chess: any;
}

type FinishedModalState = {

}

class FinishedModal extends React.Component<FinishedModalProps, FinishedModalState> {
    constructor(props: FinishedModalProps) {
        super(props);

        this.getTitleFromStatus = this.getTitleFromStatus.bind(this);
    }

    getTitleFromStatus() {
        const { chess } = this.props;
        if (chess.game.in_checkmate())
            return 'You lost!';
        if (chess.game.in_draw())
            return 'Draw!';
        if (chess.game.in_stalemate())
            return 'Draw!';
        if (chess.game.in_threefold_repetition())
            return 'Draw!';
        return 'You won!';    
    }

    render() {
        const { chess } = this.props;
        const game_end = chess.game.in_checkmate() || chess.game.in_draw() || chess.game.in_stalemate() || chess.game.in_threefold_repetition();

        return (
            <div className={classes.container}>
                <div className={classes.title}>{this.getTitleFromStatus()}</div>
                <div className={classes.buttons}>
                    <button className={`${classes.button} ${classes.rematch}`}>
                        Rematch
                    </button>
                    <button className={`${classes.button} ${classes.newGame}`}>
                        New Game
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    chess: state.chess
});

export default compose(
    connect(mapStateToProps)
)(FinishedModal);