
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
  }
   

  capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);


  constructor(props) {
    super(props);

    this.state = {
      article: [],
      loading: true,
      page:1,
      totalResult:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)} NewMonkey`
  }
  updateNews = async () =>{
    this.props.setProgress(10)
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data=await fetch(url);
    this.props.setProgress(30)
    let parseData= await data.json();
    this.props.setProgress(60);
     this.setState({
      article:parseData.articles,
      loading:false,
      totalResult:parseData.totalResults,
    })
    this.props.setProgress(100);
  }

  
  async componentDidMount(){
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=47b2f8e5a968432998821b3335f8af1c&page=1&pageSize=${this.props.pageSize}`
  //   this.setState({loading:true})
  //   let data= await fetch(url);
  //   let parseData= await data.json();
  //   console.log(parseData);
  //   this.setState({article:parseData.articles,loading:false
  //     ,totalResult:parseData.totalResults})
         this.updateNews();
  }

  
    fetchMoreData = async()=>{
       this.setState({page:this.state.page+1})
       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

      let data=await fetch(url);
      let parseData= await data.json();
       this.setState({
        article:this.state.article.concat(parseData.articles),
        loading:false,
        totalResult:parseData.totalResults,
      })
    }

  //  handlePreviousClick= async ()=>{
  //   this.setState({page:this.state.page -1})
  //   this.updateNews();
  // }

  // handleNextClick= async ()=>{
  //   this.setState({page:this.state.page +1})
  //   this.updateNews()

  //   console.log("Next");

  // }

  render() {
    return (
      <>
      
        <h1 className="text-center my-5">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading &&<Spinner />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResult}
          loader={<Spinner />}
        >
       <div className="container">
        <div className="row">
          {this.state.article.map((value) => (
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


        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick} >&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
      </>
    );
  }
}

export default News;
