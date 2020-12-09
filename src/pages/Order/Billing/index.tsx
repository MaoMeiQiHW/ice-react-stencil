import React,{Component} from 'react';
import { Table, Pagination } from '@alifd/next';

class FusionActionTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading : false,
    };
  }

  dataSource = (j) => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push({
        title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
        id: 100306660940 + i + j,
        time: 2000 + j
      });
    }
    return result;
  }

  onChange = (currentPage) => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        dataSource: this.dataSource(currentPage * 5),
        loading: false
      });
    }, 200);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.dataSource(5),
    });
  }


  render() {
    return (
      <div>
        <Table dataSource={this.state.dataSource} loading={this.state.loading}>
          <Table.Column title="Id1" dataIndex="id" width={140} />
          <Table.Column title="Time" dataIndex="time" width={500} />
        </Table>
        <Pagination current={1} pageSize={5} total={10} onChange={this.onChange} className="page-demo" />
      </div>
    );
  }
};

export default FusionActionTable;
