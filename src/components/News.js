import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  // articles=[{
  //   "source": { "id": "the-verge", "name": "The Verge" },
  //   "author": "Richard Lawler",
  //   "title": "Former Uber security chief found guilty of covering up massive 2016 data breach",
  //   "description": "Uber paid two hackers $100,000 in Bitcoin to keep a 2016 data breach quiet, and now a jury has convicted former chief security officer Joe Sullivan on two charges for not reporting the incident to authorities.",
  //   "url": "https://www.theverge.com/2022/10/5/23390063/uber-security-chief-convicted-hack-cover-up-bounty-payment",
  //   "urlToImage": "https://cdn.vox-cdn.com/thumbor/lh2YBh8cWvn3ARrenXxjolBte4o=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23932655/acastro_STK106__01.jpg",
  //   "publishedAt": "2022-10-06T00:25:32Z",
  //   "content": "Former Uber security chief found guilty of covering up massive 2016 data breach\r\nFormer Uber security chief found guilty of covering up massive 2016 data breach\r\n / Prosecutors claimed Joe Sullivan h… [+4358 chars]"
  // },
  // {
  //   "source": { "id": "the-verge", "name": "The Verge" },
  //   "author": "Emma Roth",
  //   "title": "Google’s partnering with Coinbase to let cloud customers pay in crypto next year",
  //   "description": "Starting in 2023, Google will partner with Coinbase to power crypto-based transactions for “select” customers in the Web3 space.",
  //   "url": "https://www.theverge.com/2022/10/11/23398306/google-coinbase-partnership-crypto-2023-cloud",
  //   "urlToImage": "https://cdn.vox-cdn.com/thumbor/a1UuqmTXeWu_sDyVAVipeGpIQ0s=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24016885/STK093_Google_04.jpg",
  //   "publishedAt": "2022-10-11T14:29:54Z",
  //   "content": "Googles partnering with Coinbase to let cloud customers pay in crypto next year\r\nGoogles partnering with Coinbase to let cloud customers pay in crypto next year\r\n / The search giant will use Coinbase… [+1913 chars]"
  // },
  // {
  //   "source": { "id": "reuters", "name": "Reuters" },
  //   "author": null,
  //   "title": "Crypto firm 21Shares lists bitcoin ETP on Nasdaq Dubai - Reuters.com",
  //   "description": "Crypto investment products firm 21.co said on Wednesday its subsidiary 21Shares AG has listed a bitcoin exchange-traded product on Nasdaq Dubai, making it the Middle East's first physically-backed bitcoin ETP.",
  //   "url": "https://www.reuters.com/technology/crypto-firm-21shares-lists-bitcoin-etp-nasdaq-dubai-2022-10-12/",
  //   "urlToImage": "https://www.reuters.com/resizer/e-rtKXHJBMDr3n3yPuzMmaBrXaE=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/62VXJFTHEZNRZM4CO6PTL5CS3A.jpg",
  //   "publishedAt": "2022-10-12T06:05:00Z",
  //   "content": "DUBAI, Oct 12 (Reuters) - Crypto investment products firm 21.co said on Wednesday its subsidiary 21Shares AG has listed a bitcoin exchange-traded product on Nasdaq Dubai, making it the Middle East's … [+1642 chars]"
  // }]
  static defaultProps={
    pageSize:6,
    country:'in',
    category:'general'
  }

  static propTypes={
    pageSize:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string
  }
  capitalizefirst=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props){
    super(props);
    this.state={
      articles:[],
      page:1,
      loading:false,
      totalResults:0
    }
    document.title=`${this.capitalizefirst(this.props.category)} - NewsMonkey`
  }
  async componentDidMount(){
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0a1105eb542b4af09a27b6487f9c5a0d&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    this.props.setProgress(70);
    let data=await fetch(url);
    let parsedata=await data.json()
    this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false})
    this.props.setProgress(100);
  }

  handleprev=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0a1105eb542b4af09a27b6487f9c5a0d&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedata=await data.json()
    this.setState({page:this.state.page-1,articles:parsedata.articles,loading:false })

  }
  handlenext=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0a1105eb542b4af09a27b6487f9c5a0d&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedata=await data.json()
    this.setState({
      page:this.state.page+1,
      articles:parsedata.articles,
      loading:false
    })
  }
   fetchMoreData=async()=>{
    // this.props.setProgress(0);
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0a1105eb542b4af09a27b6487f9c5a0d&page=${this.state.page}&pageSize=${this.props.pageSize}`
  
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedata=await data.json()
    this.props.setProgress(70);
    this.setState({
      articles:this.state.articles.concat(parsedata.articles),
      totalResults:parsedata.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  };
  render() {

    return (
      <>
        <h2 className='text-center my-3'>NewsMonkey- Top {this.capitalizefirst(this.props.category)} Headlines</h2>
        {/* {<div className='text-center'><Spinner /></div>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
          <div className='row'>
        {{/*!this.state.loading*/} && this.state.articles.map((ele)=>{
          return <div className='col-md-4' key={ele.url}>
            <Newsitem title={ele.title?ele.title.slice(0,45):" "} description={ele.description?ele.description.slice(0,88):" "} imgurl={ele.urlToImage} newsurl={ele.url} author={ele.author?ele.author:"Unknown"} date={ele.publishedAt} source={ele.source.name}/>
            </div>

        })}
        </div>
        </div>
        </InfiniteScroll>
        
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div>

      </>
    )
}
}
        
