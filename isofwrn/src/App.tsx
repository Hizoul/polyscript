
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, FlatList
} from 'react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard tho reload,\n' +
    'Shake or press menu button for dev menu',
});
let customData = [{text: " block "}]
for (let i = 0; i < 10000; i++) {
  customData.push({text: " block "+i})
}
const randomNumber = (min: number, max: number) =>  Math.random() * (max - min) + min

let ref: any
let setter: any
const updatePosition = () => {
  if (ref) {
    const index = Math.round(randomNumber(0, 300))
    setter({index})
    ref.scrollToOffset({offset: (index * 15) - 80})
  }
}
setInterval(updatePosition, 3000)
export default class App extends React.Component<any, any> {
  protected state = {index: 0}
  constructor(props: any) {
    super(props)
    setter = (newState: any) => {
      this.setState(newState)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Scrolled to {this.state.index}
        </Text>
        <FlatList
          ref={(newRef) => ref = newRef}
          style={{maxHeight: 300}}
          data={customData}
          keyExtractor={(item) => item.text}
          renderItem={({item}) => {
            return <Text style={{lineHeight: 15, fontSize: 15}}>{item.text}</Text>
          }}
        />
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
