import React from 'react';
// import '../static/css/addcoin.css';

export default class AddCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  addCoinHandler = () => {
    // create a newCoin obj with all the appropiate inputs states
    let newCoin = {
      active_investors: this.state.newActiveInvestors,
      block_explorer: this.state.newBlockExplorer,
      blog: this.state.newBlog,
      circulation: this.state.newCirculation,
      coin_name: this.state.newCoinName,
      id: 1000, // would use a founction to get new unique id
      launch_date: this.state.newLaunchDate,
      minable: this.state.newMinable,
      reddit: this.state.newReddit,
      source_code: this.state.newSourceCode,
      summary: this.state.newSummary,
      supply: this.state.newSupply,
      tag: this.state.newTag,
      telegram: this.state.newTelegram,
      twitter: this.state.newTwitter,
      ticker: this.state.newTicker,
      website: this.state.newWebsite,
      white_paper: this.state.newWhitePaper,
    };

    // call the parent method (handleAddCoin) which stores the new coin in allCoins state
    // if we used Redux, this code / stratedgy wouldnt be needed
    // I am still learning different ways to store state with and without redux
    this.props.handleAddCoin(newCoin);

    // after adding the coin, reset all field to empy strings
    this.setState({
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
    });
  };

  handleEditChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const newCoinFields = [
      { key: 'newCoinName', placeholderText: 'Coin Name...' },
      { key: 'newTicker', placeholderText: 'Ticker...' },
      { key: 'newCirculation', placeholderText: 'Circulation Amount...' },
      { key: 'newSupply', placeholderText: 'Supply Amount...' },
      { key: 'newAmountRaised', placeholderText: 'Amount Raised...' },
      { key: 'newMinable', placeholderText: 'Minable Type...' },
      { key: 'newActiveInvestors', placeholderText: 'Active Investors...' },
      { key: 'newBlockExplorer', placeholderText: 'Block Explorer URL...' },
      { key: 'newBlog', placeholderText: 'Blog URL...' },
      { key: 'newWebsite', placeholderText: 'Website URL...' },
      { key: 'newWhitePaper', placeholderText: 'White Paper URL...' },
      { key: 'newTwitter', placeholderText: 'Twitter URL...' },
      { key: 'newReddit', placeholderText: 'Reddit URL...' },
      { key: 'newSummary', placeholderText: 'Summary URL...' },
      { key: 'newSourceCode', placeholderText: 'Source Code URL...' },
      { key: 'newTag', placeholderText: 'Tags...' },
      { key: 'newLaunchDate', placeholderText: 'Launch Date...' }
    ];
    return <div className="App">
        <p className="App-intro">
          <h3>Add new Coin</h3>
          {newCoinFields.map(field => {
            return <input type="text" name={field.key} placeholder={field.placeholderText} value={this.state[field.key]} onChange={this.handleEditChange} />;
          })}

          {/*
            dont know which way is cleaner to render all the new coin fields
            by the previous way of iterating
            or by hard coding (code below)
            my preference is iterating
            thoughts?
          */}
          {/* <input type="text" name="newCoinName" placeholder="Coin Name..." value={this.state.newCoinName} onChange={this.handleEditChange} />
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
          <input type="text" name="newLaunchDate" placeholder="Launch Date..." value={this.state.newLaunchDate} onChange={this.handleEditChange} /> */}

          <button onClick={this.addCoinHandler}>Add</button>
        </p>
      </div>;
  };
};