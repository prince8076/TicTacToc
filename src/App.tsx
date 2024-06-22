import React, {useState} from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/icons';  // Ensure this path is correct


function App(): JSX.Element {
  // State to track the current player (cross or circle)
  const [isCross, setIsCross] = useState<boolean>(false);
  // State to track the winner of the game
  const [gameWinner, setGameWinner] = useState<string>('');
  // State to track the current state of the game board
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  // Function to reset the game
  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  // Function to check if there is a winner
  const checkIsWinner = () => {
    // Checking rows
    if (gameState[0] === gameState[1] && gameState[0] === gameState[2] && gameState[0] !== 'empty') {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (gameState[3] === gameState[4] && gameState[3] === gameState[5] && gameState[3] !== 'empty') {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (gameState[6] === gameState[7] && gameState[6] === gameState[8] && gameState[6] !== 'empty') {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    }
    // Checking columns
    else if (gameState[0] === gameState[3] && gameState[0] === gameState[6] && gameState[0] !== 'empty') {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (gameState[1] === gameState[4] && gameState[1] === gameState[7] && gameState[1] !== 'empty') {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (gameState[2] === gameState[5] && gameState[2] === gameState[8] && gameState[2] !== 'empty') {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    }
    // Checking diagonals
    else if (gameState[0] === gameState[4] && gameState[0] === gameState[8] && gameState[0] !== 'empty') {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (gameState[2] === gameState[4] && gameState[2] === gameState[6] && gameState[2] !== 'empty') {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    }
    // Checking for draw
    else if (!gameState.includes('empty')) {
      setGameWinner('Draw game... ⌛️');
    }
  };
// Function to handle a cell press
  const onChangeItem = (itemNumber: number) => {
     // Show message if game is over
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      })
    }
      // Update cell if it's empty   
    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross': 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }

    checkIsWinner()
  }

  return (
    <SafeAreaView >
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
        style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO
        ]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      {/* game action */}
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'reLoad the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
    playerInfo: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 10,
      marginVertical: 15,
      marginHorizontal: 20,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // for Android shadow
    },
    gameTurnTxt: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    playerX: {
      backgroundColor: '#38CC77',
    },
    playerO: {
      backgroundColor: '#F7CD2E',
    },
    grid: {
      margin: 20,
    },
    card: {
      height: 100,
      width: '33.33%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#333',
      backgroundColor: '#FFF',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3, // for Android shadow
    },
    winnerInfo: {
      borderRadius: 10,
      backgroundColor: '#38CC77',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6, // for Android shadow
    },
    winnerTxt: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: '700',
      textTransform: 'capitalize',
      letterSpacing: 1,
    },
    gameBtn: {
      alignItems: 'center',
      padding: 12,
      borderRadius: 10,
      marginHorizontal: 50,
      backgroundColor: '#8D3DAF',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // for Android shadow
    },
    gameBtnText: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });
  

export default App;