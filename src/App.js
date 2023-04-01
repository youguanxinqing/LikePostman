import Request from './apps/request/Request';
import Menu from './apps/menu/Menu';
import {Row, Col} from 'antd';


function App() {
  return (
    <div className="App">
      <Row>
        <Col span={6}>
          <Menu></Menu>
        </Col>
        <Col span={18}>
          <Request></Request>
        </Col>
      </Row>
    </div>
  );
}

export default App;
