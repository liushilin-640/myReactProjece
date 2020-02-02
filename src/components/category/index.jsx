import React from 'react';
import { Card ,Button,Icon,Table} from 'antd';
import {connect} from 'react-redux'
import {categoryList} from '../../redux/actions';
@connect((state)=>({category:state.category}),{
  categoryList
})
class Category extends React.Component{
  componentDidMount(){
    this.props.categoryList()
  }
  render(){
    const columns=[
      {
        title: '品类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render() {
          return (
            <div>
              <Button type='link'>修改分类</Button>
              <Button type='link'>删除分类</Button>
            </div>
          );
        }
      }
    ]
    const data=this.props.category
    return (
      <Card  title="分类列表" extra={<Button type="primary"><Icon type="plus" />分类列表</Button>}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            defaultPageSize: 3,
            pageSizeOptions: ['3', '6', '9', '12'],
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否显示快速跳转
          }}
        />
      </Card>
    )
  }
}
export default Category;