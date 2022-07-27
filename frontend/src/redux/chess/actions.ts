import { 
    CREATE_NEW_GAME, 
    SET_CURRENT_TURN,
    SET_SELECTED_SQUARE,
    SET_IS_DRAGGING
} from './types';

export const createNewGame = () => ({
    type: CREATE_NEW_GAME
});

export const setCurrentTurn = (value: string) => ({
    type: SET_CURRENT_TURN,
    value: value
});

export const setSelectedSquare = (value: string) => ({
    type: SET_SELECTED_SQUARE,
    value: value
});

export const setIsDragging = (value: boolean) => ({
    type: SET_IS_DRAGGING,
    value: value
});