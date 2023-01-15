import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";

 const App=()=> {
  let pageNo=20
  let api=process.env.REACT_APP_NEWS_APII
  
  // let state={
  //   progress:0
  // }
 const[progress,setProgress]  =useState(0)

  const handleProgress=(progress)=>{
    // setState({progress:progress})
    setProgress(progress)

  }
    return (
      <div>
         <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
            <Route path="/" element={<News apikey={api} setProgress={handleProgress} key="general" pageSize={pageNo} country="in" category="general"/>}/>               
            <Route path="/business" element={<News apikey={api} setProgress={handleProgress} key="business" pageSize={pageNo} country="in" category="business"/>}/>
            <Route path="/entertainment" element={<News apikey={api} setProgress={handleProgress} pageSize={pageNo} country="in" category="entertainment"/>}/>
            <Route path="/general" element={<News apikey={api} setProgress={handleProgress} key="general" pageSize={pageNo} country="in" category="general"/>}/>               
            <Route path="/health" element={<News apikey={api} setProgress={handleProgress} key="health" pageSize={pageNo} country="in" category="health"/>}/>
            <Route path="/science" element={<News apikey={api} setProgress={handleProgress} key="science" pageSize={pageNo} country="in" category="science"/>}/>
            <Route path="/sports" element={<News apikey={api} setProgress={handleProgress} key="sports" pageSize={pageNo} country="in" category="sports"/>}/>
            <Route path="/technology" element={<News apikey={api} setProgress={handleProgress} key="technology" pageSize={pageNo} country="in" category="technology"/>}/>




        </Routes>
        
        </Router>
      </div>
    );
  
  
}
export default App;
