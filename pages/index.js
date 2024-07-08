import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/cssReset";
import Menu from "../src/menu/Menu";
import  { StyledTimeline } from "../src/Timeline"

function Home() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("")
    return (
        <>
            <CSSReset />
        <div style={{
            display: "flex",
            flexDirection: "column",
            flex:1       
        }}>
            
            <Header />
            <Menu valorDoFiltro = {valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
            <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
            <Channel channels = {config.channels}/>
        </div>
        </>
    );
}
export default Home;

const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1};
    img {
        
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background: url(${config.bg});
    height: 230px;
   
`

function Header() {
    return (
        <StyledHeader>
            <StyledBanner/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}`}/>
                <div>
                    <h2>{config.nome}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({searchValue, ...prop}) {
    const playNames = Object.keys(prop.playlists);
    return (
        <StyledTimeline>
            {playNames.map((playName) => {
                const videos = prop.playlists[playName];
                return (
                    <section>
                        <h2>{playName}</h2>
                        <div>
                            {videos.filter((video) =>{
                                const tittleNormalized = video.tittle.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return tittleNormalized.includes(searchValueNormalized)
                                
                            }).map((video) => {
                                return (
                                    <a  href={video.url} target="_blank">
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

const StyledChannel = styled.div`
    section {
        padding: 16px;
    }
    h2 {
        margin-bottom: 16px;
    }
    div {
        display: flex;
        gap: 19px;
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
`;

function Channel(props) {
    return (
        <StyledChannel>
            <section>
                <h2>Canais</h2>
                <div>
                    {props.channels.map((channel) => (
                        <a href={channel.url} target="_blank">
                            <img src={channel.img} />
                        </a>
                    ))}
                </div>
            </section>
        </StyledChannel>
    );
}