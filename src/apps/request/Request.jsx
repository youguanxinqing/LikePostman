import axios from 'axios';
import {useCallback, useState } from 'react';
import {Grid, Layout, Select, Button, Input, Space, Row, Col, notification} from "antd";
import {
  PlusCircleOutlined
} from '@ant-design/icons';

const {Header, Sider, Content} = Layout;
const {Option} = Select;
const {Search, TextArea} = Input;


export default function Request() {


  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({type, title, msg, duration}) => {
    api[type]({
      message: title,
      description: msg,
      placement: "top",
      duration,
    });
  };

  const [name, setName] = useState("");
  const [method, setMethod] = useState("GET");
  const [protocol, setProtocol] = useState("http://")
  const [url, setUrl] = useState("");
  const [resp, setResp] = useState("");
  const [req, setReq] = useState("");
  const [headers, setHeaders] = useState(() => { return [{key: "content", val: "application/json"}]});

  const sendRequest = (url) => {
    console.log(url)
    axios.request({
      method: method,
      url: `${protocol}${url}`,
      data: req,
    }).then((data) => {
      openNotification({
        type: "success",
        title: "请求成功",
        msg: data.code,
        duration: 1
      });
      setResp(data.data);
    }).catch((error) => {
      openNotification({
        type: "error",
        title: "请求失败",
        msg: error.message,
        duration: 2.5,
      });
      setResp(error.stack);
      console.log(error);
    });
  };

  const saveConfig = () => {
    console.log({
      name: name,
      protocol: protocol,
      method: method,
      url: url,
    });
  };

  const protocolSelectBefore = (
    <Select defaultValue="http://" onChange={(val) => setProtocol(val)}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <>
      {contextHolder}
      <Layout>
        <Content style={{backgroundColor: "#fff"}}>
          <Input onChange={(e) => setName(e.target.value)} />
        </Content>
        <Sider style={{backgroundColor: "#fff"}}>
          <Button onClick={saveConfig}>Save</Button>
        </Sider>
      </Layout>
      <Layout>
        <Sider style={{backgroundColor: "#fff"}}>
          <Select
            defaultValue="GET" 
            style={{width: 120}}
            onChange={(val) => setMethod(val)}
            options={[
              {value: "GET", label: "GET"},
              {value: "POST", label: "POST"},
              {value: "HEAD", label: "HEAD"},
              {value: "PUT", label: "PUT"},
              {value: "DELETE", label: "DELETE"},
              {value: "OPTION", label: "OPTION"},
            ]}
          />
        </Sider>
        <Content>
          <Search
            addonBefore={protocolSelectBefore}
            enterButton="发送"
            defaultValue={url}
            onChange={(e) => setUrl(e.target.value)}
            onSearch={sendRequest}
          />
        </Content>
      </Layout>
      <br></br>
      <Row>
        <Col span={7}>
          {
            headers.map((h, idx) => {
              return (
                <Row key={idx}>
                  <Col span={11}><Input value={h.key} /></Col>
                  <Col span={1} style={{margin: 'auto'}}>:</Col>
                  <Col span={12}><Input value={h.val} /></Col>
                </Row>
              )
            })
          }
        </Col>
        <Col span={1}><PlusCircleOutlined /></Col>
        <Col span={16}>
          <TextArea style={{minHeight: 400}}></TextArea>
        </Col>
      </Row>
      <Row>
        <TextArea style={{minHeight: 400}} value={resp}></TextArea>
      </Row>
    </>
  );
}
