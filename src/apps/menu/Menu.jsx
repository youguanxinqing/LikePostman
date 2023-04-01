import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { Menu, Button } from 'antd';
import {useState} from 'react'


function getItem({label, key, icon, children, type}) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const makeItem = (text) => {
  return (
    <span
      style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}
    ><div>{text}</div><MoreOutlined style={{}} /></span>
  )
};

const makeItems = () => {
  const config = [{
    label: "Navigation Two",
    children: [
      {
        label: "Option 5",
      },
      {
        label: "Option 6",
      },
      {
        label: "Submenu",
        children: [
          {
            label: "Option 7",
          },
          {
            label: "Option 8",
          }
        ]
      }
    ]
  }]


  const items = [];
  _makeItems(config, items, 0);
  console.log(items);
  return items;
};

function _makeItems(nodes, result, counter) {
  let i = 1;
  for (const node of nodes) {
    const newItem = {
      key: counter + i,
      label: makeItem(node.label),
      icon: node.icon,
    }

    if (node.children && node.children.length > 0) {
      newItem.children = [];
      _makeItems(node.children, newItem.children, counter + i);
      i += node.children.length;
    } else {
      i += 1;
    }
    result.push(getItem({...newItem}));
  }
};

const items = makeItems();

export default function() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        items={items}
        inlineCollapsed={collapsed}
      ></Menu> 
    </>
  )
}