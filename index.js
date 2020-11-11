"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var i = 0;
var invertState = function (previousState, index) {
    previousState[index] = !previousState[index];
    return previousState;
};
var setListName = function (previousState, index, name) {
    if (previousState[name]) {
        delete previousState[name];
    }
    else {
        previousState[name] = true;
    }
    return previousState;
};
var MultipleSelect = function (_a) {
    var items = _a.items, labelContainerStyle = _a.labelContainerStyle, labelStyle = _a.labelStyle, labelTextStyle = _a.labelTextStyle, onModalClosed = _a.onModalClosed, value = _a.value;
    var _b = react_1.useState([]), get_checkboxstate = _b[0], set_checkboxstate = _b[1];
    var _c = react_1.useState({}), get_stringmap = _c[0], set_stringmap = _c[1];
    var _d = react_1.useState(false), visible = _d[0], setVisible = _d[1];
    var close = function () {
        var strings = __spreadArrays(Object.keys(get_stringmap));
        onModalClosed(strings);
        setVisible(false);
    };
    react_1.useEffect(function () {
        var map = {};
        value.forEach(function (x) {
            map[x] = true;
        });
        set_stringmap(map);
    }, []);
    return (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(react_native_1.Modal, { visible: visible, animationType: "fade", transparent: true, onRequestClose: function () { return close(); } },
            react_1.default.createElement(react_native_1.View, { style: styles.modalWrapper },
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () {
                        close();
                    } },
                    react_1.default.createElement(react_native_1.Text, { style: styles.closeStyle }, "Voltar")),
                react_1.default.createElement(react_native_1.ScrollView, { style: styles.modalContent }, items.map(function (name, index) {
                    return (react_1.default.createElement(react_native_elements_1.CheckBox, { key: "checkbox#" + index, checked: get_checkboxstate[index] || value.indexOf(name) !== -1 || false, title: name, onPress: function () {
                            set_checkboxstate(function (prev) {
                                return invertState(__spreadArrays(prev), index);
                            });
                            set_stringmap(function (prev) {
                                return setListName(prev, index, name);
                            });
                        } }));
                })))),
        react_1.default.createElement(react_native_1.TouchableOpacity, { style: __assign(__assign({}, styles.labelsContainer), labelContainerStyle), onPress: function () { return setVisible(true); } }, value.length ? value.map(function (x, index) {
            return react_1.default.createElement(react_native_1.View, { key: "item#" + index, style: __assign(__assign({}, styles.label), labelStyle) },
                react_1.default.createElement(react_native_1.Text, { style: __assign(__assign({}, styles.labelTextStyle), labelTextStyle) }, x));
        }) :
            react_1.default.createElement(react_native_1.Text, null, "Clique aqui para adicionar"))));
};
var styles = react_native_1.StyleSheet.create({
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
});
exports.default = MultipleSelect;
//# sourceMappingURL=index.js.map