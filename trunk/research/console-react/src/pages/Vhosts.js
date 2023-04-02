import axios from 'axios';
import React, { useCallback, useState } from 'react';
import {Container, Table, Card, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { console_filter_bitrate_k, console_filter_enabled } from '../utils';
export function Vhosts() {
    const [vhosts, setVhosts] = useState();
    const navigate = useNavigate();
    const fetchVhosts = useCallback(() => {
        axios.get('api/v1/vhosts', {baseURL: "http://localhost:1985"}).then((res) => {
            setVhosts(res.data.vhosts);
        }).catch();
    }, []);
    React.useEffect(() => {
        fetchVhosts();
    }, []);

    const handleVhostNavigator = function(vhost) {
        let nextUrl = `/zh/vhosts/${vhost}`
        console.log('vhosts navigate to:', nextUrl);
        navigate(nextUrl);
    };

    return (
        <>
            <Container>
            <Card border='primary'>
                <Card.Body>
                    <Card.Title>
                        <small>虚拟主机列表</small>
                    </Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>主机名称</th>
                                <th>状态</th>
                                <th>在线流</th>
                                <th>在线人数</th>
                                <th>入口带宽</th>
                                <th>出口带宽</th>
                                <th>HLS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vhosts && vhosts.map((vhost, index) => {
                                return (<tr key={index}>
                                    <td>
                                        <Button variant='link' onClick={ e => handleVhostNavigator(vhost.id)}>{vhost.id}</Button>
                                    </td>
                                    <td>{vhost.name}</td>
                                    <td>{console_filter_enabled(vhost.enabled)}</td>
                                    <td>{vhost.streams}个</td>
                                    <td>{vhost.clients}人</td>
                                    <td>{console_filter_bitrate_k(vhost.kbps.recv_30s)}</td>
                                    <td>{console_filter_bitrate_k(vhost.kbps.send_30s)}</td>
                                    <td>{console_filter_enabled(vhost.hls.enabled)}</td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Container>
        </>
    )
}