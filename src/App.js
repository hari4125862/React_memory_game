import React, { Component } from 'react';
import './App.css';
import swal from 'sweetalert2'


class App extends Component {
  constructor(props) {
    super(props);
    this.ImageArray = ['9ba25796112cad616be27e473ae1e149', '9ba25796112cad616be27e473ae1e149', 'c98ee48d53c7b9e1ba07b5b4824e55c0', 'c98ee48d53c7b9e1ba07b5b4824e55c0', '1964883_726923827347640_695294356_n', '1964883_726923827347640_695294356_n',
    'Donald-Duck-Iconic', 'Donald-Duck-Iconic', 'images', 'images', 'security-cartoon-character-3091', 'security-cartoon-character-3091'];
    this.tempCheckArr = [];
    this.state = {
      showImg: Array(this.ImageArray.length).fill('hidden'),
      divClick: true,
      compareImgArr: [],
      counter: 0,
      moves : 0,
      flipped:2,
      seconds: 0,
      minute:0
    }   
  }

componentWillMount()
{
  function shuffleArray(array) 
  {
    for (let i = array.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  shuffleArray(this.ImageArray);
}

tick() 
{
  this.setState(prevState => ({
    seconds: prevState.seconds + 1
  }));
  if(this.state.seconds % 60==0)
  {
    this.setState(prevState => ({
      seconds: 0,
      minute: prevState.minute + 1
    }));
  }
}

reset()
{
  this.setState({
    showImg: Array(this.ImageArray.length).fill('hidden'),
    compareImgArr: [],
    divClick: true,
    moves: 0,
    flipped: 2,
    counter:0
  });
}


checkMatch(key, e) 
{
  const arr = this.state.showImg
  if(arr[key]==='hidden')
  {
    this.tempCheckArr.push(key);
    const imgSrc = e.target.firstChild.src;
    const compareImgArr = [...this.state.compareImgArr];
    compareImgArr.push(imgSrc);
    arr[key] = 'visible';
    this.setState({
      showImg: arr,
      compareImgArr: compareImgArr,
      counter: this.state.counter + 1
    });

    if(this.state.counter==1)
    {
      this.interval = setInterval(() => this.tick(), 1000);
    }
    if (this.state.counter % 2==true) 
    {
      this.setState({
        divClick: false
      });
      if (compareImgArr[0] === compareImgArr[1]) 
      {
        this.tempCheckArr = [];
        this.setState({
        compareImgArr: [],
        divClick: true,
        moves: this.state.moves +1,
        flipped: this.state.flipped +2
        });
        if(this.state.flipped===this.ImageArray.length)
        {
          arr[key] = 'visible';
          clearInterval(this.interval);
          console.log("won");                   
          swal({
            title: 'want to play again?',
            text: 'congragulations!',
            type: 'success',
            confirmButtonText: 'Yes, want to play !',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
            this.reset();
            this.setState({
              seconds:0,
              minute:0
            });
            }
          })          
        }

      } else 
      {
        var tempArr = this.state.showImg
        var firstElement =(this.tempCheckArr[0]);
        var secondElement = (this.tempCheckArr[1]);
        setTimeout(()=>{
           tempArr[firstElement] = 'hidden';
           tempArr[secondElement] = 'hidden';
           this.tempCheckArr = [];
           this.setState({
             showImg: tempArr,
             compareImgArr: [],
             divClick: true,
             moves: this.state.moves +1
            })
         }, 1000)
       }
    }
  }
}

render() 
{
  return(
    <div>
      <h1>Memory Game</h1>
      <div className="mui-panel wrapper">
        {this.ImageArray.map((image, i) => {
          return (
            <div key={i} className="modal mui-panel" 
              onClick={this.state.divClick ? (e) => this.checkMatch(i, e) : undefined}>
              <img style={{visibility: this.state.showImg[i]}} src={require('./'+image+'.jpg')} 
              key={i} alt="Game Element" />                 
            </div>            
          )
        })
        }
      </div>
        <div className="points">
            <div className="ctr">
              <h1>Moves: <span id="cnt">{this.state.moves}</span></h1>
            </div>
            <div className="ti"><h1>Time:  <span id="timer">{this.state.minute} mins : {this.state.seconds} sec   </span></h1></div>
        </div>
    </div>
    )
  }
}


export default App;