import { Chess } from "chess.js";
import { 
    Action, 
    CREATE_NEW_GAME, 
    SET_CURRENT_TURN,
    SET_SELECTED_SQUARE,
    SET_IS_DRAGGING
} from "./types";

export const rows = [1, 2, 3, 4, 5, 6, 7, 8];
export const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const defaultState = {
    game: new Chess(),
    currentTurn: 'white',
    selectedSquare: null,
    isDragging: false,
    playerColour: 'black'
}

const reducer = (state = defaultState, action: Action) => {
    switch(action.type) {
        case CREATE_NEW_GAME:
            return {
                ...state,
                game: new Chess()
            };
        case SET_CURRENT_TURN:
            return {
                ...state,
                currentTurn: action.value
            };
        case SET_SELECTED_SQUARE:
            return {
                ...state,
                selectedSquare: action.value
            }
        case SET_IS_DRAGGING:
            return {
                ...state,
                isDragging: action.value
            }
        default:
            return state;
    }
}

export default reducer;