import React from 'react';
import moment from 'moment';

export default class RssListElement extends React.Component {

    constructor(props) {
        super(props);
        this.elementClick = this.elementClick.bind(this);
        this.state = {
            title: props.title,
            desc: props.desc,
            uid: props.uid,
            pubDate: moment(props.pubDate).format('Do MMM YYYY - hh:mm a')
        };
    }

    elementClick() {
        window.open(this.state.uid);
    }

    render() {
        return (
            <div onClick={this.elementClick} className="rss-list-element-container">
                <p className="rss-list-element-title">{this.state.title}</p>
                <p className="rss-list-element-pubDate">{this.state.pubDate}</p>
                <p className="rss-list-element-desc">{this.state.desc}</p>
            </div>
        )
    }

}