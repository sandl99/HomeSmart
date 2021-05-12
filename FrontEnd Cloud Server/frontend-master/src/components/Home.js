import "../css/Home.css"

const Home = () => {
    return (
        <>
            <div id="welcome">
                <span style={{color: 'white',
                fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                fontSize: '24px',
                fontWeight: 'bold'
            }}>Welcome to smart home management system !</span>
            </div>
            <div className="home">
                <img style={{margin: 'auto'}} src="/images/smarthome.jpg" alt="Smart home system"/>
            </div>
        </>
    )
}

export default Home