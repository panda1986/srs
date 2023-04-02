import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import {Card, CardGroup, Container, Table} from 'react-bootstrap';
import { console_filter_bitrate_k2, console_filter_filerate_k2, console_filter_filesize_k2, console_filter_number, console_filter_percentf, console_filter_percentf2, console_filter_time, console_filter_yesno } from '../utils';

/*refresh summaries every 3000 ms*/
export function Overview() {
    const [summary, setSummary] = useState();
    const [server, setServer] = useState();
    const [system, setSystem] = useState();
    const [kbps, setKbps] = useState();
    //let preKbps = null;
    const preKbps = useRef(null);

    const fetchSummaries = useCallback(async () => {
        axios.get('api/v1/summaries', {baseURL: "http://localhost:1985"}).then((res) => {
            const data = res.data;
            const kbps = {
                initialized: false,
                in: { srs: 0, sys: 0, inner: 0 },
                out: { srs: 0, sys: 0, inner: 0 }
            };
            const pc = preKbps.current;
            if (pc) {
                kbps.initialized = true;

                var diff = data.data.system.net_sample_time - pc.system.net_sample_time;
                if (diff > 0) {
                    kbps.in.sys = (data.data.system.net_recv_bytes - pc.system.net_recv_bytes) * 8 / diff;
                    kbps.in.inner = (data.data.system.net_recvi_bytes - pc.system.net_recvi_bytes) * 8 / diff;

                    kbps.out.sys = (data.data.system.net_send_bytes - pc.system.net_send_bytes) * 8 / diff;
                    kbps.out.inner = (data.data.system.net_sendi_bytes - pc.system.net_sendi_bytes) * 8 / diff;
                }

                diff = data.data.system.srs_sample_time - pc.system.srs_sample_time;
                if (diff > 0) {
                    kbps.in.srs = (data.data.system.srs_recv_bytes - pc.system.srs_recv_bytes) * 8 / diff;
                    kbps.out.srs = (data.data.system.srs_send_bytes - pc.system.srs_send_bytes) * 8 / diff;
                }

                diff = data.data.now_ms - pc.now_ms;
                if (kbps.initialized || diff >= 20 * 1000) {
                    preKbps.current = data.data;
                    setKbps(kbps);
                }
            }
            if (!pc) {
                preKbps.current = data.data;
                setKbps(kbps);
            }
            setSummary(data.data);
            setServer(data.data.self);
            setSystem(data.data.system);
        }).catch();
    }, []);

    React.useEffect(() => {
        // this part is run when component is mounted
        fetchSummaries();
        let interval = setInterval(() => {
            fetchSummaries();
        }, 3000);
        return () => {
            // (optional)this part is run when component is unmounted
            clearInterval(interval);
        };
    }, [fetchSummaries]); // Dependency Array (Optional): Any variable/component specified in the array is monitored, and the useEffect is triggered whenever it changes.
    return (
        <>
            <Container>
                {summary &&
                <CardGroup>
                    <Card border='primary'>
                        <Card.Body>
                            <Card.Title>
                                <small>{`SRS/${server.version}`}</small>
                            </Card.Title>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>运行</td>
                                        <td>{console_filter_time(server.srs_uptime)}</td>
                                    </tr>
                                    <tr>
                                        <td>CPU</td>
                                        <td>{console_filter_percentf(server.cpu_percent)} / {console_filter_percentf(system.cpus_online)}</td>
                                    </tr>
                                    <tr>
                                        <td>内存</td>
                                        <td>
                                            {console_filter_percentf2(server.mem_percent)}{" "}
                                            {console_filter_filesize_k2(server.mem_kbyte)} / {console_filter_filesize_k2(system.mem_ram_kbyte)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>网络</td>
                                        <td>
                                        <span title="SRS的连接数">{system.conn_srs}</span> / {" "}
                                        <span title="SRS的入网带宽，即客户端上传带宽">{console_filter_bitrate_k2(kbps.in.srs)}</span> /{" "}
                                        <span title="SRS的出网带宽，即客户端下载带宽">{console_filter_bitrate_k2(kbps.out.srs)}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card border='secondary'>
                        <Card.Body>
                            <Card.Title>
                                <small>OS信息</small>
                            </Card.Title>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>运行</td>
                                        <td>{console_filter_time(system.uptime)}</td>
                                    </tr>
                                    <tr>
                                        <td>CPU</td>
                                        <td>{console_filter_percentf(system.cpu_percent * system.cpus_online)} / {console_filter_percentf(system.cpus_online)}</td>
                                    </tr>
                                    <tr>
                                        <td>内存</td>
                                        <td>
                                            {console_filter_percentf2(system.mem_ram_percent)}
                                            {console_filter_filesize_k2(system.mem_ram_kbyte * system.mem_ram_percent)} / {console_filter_filesize_k2(system.mem_ram_kbyte)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>负载</td>
                                        <td>{console_filter_number(system.load_1m)} / {console_filter_number(system.load_5m)} / {console_filter_number(system.load_15m)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card border='success'>
                        <Card.Body>
                            <Card.Title>
                                <small>负载信息</small>
                            </Card.Title>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td>外网</td>
                                        <td>
                                            <span title="系统外网的入网带宽，即客户端上传带宽">{console_filter_bitrate_k2(kbps.in.sys)}</span> /
                                            <span title="系统外网的出网带宽，即客户端下载带宽">{console_filter_bitrate_k2(kbps.out.sys)}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>内网</td>
                                        <td>
                                            <span title="系统内网的入网带宽，即客户端上传带宽">{console_filter_bitrate_k2(kbps.in.inner)}</span> /
                                            <span title="系统内网的出网带宽，即客户端下载带宽">{console_filter_bitrate_k2(kbps.out.inner)}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>连接</td>
                                        <td>
                                            <span title="系统总连接数">{system.conn_sys}</span> {" "}
                                            <span title="系统ESTABLISHED状态的连接数">{system.conn_sys_et}</span> {" "}
                                            <span title="系统TIME_WAIT状态的连接数">{system.conn_sys_tw}</span> {" "}
                                            <span title="系统UDP绑定端口">{system.conn_sys_udp}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>磁盘</td>
                                        <td>
                                            <span title="IO繁忙度">{console_filter_percentf2(system.disk_busy_percent)}</span>
                                            <span title="磁盘读取速度Bps">{console_filter_filerate_k2(system.disk_read_KBps)}</span>
                                            <span title="磁盘写入速度Bps">{console_filter_filerate_k2(system.disk_write_KBps)}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card border='danger'>
                        <Card.Body>
                            <Card.Title>
                                <small>其他信息</small>
                            </Card.Title>
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td title="系统CPU信息">CPU</td>
                                        <td>
                                            <span title="CPU核心数">{system.cpus}</span> /
                                            <span title="在线CPU核心数">{system.cpus_online}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td title="SRS的PID">PID</td>
                                        <td>{server.pid}</td>
                                    </tr>
                                    <tr>
                                        <td title="SRS的父PID">PPID</td>
                                        <td>{server.ppid}</td>
                                    </tr>
                                    <tr>
                                        <td title="SRS API是否有效">Ready</td>
                                        <td>{console_filter_yesno(summary.ok)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </CardGroup>
            }
            </Container>
        </>
    )
}