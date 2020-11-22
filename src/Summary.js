import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

    }

    renderSummary(data) {
        const render = Object.keys(data).map((elem, index) => {
            return <p key={index}>{elem}:{data[elem].length}</p>
        })
        return render;
    }


    render() {
        const data = this.props.data;
        const render = this.renderSummary(data);
        return (
            <div>
                {render}
            </div>
        );
    }
}

export default Summary;
