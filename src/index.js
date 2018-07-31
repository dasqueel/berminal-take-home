import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import { Tips } from './Utils';
import axios from 'axios';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

  async componentWillMount() {
    await this.getCoins();
    console.log('component will mount: ', this.state.coins);
  }

  async getCoins() {
    axios.get(`https://api.berminal.com/read_coin_desc?desc_pull_number=100`)
      .then(resp => {
        this.setState({ coins: resp.data });
        this.setState({ allCoins: resp.data });
        this.setState({ loading: false });
      })
      .catch(err => console.log(err));
  }

  handleEditChange = event => {
    if (event.target.name === "newCoinName") this.setState({ newCoinName: event.target.value });
    if (event.target.name === "newTicker") this.setState({ newTicker: event.target.value });
    if (event.target.name === "newCirculation") this.setState({ newCirculation: event.target.value });
    if (event.target.name === "newAmountRaised") this.setState({ newAmountRaised: event.target.value });
    if (event.target.name === "newMinable") this.setState({ newMinable: event.target.value });
    if (event.target.name === "newActiveInvestors") this.setState({ newActiveInvestors: event.target.value });
    if (event.target.name === "newBlockExplorer") this.setState({ newBlockExplorer: event.target.value });
    if (event.target.name === "newBlog") this.setState({ newBlog: event.target.value });
    if (event.target.name === "newWebsite") this.setState({ newWebsite: event.target.value });
    if (event.target.name === "newWhitePaper") this.setState({ newWhitePaper: event.target.value });
    if (event.target.name === "newTwitter") this.setState({ newTwitter: event.target.value });
    if (event.target.name === "newReddit") this.setState({ newReddit: event.target.value });
    if (event.target.name === "newTelegram") this.setState({ newTelegram: event.target.value });
    if (event.target.name === "newTag") this.setState({ newTag: event.target.value });
    if (event.target.name === "newSummary") this.setState({ newSummary: event.target.value });
    if (event.target.name === "newSourceCode") this.setState({ newSourceCode: event.target.value });
    if (event.target.name === "newSupply") this.setState({ newSupply: event.target.value });
    if (event.target.name === "newLaunchDate") this.setState({ newLaunchDate: event.target.value });
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

    // let coinData = { newCoinName, newTicker, newCirculation, newAmountRaised, newMinable, newActiveInvestors, newBlockExplorer, newBlog };
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
    console.log('newCoin: ',newCoin);
    allCoins.push(newCoin);
    console.log('allCoins: ', allCoins);
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

  async requestData(pageSize, page, sorted, filtered) {
    return new Promise((resolve, reject) => {
      let filteredData = this.state.allCoins;
      // console.log('filteredData: ', filteredData);

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

  renderEditable = cellInfo => {
    try {
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
    }
    catch(err) {
      console.log('renderEditable err: ', err);
      return null;
    };

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
              Cell: this.renderEditable
            },
            {
              Header: 'Supply',
              accessor: 'supply',
              Cell: this.renderEditable
            },
            {
              Header: 'Amount Raised',
              accessor: 'amount_raised',
              filterable: false,
              width: 120,
              Cell: this.renderEditable
            },
            {
              Header: 'Minable',
              accessor: 'minable',
              width: 60,
              Cell: this.renderEditable
            },
            {
              Header: 'Active Investors',
              accessor: 'active_investors',
              Cell: this.renderEditable
            },
            {
              Header: 'Block Explorer',
              accessor: 'block_explorer',
              Cell: (e => {
                if (e.value === 'N/A') return e.value;
                else return <a href={e.value} target='_blank'> {e.value} </a>;
              })
            },
            {
              Header: 'Blog',
              accessor: 'blog',
              sortable: false,
              Cell: (e => {
                if (e.value === 'N/A') return e.value;
                else return <a href={e.value} target='_blank'> {e.value} </a>;
              })
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
