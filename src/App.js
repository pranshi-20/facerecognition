import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';




const initialState={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
    }


class App extends Component{
  constructor(){
    super();
    this.state= initialState;
     }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  }

  calculateFaceLocation =(data)=>{
    const clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(width, height);
    return {
      leftcol: clarifaiface.left_col*width,
      toprow: clarifaiface.top_row * height,
      rightcol: width-(clarifaiface.right_col*width),
      bottomrow: height- (clarifaiface.bottom_row*height)
    }


  }

  displayfacebox=(box)=>{
    console.log(box);
    this.setState({box:box});

  }
  onInputChange=(event)=>{
    console.log(event.target.value);
    this.setState({input:event.target.value});

  }
  onSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    fetch('https://pacific-hollows-61082.herokuapp.com/imageurl', {
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          input:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('https://pacific-hollows-61082.herokuapp.com/image', {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })
        })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
      }
      
      this.displayfacebox(this.calculateFaceLocation(response))
    })
    .catch(err=> console.log(err));    
     
  }

  onRouteChange = (route) => {
    //console.log(this.state.isSignedIn)
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }else{
      this.setState(initialState)
    }
    this.setState({route: route});
  }
 
  render(){
    return (

      <div className="App">
        <Particles className='particles'
              params={{
                particles: {
                  number: {
                    value:150,
                    density: {
                      enable: true,
                      value_area: 1000
                    }
                  }
                }
              }}
            />

        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route==='home'?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange}  onSubmit={this.onSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>:
          (this.state.route==='signin'?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  )
          
        }
      </div>
    );
  }
}

export default App;
