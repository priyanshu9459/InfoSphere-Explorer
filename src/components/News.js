import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Pages from "./Pages";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static defaultProps = {
    country: PropTypes.string,
    pageSize: PropTypes.numbers,
  };
  articles = [
    {
      source: {
        id: "usa-today",
        name: "USA Today",
      },
      author: "Eduardo Cuevas",
      title:
        "New COVID-19 variant JN.1 is spreading fast. How to protect yourself, - USA TODAY",
      description:
        "The recent uptick suggests JN.1 could be more transmissible and better at slipping past people’s immune system, the CDC warned.",
      url: "https://www.usatoday.com/story/news/health/2023/12/13/new-covid-variant-jn-1-spreading/71891879007/",
      urlToImage:
        "https://www.usatoday.com/gcdn/media/2021/11/29/USATODAY/usatsports/imageForEntry2-KH1.jpg?crop=1365,768,x2,y0&width=1365&height=768&format=pjpg&auto=webp",
      publishedAt: "2023-12-15T13:32:39Z",
      content:
        "Scientists are narrowing in on the fastest-growing COVID-19 variant, learning more about the strain that has coincided with a rise in cases as Americans head into the holidays.\r\nThe JN.1 variant now … [+3116 chars]",
    },
    {
      source: {
        id: "usa-today",
        name: "USA Today",
      },
      author: "Ken Tran",
      title:
        "Republicans authorize Joe Biden impeachment inquiry. What's next? - USA TODAY",
      description:
        "House Republicans are projecting confidence in their impeachment inquiry into Joe Biden after all GOP lawmakers voted to formalize the probe.",
      url: "https://www.usatoday.com/story/news/politics/2023/12/15/house-gop-projects-confidence-joe-biden-impeachment-inquiry/71923964007/",
      urlToImage:
        "https://www.usatoday.com/gcdn/authoring/authoring-images/2023/12/14/USAT/71924017007-xxx-img-afp-1845875925-1-1-3-o-148-takl.JPG?crop=8255,4644,x0,y275&width=3200&height=1801&format=pjpg&auto=webp",
      publishedAt: "2023-12-15T10:17:21Z",
      content:
        "WASHINGTON Republican investigators are projecting confidence about their impeachment investigation into President Joe Biden after the House formally authorized the push, even as it lacks evidence su… [+2798 chars]",
    },
    {
      source: {
        id: "usa-today",
        name: "USA Today",
      },
      author: "USA TODAY",
      title:
        "Biden administration pushes Israel to scale back war in Gaza - USA TODAY",
      description: null,
      url: "https://www.usatoday.com/story/news/politics/2023/12/14/biden-administration-pushes-israel-to-scale-back-war-in-gaza/71924821007/",
      urlToImage: null,
      publishedAt: "2023-12-15T00:41:49Z",
      content: null,
    },
  ];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=472ffc0d03444e2699a098bb9bd5549a&page=1&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    console.log(data);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=472ffc0d03444e2699a098bb9bd5549a&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false,
    });
    this.props.setProgress(100);
  };
  handleNextClick = async () => {
    this.props.setProgress(0);
    if (!this.state.page + 1 < Math.ceil(this.state.totalResults / 5)) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=472ffc0d03444e2699a098bb9bd5549a&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      console.log(url);
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false,
      });
    }
    this.props.setProgress(100);
  };
  fetchMoreData =  async () => {
  
  
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=472ffc0d03444e2699a098bb9bd5549a&page=1&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    console.log(data);
    let parseData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  render() {
    return (
      <div className="container my-3">
        <div className="center" style={{ textAlign: "center" }}>
          {" "}
          <h2>Top Headlines</h2>
        </div>
       
        {/* {this.state.loading && <Spinner></Spinner>} */}
        <div className="row">
          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                
                <NewsItems
                  source={element.source.name}
                  author={element.author ? element.author : "Unknonw"}
                  publishedAt={element.publishedAt}
                  title={element.title.slice(0, 20)}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://images.news9live.com/wp-content/uploads/2023/11/Aayein-meme-template.png?q=50&w=1200"
                  }
                  newsUrl={element.url}
                ></NewsItems>
                
              </div>
              
            );
          })}
          {/* {!this.state.loading && this.state.articles.map((element, index) => {
          
            return (
              
              <div className="col-md-4" key={index}>
                <NewsItems
                source={element.source.name}
                author={element.author ? element.author : "Unknonw"} publishedAt={element.publishedAt}
                  title={element.title.slice(0, 20)}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  imageUrl={element.urlToImage ? element.urlToImage : "https://images.news9live.com/wp-content/uploads/2023/11/Aayein-meme-template.png?q=50&w=1200"}
                  newsUrl={element.url}
                ></NewsItems>
              </div>
            );
          })} */}
        </div>
        {/* <div className="conatiner d-flex justify-content-between">
          <button
            disabled={this.state.page <= 0}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
         <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  hasMore={
                    this.state.articles.length != this.state.totalResults
                  }
                  loader={<h4>Loading...</h4>}
                ></InfiniteScroll>
      </div>
    );
  }
}

export default News;
