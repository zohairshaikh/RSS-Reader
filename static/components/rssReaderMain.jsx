import React from 'react';
import {render} from 'react-dom';
import RssListElement from './RssListElement.jsx'

class RssReader extends React.Component {

    constructor(props) {
        super(props);
        this.onURLChange = this.onURLChange.bind(this);
        this.onReadClick = this.onReadClick.bind(this);
        this.renderList = this.renderList.bind(this);

        this.state = {
            url: '',
            isLoading: false,
            listRenderData: [],
            stateRepMessage: 'Please provide an RSS source'
        };
    }

    onURLChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    onReadClick() {
        this.setState({
            isLoading: true
        });

        let url = this.state.url;
        $.ajax({
            url: '/renderframe/?url=' + url,
            success: function (resp) {
                this.setState({
                    isLoading: false,
                    listRenderData: resp,
                    stateRepMessage: 'Please provide an RSS source'
                });

            }.bind(this),
            error: function (e, txt, status) {
                this.setState({
                    isLoading: false,
                    listRenderData: [],
                    stateRepMessage: 'URL provided is an invalid RSS source.'
                });
            }.bind(this)
        })

    }

    renderList() {
        let listRenderData = this.state.listRenderData;
        if (listRenderData.length === 0) {
            return (<div>{this.state.stateRepMessage}</div>)
        }
        let list = listRenderData.map((data, i) => {
            return (
                <RssListElement title={data.title} desc={data.description} uid={data.guid}
                                pubDate={data.pubDate}
                />
            )
        });

        return list;

    }

    render() {
        return (
            <div className="main-container">
                <div className="box-container">
                    <div className="btn-input-container">
                        <div className="input-group">
                            <input className="form-control" onChange={this.onURLChange} value={this.state.url}
                                   placeholder="Enter URL here"/>
                        </div>

                        <button onClick={this.onReadClick} className="btn btn-primary btn-custom-style">Read</button>
                    </div>
                </div>

                <div className="frame-container">
                    {
                        this.state.isLoading ? <div className='loader-container'>
                                <p>Loading..</p>
                                <div className="loader"></div>
                            </div> :
                            this.renderList()
                    }


                </div>


            </div>
        )
    }

}


render(
    <RssReader/>, document.getElementById('app')
)