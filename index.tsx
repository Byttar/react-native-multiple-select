import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, BackHandler, ViewStyle, TextStyle} from 'react-native';
import {CheckBox} from 'react-native-elements';

type stringMap = {
    [x: string] : boolean | undefined
}

interface Props {
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

let i = 0;

const invertState = (
  previousState: Array<boolean>,
  index: number,
): Array<boolean> => {
  previousState[index] = !previousState[index];
  return previousState;
};

const setListName = (previousState: stringMap, index: number, name: string):stringMap => {
    
    if(previousState[name]){
        delete previousState[name];
    }else{
        previousState[name] = true;
    }

    return previousState;
}

const MultipleSelect: React.FC<Props> = ({items, labelContainerStyle, labelStyle, labelTextStyle, onModalClosed, value}) => {
  const [get_checkboxstate, set_checkboxstate] = useState<Array<boolean>>([]);
  const [get_stringmap, set_stringmap] = useState<stringMap>({});
	const [visible, setVisible] = useState(false);
	
	const close = () => {
		const strings: string[] = [...Object.keys(get_stringmap)];
		onModalClosed(strings);
		setVisible(false);
	} 

	useEffect(() => {
		const map:stringMap = {};

		value.forEach(x => {
			map[x] = true;
		})

		set_stringmap(map);
	}, [])

  return (
    <View>
        <Modal  visible={visible}  animationType="fade" transparent={true} onRequestClose={() => close()}>
          <View style={styles.modalWrapper}>
          <TouchableOpacity onPress={() => {
                      close();
                  }}>
                <Text style={styles.closeStyle}>Voltar</Text>
            </TouchableOpacity>
            <ScrollView style={styles.modalContent}>
            {items.map((name: string, index: number) => {
        return (
          <CheckBox
            key={`checkbox#${index}`}
            checked={get_checkboxstate[index] || value.indexOf(name) !== -1 || false}
            title={name}
            onPress={() => {
              set_checkboxstate((prev: boolean[]): boolean[] =>
                invertState([...prev], index),
              )
              set_stringmap((prev:stringMap): stringMap => 
                setListName(prev, index, name)
              )
            }
            }></CheckBox>
        );
      })}
            </ScrollView>
          </View>
        </Modal>

      <TouchableOpacity style={{...styles.labelsContainer, ...labelContainerStyle}} onPress={() => setVisible(true)}>
        {
            value.length ? value.map((x, index: number) => {
                return <View key={`item#${index}`} style={{...styles.label, ...labelStyle}}>
                    <Text style={{...styles.labelTextStyle, ...labelTextStyle}}>{x}</Text>
                </View>         
            }) : 
            <Text>Clique aqui para adicionar</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    labelsContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
        flexWrap: 'wrap'
    },
    label: {
			paddingVertical: 10,
			paddingHorizontal: 10,
			marginRight: 10,
			marginBottom: 10,
			borderRadius: 10,
			backgroundColor: '#e3e3e3'
    },
    modalWrapper: {
      width: '100%',
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      alignSelf: 'center',
      justifyContent: 'center',
      flex: 1
    },
    modalContent: {
      maxHeight: 500,
      backgroundColor: 'white',
		},
		closeStyle: {
			color: 'white',
			fontFamily: 'Poppins-Regular',
			alignSelf: "flex-end",
			marginRight: 10
		},
		labelTextStyle: {
			fontFamily: 'Poppins-Regular',
			fontSize: 11
		}
})

export default MultipleSelect;
