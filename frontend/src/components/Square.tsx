import React from 'react';

import classes from './Square.module.css';

type SquareProps = React.ComponentPropsWithoutRef<any> & {
    row: number;
    column: string;
}

type SquareState = {
    draggingOver: boolean;
}

class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
        super(props);

        this.onDragOver = this.onDragOver.bind(this);
        this.state = {
            draggingOver: false
        }
    }

    onDragOver(e: any) {
        e.preventDefault();
        console.log('dragover', this.state.draggingOver)
        this.setState({
            draggingOver: true
        });
    }

    render() {
        const { row, column } = this.props;
        const { draggingOver } = this.state;
        return (
            <div 
                className={`${this.props.className} ${draggingOver && classes.draggingOver}`}
                onDragOver={() => this.setState({ draggingOver: true })} 
                onDragLeave={() => this.setState({ draggingOver: false })}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Square;