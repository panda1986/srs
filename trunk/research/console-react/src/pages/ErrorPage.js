import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export function ErrorPage() {
    return (
        <>
            <Container>
                <div id="error-page">
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <Link to="/">back home</Link>
                    </p>
                </div>
            </Container>
        </>
    )
}