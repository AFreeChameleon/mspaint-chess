export type Action = {
    type: string;
    [key: string]: any;
}

export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const SET_CURRENT_TURN = 'SET_CURRENT_TURN';
export const SET_SELECTED_SQUARE = 'SET_SELECTED_SQUARE';
export const SET_IS_DRAGGING = 'SET_IS_DRAGGING';
