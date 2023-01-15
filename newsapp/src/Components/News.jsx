
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

   const[article,setArticle]=useState([]);
   const [loading,setLoading] =useState(true);
   const[page,setPage]=useState(1);
   const [totalResults,setTotalResults]=useState(0)

 
  const updateNews = async () =>{
    props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data=await fetch(url);
    props.setProgress(30)
    let parseData= await data.json();
    props.setProgress(60);
    setLoading(false);
    setArticle(parseData.articles);
    setTotalResults(parseData.totalResults);
    props.setProgress(100);
  }

  useEffect(()=>{
       document.title=`${capitalizeFirstLetter(props.category)} NewMonkey`

    updateNews();
    // eslint-disable-next-line
  },[]);


  
    const fetchMoreData = async()=>{
       
       let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
       setPage(page +1);
      let data=await fetch(url);
      let parseData= await data.json();
      setArticle(article.concat(parseData.articles));
      setLoading(false);
      setTotalResults(parseData.totalResults);
    }



    return (
      <>
      
        <h1 className="text-center" style={{margin:"35px 0px", marginTop:"90px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading &&<Spinner />}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalResults}
          loader={<Spinner />}
        >
       <div className="container">
        <div className="row">
          {article.map((value) => (
            <div className="col-md-4 "  key={value.url}>
              <NewsItem
                newsUrl={value.url}
                source={value.source.name}
                author={value.author ? value.author : ""}
                date={value.publishedAt}
                title={value.title ? value.title : ""}
                discription={value.description ? value.description : ""}
                imageUrl={value.urlToImage ? value.urlToImage : "https://c.ndtvimg.com/2021-09/fcm7l9vg_google-android-generic-reuters-650_625x300_18_September_21.jpg"}
              />
            </div>
          ))}
        </div>
        </div>
       </InfiniteScroll>


        
      </>
    );
  
}

News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
}

News.propTypes={
  country:PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string,
}

export default News;
