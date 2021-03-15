import React from 'react';
import { withRouter } from "react-router";
import { Input, AutoComplete } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { Space, Row, Col, Button } from 'antd';
import PaymentField from './paymentField';


class UserPasses extends React.Component{
    
    handleBuy = e => {
        const data = {
           
        }
       
        
    };

    render(){    
        const renderTitle = (title) => (
            <span>
                {title}
                <a
                    style={{ float: 'right' }}
                    href="https://www.google.com/search?q=antd"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    more
                </a>
            </span>
        );
            
        const renderItem = (title, count) => ({
            value: title,
            label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >  
                {title}
                <span>
                    <DollarCircleOutlined /> {count}
                </span>
            </div>
            ),
        });
            
        const options = [
            {
            label: renderTitle('Univeristy of Guelph'),
            options: [renderItem('Semesterly Student Pass', '$200'), renderItem('Yearly Staff Pass', '$300')],
            },
            {
            label: renderTitle('Guelph General Hospital'),
            options: [renderItem('1 Month Pass', '$180'), renderItem('3 Month Pass', '$350')],
            },
            {
            label: renderTitle('Pearson Internation Airport'),
            options: [renderItem('Park and Fly 1 Week', '$100'), renderItem('Park and Fly 4 Week', '$350')],
            },
        ];
            
        const Complete = () => (
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{ width: 250 }}
                options={options}
            >
                <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
        );
            
        return(
            <>
            <Space direction="vertical">
                <Row>
                    <Col span={6}/>
                    <Col span={16}>
                        <h2>
                            Search for the Pass you would like to purchase    
                        </h2>
                    </Col>
                    <Col span={4}/>
                </Row>   
                <Row>
                    <Col span={8} />
                    <Col span={8}>
                        <Complete />
                    </Col>
                    <Col span={8} />
                </Row>
                <PaymentField />
                <Row>
                    <Col span={10} />
                    <Col span={8}>
                        <Button type="primary"  size="large"  shape="round" onClick={this.handleBuy}>
                            Buy
                        </Button>   
                    </Col>
                    <Col span={8} />
                </Row>
            </Space>
            </>
        );
    }
}


export default withRouter(UserPasses); 
