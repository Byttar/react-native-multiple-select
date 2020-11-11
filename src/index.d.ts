import * as React from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type stringMap = {
    [x: string] : boolean | undefined
}

export interface MultiSelectProps {
    /**
     * Array of strings which are the checkboxes inside the modal
     */
    items: string[],
    labelStyle?: ViewStyle,
    labelContainerStyle?: ViewStyle,
    labelTextStyle?: TextStyle,
    /**
     * Callback for when the modal is closed. This is called when you press the back button or press the top close button
     * This action will update state
     */
    onModalClosed: (result: string[]) => void,
    /**
     * The value is a string of arrays representing the current values
     */
    value: string[],

}

export default class MultiSelect extends React.Component<MultiSelectProps> {
}