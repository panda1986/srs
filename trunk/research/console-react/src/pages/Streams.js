import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import {Accordion, Button, Container, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { console_filter_audio, console_filter_bitrate_k, console_filter_has_stream, console_filter_less, console_filter_video, system_array_get } from '../utils';

export function Streams() {
    const streamsInterval = useRef(null);
    const [streams, setStreams] = useState();
    const navigate = useNavigate();

    const fetchUpdateStreams = useCallback(() => {
        axios.get('api/v1/vhosts', {baseURL: "http://localhost:1985"}).then((res) => {
            let vhosts = res.data.vhosts;
            const fetchStreams = function() {
                axios.get('/api/v1/streams', {baseURL: "http://localhost:1985"}).then((res) => {
                    for (var k in res.data.streams) {
                        var stream = res.data.streams[k];
                        stream.owner = system_array_get(vhosts, function(vhost) {
                            return vhost.id === stream.vhost;
                        });
                    }
                    setStreams(res.data.streams);
                }).catch();
            };
            streamsInterval.current = setInterval(() => {
                fetchStreams();
            }, 3000);
            fetchStreams();
        }).catch();
    }, []);

    React.useEffect(() => {
        fetchUpdateStreams();
        return () => {
            clearInterval(streamsInterval.current);
        }
    }, [fetchUpdateStreams]);

    const handleStreamNavigator = function(stream) {
        let nextUrl = `/zh/streams/${stream}`
        console.log('vhosts navigate to:', nextUrl);
        navigate(nextUrl);
    };

    return (
        <>
            <Container>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>视频流(Streams)列表</Accordion.Header>
                        <Accordion.Body> 
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>流名称</th>
                                        <th>Vhost</th>
                                        <th>状态</th>
                                        <th>在线人数</th>
                                        <th>入口带宽</th>
                                        <th>出口带宽</th>
                                        <th>视频信息</th>
                                        <th>音频信息</th>
                                        <th>管理</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {streams && streams.map((stream, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Button variant='link' onClick={e => handleStreamNavigator(stream.id)}>{stream.id}</Button>
                                                </td>
                                                <td>{console_filter_less(stream.name)}</td>
                                                <td>
                                                    <Button variant='link' onClick={e => {navigate(`/zh/vhosts/${stream.vhost}`)}}>{stream.owner.name}</Button>
                                                </td>
                                                <td>{console_filter_has_stream(stream.publish.active)}</td>
                                                <td>{stream.clients}人</td>
                                                <td>{console_filter_bitrate_k(stream.kbps.recv_30s)}</td>
                                                <td>{console_filter_bitrate_k(stream.kbps.send_30s)}</td>
                                                <td>{console_filter_video(stream.video)}</td>
                                                <td>{console_filter_audio(stream.audio)}</td>
                                                <td>
                                                    <Button variant='link'>预览</Button>
                                                    <Button variant='link'>踢流</Button>
                                                    <Button variant='link'>录制</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    )
}