import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, BackHandler, ViewStyle, TextStyle} from 'react-native';
import {CheckBox} from 'react-native-elements';
import PropTypes from 'prop-types';

let i = 0;

const invertState = (
  previousState,
  index
) => {
  previousState[index] = !previousState[index];
  return previousState;
};

const setListName = (previousState, index, name) => {
    
    if(previousState[name]){
        delete previousState[name];
    }else{
        previousState[name] = true;
    }

    return previousState;
}

const MultipleSelect = ({items, labelContainerStyle, labelStyle, labelTextStyle, onModalClosed, value, closeText, addLabelText}) => {
  const [get_checkboxstate, set_checkboxstate] = useState([]);
  const [get_stringmap, set_stringmap] = useState({});
	const [visible, setVisible] = useState(false);
	
	const close = () => {
		const strings = [...Object.keys(get_stringmap)];
		onModalClosed(strings);
		setVisible(false);
	} 

	useEffect(() => {
		const map = {};

		value.forEach(x => {
			map[x] = true;
		})

		set_stringmap(map);
	}, [])

  return (
    <View>
        <Modal  visible={visible} animationType="fade" transparent={true} onRequestClose={() => close()}>
          <View style={styles.modalWrapper}>
          <TouchableOpacity onPress={() => {
                      close();
                  }}>
                <Text style={styles.closeStyle}>{closeText || Close}</Text>
            </TouchableOpacity>
            <ScrollView style={styles.modalContent}>
            {items.map((name, index) => {
        return (
          <CheckBox
            key={`checkbox#${index}`}
            checked={get_checkboxstate[index] || (get_checkboxstate[index] && value.includes(name))}
            title={name}
            onPress={() => {
              set_checkboxstate((prev) =>
                invertState([...prev], index),
              )
              set_stringmap((prev) => 
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
            value.length ? value.map((x, index) => {
                return <View key={`item#${index}`} style={{...styles.label, ...labelStyle}}>
                    <Text style={{...styles.labelTextStyle, ...labelTextStyle}}>{x}</Text>
                </View>         
            }) : 
            <Text>{addLabelText || "Click here to add a item"}</Text>
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
			alignSelf: "flex-end",
			marginRight: 10
		},
		labelTextStyle: {
			fontSize: 11
		}
})

MultipleSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  labelStyle: PropTypes.style,
  labelContainerStyle: PropTypes.style,
  labelTextStyle: PropTypes.style,
  onModalClosed: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string)
}

export default MultipleSelect;
