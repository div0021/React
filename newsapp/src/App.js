import React, { Components } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";

export default class App extends Components {
  pageNo=20
  api=process.env.REACT_APP_NEWS_APII
  
  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
     console.log(this.api);
    return (
      <div>
         <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
            <Route path="/" element={<News apikey={this.api} setProgress={this.setProgress} key="general" pageSize={this.pageNo} country="in" category="general"/>}/>               
            <Route path="/business" element={<News apikey={this.api} setProgress={this.setProgress} key="business" pageSize={this.pageNo} country="in" category="business"/>}/>
            <Route path="/entertainment" element={<News apikey={this.api} setProgress={this.setProgress} pageSize={this.pageNo} country="in" category="entertainment"/>}/>
            <Route path="/general" element={<News apikey={this.api} setProgress={this.setProgress} key="general" pageSize={this.pageNo} country="in" category="general"/>}/>               
            <Route path="/health" element={<News apikey={this.api} setProgress={this.setProgress} key="health" pageSize={this.pageNo} country="in" category="health"/>}/>
            <Route path="/science" element={<News apikey={this.api} setProgress={this.setProgress} key="science" pageSize={this.pageNo} country="in" category="science"/>}/>
            <Route path="/sports" element={<News apikey={this.api} setProgress={this.setProgress} key="sports" pageSize={this.pageNo} country="in" category="sports"/>}/>
            <Route path="/technology" element={<News apikey={this.api} setProgress={this.setProgress} key="technology" pageSize={this.pageNo} country="in" category="technology"/>}/>




        </Routes>
        
        </Router>
      </div>
    );
  }
}
