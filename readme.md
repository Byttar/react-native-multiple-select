| Name                | Type                       | Description                                                                     |
|---------------------|----------------------------|---------------------------------------------------------------------------------|
| value               | string[]                   | Represents the current value                                                    |
| items               | string[]                   | A list of strings which will be converted into a list of checkboxes             |
| labelStyle          | ViewStyle                  | Custom Label style                                                              |
| labelContainerStyle | ViewStyle                  | Custom Container style                                                          |
| labelTextStyle      | TextStyle                  | Custom Text style for text inside label                                         |
| onModalClosed       | (result: string[]) => void | Callback use for updating your state, its triggered wenever you close the modal |