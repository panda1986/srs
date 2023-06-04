import { Container, Accordion } from "react-bootstrap";

export function Clients() {
    return (
        <>
            <Container>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>客户端(Clients)列表</Accordion.Header>
                        <Accordion.Body></Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    )
}