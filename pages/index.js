import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/cssReset";
import Menu from "../src/Menu";
import  { StyledTimeline } from "../src/Timeline"

function Home() {
    
    return (
        <>
            <CSSReset />
        <div style={{
            display: "flex",
            flexDirection: "column",
            flex:1        
        }}>
            <Menu />
            <Header />
            <Timeline playlists={config.playlists} />
        </div>
        </>
    );
}
export default Home;

const StyledHeader = styled.div`
    img {
        
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

function Header() {
    return (
        <StyledHeader>
            <section className="user-info">
                <img src={`https://github.com/${config.github}`} alt="User profile" />
                <div>
                    <h2>{config.nome}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline(prop) {
    const playNames = Object.keys(prop.playlists);
    return (
        <StyledTimeline>
            {playNames.map((playName) => {
                const videos = prop.playlists[playName];
                return (
                    <section>
                        <h2>{playName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a  href={video.url}>
                                        <img src={video.thumb}/> <br></br>
                                        <span>{video.tittle}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    );
}
