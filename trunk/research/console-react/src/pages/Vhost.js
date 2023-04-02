import axios from "axios";
import React, { useState, useCallback } from "react";
import { Accordion, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { console_filter_bitrate_k, console_filter_enabled } from "../utils";


export function Vhost() {
    let params = useParams();
    const [vhost, setVhost] = useState();

    const fetchVhost = useCallback(() => {
        axios.get(`api/v1/vhosts/${params.vhostId}`, {baseURL: "http://localhost:1985"}).then((res) => {
            setVhost(res.data.vhost);
        }).catch();
    }, []);

    React.useEffect(() => {
        fetchVhost();
    }, []);
    return (
        <Container>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>虚拟主机{params.vhostId}</Accordion.Header>
                    <Accordion.Body>
                        {vhost && (
                            <div>
                                <p>ID: {vhost.id}</p>
                                <p>Name: {vhost.name}</p>
                                <p>Enabled: {console_filter_enabled(vhost.enabled)}</p>
                                <p>Streams: {vhost.streams}人</p>
                                <p>Clients: {vhost.clients}人</p>
                                <p>Recv: {console_filter_bitrate_k(vhost.kbps.recv_30s)}</p>
                                <p>Send: {console_filter_bitrate_k(vhost.kbps.send_30s)}</p>
                                <p>HLS: {console_filter_enabled(vhost.hls.enabled)}</p>
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </Container>
    )
}