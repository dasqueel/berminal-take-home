import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import { Tips } from './Utils';
import axios from 'axios';
import telegram from './icons/telegram.png';
import reddit from './icons/reddit.png';
import twitter from './icons/twitter.png';
import website from './icons/website.png';
import blog from './icons/blog.png';
import source_code from './icons/source_code.png';
import white_paper from './icons/white_paper.png';
import block_explorer from './icons/block_explorer.png';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Popover, OverlayTrigger } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      allCoins: [],
      pages: null,
      loading: true,
      newCoinName: "",
      newTicker: "",
      newCirculation: "",
      newAmountRaised: "",
      newMinable: "",
      newActiveInvestors: "",
      newBlockExplorer: "",
      newBlog: "",
      newWebsite: "",
      newWhitePaper: "",
      newTwitter: "",
      newReddit: "",
      newTelegram: "",
      newTag: "",
      newSummary: "",
      newSourceCode: "",
      newSupply: "",
      newLaunchDate: "",
    };
    this.fetchData = this.fetchData.bind(this);
  }

  async componentDidMount() {
    await this.getCoins();
  }

  async getCoins() {
    axios.get(`https://api.berminal.com/read_coin_desc?desc_pull_number=100`)
      .then(resp => {
        this.setState(prevState => {
          return {
            coins: resp.data,
            allCoins: resp.data,
            loading: false
          };
        });
      })
      .catch(err => console.log(err));
  }

  handleEditChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddCoin = event => {

    const createNewCoin = coinData => {

      return {
        active_investors: coinData.newActiveInvestors,
        block_explorer: coinData.newBlockExplorer,
        blog: coinData.newBlog,
        circulation: coinData.newCirculation,
        coin_name: coinData.newCoinName,
        id: 1000, // would use a founction to get new unique id
        launch_date: coinData.newLaunchDate,
        minable: coinData.newMinable,
        reddit: coinData.newReddit,
        source_code: coinData.newSourceCode,
        summary: coinData.newSummary,
        supply: coinData.newSupply,
        tag: coinData.newTag,
        telegram: coinData.newTelegram,
        twitter: coinData.newTwitter,
        ticker: coinData.newTicker,
        website: coinData.newWebsite,
        white_paper: coinData.newWhitePaper,
      }
    };

    let { newCoinName,
          newTicker,
          newCirculation,
          newAmountRaised,
          newMinable,
          newActiveInvestors,
          newBlockExplorer,
          newBlog,
          newWebsite,
          newWhitePaper,
          newTwitter,
          newReddit,
          newTelegram,
          newTag,
          newSummary,
          newSourceCode,
          newLaunchDate,
          newSupply,
          allCoins,
        } = this.state;

    let coinData = { newCoinName,
                      newTicker,
                      newCirculation,
                      newAmountRaised,
                      newMinable,
                      newActiveInvestors,
                      newBlockExplorer,
                      newBlog,
                      newWebsite,
                      newWhitePaper,
                      newTwitter,
                      newReddit,
                      newTelegram,
                      newTag,
                      newSummary,
                      newSourceCode,
                      newLaunchDate,
                      newSupply,
                    };

    let newCoin = createNewCoin(coinData);
    allCoins.push(newCoin);
    this.setState({ allCoins });

    // reset the "add a coin" values to empty strings
    this.setState({
      newCoinName: "",
      newTicker: "",
      newCirculation: "",
      newSupply: "",
      newAmountRaised: "",
      newMinable: "",
      newActiveInvestors: "",
      newBlockExplorer: "",
      newBlog: "",
      newWebsite: "",
      newWhitePaper: "",
      newTwitter: "",
      newReddit: "",
      newTelegram: "",
      newTag: "",
      newSummary: "",
      newSourceCode: "",
      newLaunchDate: ""
    });
    event.preventDefault();
  };

  requestData(pageSize, page, sorted, filtered) {
    return new Promise((resolve, reject) => {
      let filteredData = this.state.allCoins;

      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + '').includes(nextFilter.value);
          });
        }, filteredData);
      }

      // sort the data
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === 'string'
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? 'desc' : 'asc'))
      );

      // You must return an object containing the rows of the current page, and optionally the total pages number.
      // something here is the bug that initally displays all 100 coins, intread of 10
      const res = {
        rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
      };

      resolve(res);
    });
  };

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    this.requestData(state.pageSize, state.page, state.sorted, state.filtered).then(
      res => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          coins: res.rows,
          pages: res.pages,
          loading: false
        });
      }
    );
  }

  // code for handling editable html within a cell
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.coins[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          let newCoins = this.state.coins;
          newCoins[cellInfo.index] = row;
          this.setState({ coins: newCoins });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.coins[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  // code for handling adding icons which links to their urls in each cell
  renderSocialIcons = cellInfo => {
    let coinData = this.state.coins[cellInfo.index];

    // want to iterate through all valid social media links
    let icons = [];

    Object.keys(coinData).forEach(key => {
      if (key === 'telegram' && coinData.telegram !== 'N/A') icons.push(<a href={coinData.telegram} target='_blank'><img src={telegram} alt='' height="20" width="20" /></a>)
      if (key === 'reddit' && coinData.reddit !== 'N/A') icons.push(<a href={coinData.reddit} target='_blank'><img src={reddit} alt='' height="20" width="20" /></a>)
      if (key === 'twitter' && coinData.twitter !== 'N/A') icons.push(<a href={coinData.twitter} target='_blank'><img src={twitter} alt='' height="20" width="20" /></a>)
      if (key === 'website' && coinData.website !== 'N/A') icons.push(<a href={coinData.website} target="_blank"><img src={website} alt='' height="20" width="20" /></a>);
      if (key === 'blog' && coinData.blog !== 'N/A') icons.push(<a href={coinData.blog} target="_blank"><img src={blog} alt='' height="20" width="20" /></a>);
      if (key === 'source_code' && coinData.source_code !== 'N/A') icons.push(<a href={coinData.source_code} target="_blank"><img src={source_code} alt='' height="20" width="20" /></a>);
      if (key === 'white_paper' && coinData.white_paper !== 'N/A') icons.push(<a href={coinData.white_paper} target="_blank"><img src={white_paper} alt='' height="20" width="20" /></a>);
      if (key === 'block_explorer' && coinData.block_explorer !== 'N/A') icons.push(<a href={coinData.block_explorer} target="_blank"><img src={block_explorer} alt='' height="20" width="20" /></a>);
    });
    return(
      <div>
        {icons}
      </div>
    );
  };

  // code for handling html that does a popover when hovering over active investors cell
  renderHover = cellInfo => {
    let coinData = this.state.coins[cellInfo.index];
    return(
      <OverlayTrigger
        trigger={['hover']}
        placement="top"
        overlay={
          <Popover id="popover-trigger-hover-focus" title="Investors">
            {coinData.active_investors}
          </Popover>
        }
      >
        <p>{coinData.active_investors}</p>
      </OverlayTrigger>
    )
  };

  render() {
    const { coins, pages, loading } = this.state;
    return (
      <div>
        {/* this should be its own component, also its not DRY */}
        <div className="App">
          <p className="App-intro">
            <h3>Add new Coin</h3>
            <input type="text" name="newCoinName" placeholder="Coin Name..." value={this.state.newCoinName} onChange={this.handleEditChange} />
            <input type="text" name="newTicker" placeholder="Ticker..." value={this.state.newTicker} onChange={this.handleEditChange} />
            <input type="text" name="newCirculation" placeholder="Circulation..." value={this.state.newCirculation} onChange={this.handleEditChange} />
            <input type="text" name="newSupply" placeholder="Supply..." value={this.state.newSupply} onChange={this.handleEditChange} />
            <input type="text" name="newAmountRaised" placeholder="Amount Raised..." value={this.state.newAmountRaised} onChange={this.handleEditChange} />
            <input type="text" name="newMinable" placeholder="Minalbe..." value={this.state.newMinable} onChange={this.handleEditChange} />
            <input type="text" name="newActiveInvestors" placeholder="Investors..." value={this.state.newActiveInvestors} onChange={this.handleEditChange} />
            <input type="text" name="newBlockExplorer" placeholder="Block Explorer URL..." value={this.state.newBlockExplorer} onChange={this.handleEditChange} />
            <input type="text" name="newBlog" placeholder="Blog URL..." value={this.state.newBlog} onChange={this.handleEditChange} />
            <input type="text" name="newWebsite" placeholder="Websites URL..." value={this.state.newWebsite} onChange={this.handleEditChange} />
            <input type="text" name="newWhitePaper" placeholder="White Paper URL..." value={this.state.newWhitePaper} onChange={this.handleEditChange} />
            <input type="text" name="newTwitter" placeholder="Twitter URL..." value={this.state.newTwitter} onChange={this.handleEditChange} />
            <input type="text" name="newReddit" placeholder="Reddit URL..." value={this.state.newReddit} onChange={this.handleEditChange} />
            <input type="text" name="newSummary" placeholder="Summary of coin..." value={this.state.newSummary} onChange={this.handleEditChange} />
            <input type="text" name="newSourceCode" placeholder="Source Code URL..." value={this.state.newSourceCode} onChange={this.handleEditChange} />
            <input type="text" name="newTag" placeholder="Tags..." value={this.state.newTag} onChange={this.handleEditChange} />
            <input type="text" name="newLaunchDate" placeholder="Launch Date..." value={this.state.newLaunchDate} onChange={this.handleEditChange} />
            <button onClick={this.handleAddCoin}>Add</button>
          </p>
          </div>

        <div>
        <ReactTable
          columns={[
            {
              Header: 'Name',
              accessor: 'coin_name',
              width: 120,
              Cell: this.renderEditable
            },
            {
              Header: 'Ticker',
              accessor: 'ticker',
              width: 80,
              Cell: this.renderEditable
            },
            {
              Header: 'Ciculation',
              accessor: 'circulation',
              width: 150,
              Cell: this.renderEditable
            },
            {
              Header: 'Supply',
              accessor: 'supply',
              width: 150,
              Cell: this.renderEditable
            },
            {
              Header: 'Amount Raised',
              accessor: 'amount_raised',
              filterable: false,
              width: 100,
              Cell: this.renderEditable
            },
            {
              Header: 'Minable',
              accessor: 'minable',
              width: 60,
              Cell: this.renderEditable
            },
            {
              Header: 'Launch Date',
              accessor: 'launch_date',
              width: 80,
              Cell: this.renderEditable
            },
            {
              Header: 'Active Investors',
              accessor: 'active_investors',
              Cell: this.renderHover
            },
            {
              Header: 'Links',
              filterable: false,
              sortable: false,
              Cell: this.renderSocialIcons
            }
      ]}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={coins}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
        <Tips />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
