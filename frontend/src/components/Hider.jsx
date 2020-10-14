import styled from "styled-components";

const Hider = styled.div`
    display: ${props=>props.hidden ? "none" : "default"};
`

export default Hider;