import axios from "axios";
import React, { useRef, useState, useCallback } from "react";
import { Container, Accordion, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { console_filter_audio, console_filter_bitrate_k, console_filter_has_stream, console_filter_video, console_filter_preview_url } from "../utils";

export function Stream() {
    let params = useParams();
    const [stream, setStream] = useState();
    const owner = useRef();

    const fetchStream = useCallback(() => {
        axios.get(`api/v1/streams/${params.streamId}`, {baseURL: "http://localhost:1985"}).then((res) => {
            let stream = res.data.stream;
            if (!owner.current) {
                axios.get(`api/v1/vhosts/${stream.vhost}`, {baseURL: "http://localhost:1985"}).then((res) => {
                    let vhost = res.data.vhost;
                    stream.owner = owner.current = vhost;
                    setStream(stream);
                }).catch();
            } else {
                stream.owner = owner.current;
                setStream(stream);
            }
        }).catch();
    }, [params.streamId]);

    React.useEffect(() => {
        fetchStream();
    }, [fetchStream]);

    // kickoff client, ref: https://ossrs.io/lts/zh-cn/docs/v5/doc/http-api#kickoff-client
    const kickoffStream = function(cid) {
        console.log('kickoff stream:', cid);
        // axios.delete(`api/v1/clients/${cid}`, {baseURL: "http://localhost:1985"}).then((res) => {
        //     console.log('kickoff stream:', cid, res);
        // }).catch();
    };

    return (
        <Container>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>视频流-{params.streamId}</Accordion.Header>
                    <Accordion.Body> 
                        {stream && (
                            <div>
                                <p>ID: {stream.id}</p>
                                <p>Name: {stream.name}</p>
                                <p><a>{owner.name}???</a></p>
                                <p>Publishing: {console_filter_has_stream(stream.publish.active)}</p>
                                <p>Clients: {stream.clients}人</p>
                                <p>Recv: {console_filter_bitrate_k(stream.kbps.recv_30s)}</p>
                                <p>Send: {console_filter_bitrate_k(stream.kbps.send_30s)}</p>
                                <p>Video: <span>{console_filter_video(stream.video)}</span></p>
                                <p>Audio: <span>{console_filter_audio(stream.audio)}</span></p>
                                <p>管理: <Button variant='link' href={console_filter_preview_url(stream)} target='_blank'>预览</Button></p>
                                <p>管理: <Button onClick={kickoffStream(stream.publish.cid)}>踢流</Button></p>
                                <p>管理: <Button variant='link'>录制</Button></p>

                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

