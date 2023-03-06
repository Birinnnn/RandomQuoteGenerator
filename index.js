function App(){

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState([]);
    const [col, setRandomColor] = React.useState(["#111"]);

    React.useEffect(() => {
        async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json();

            setQuotes(data);
            let randomIndex = Math.floor(Math.random()* data.length);
            setRandomQuote(data[randomIndex]);
        } 
        fetchData();
    }, [])

    const changeQuote = () => {
        const colors = [
            "#DFFF00",
            "#40E0D0",
            "#9FE2BF",
            "#CCCCFF",
            "#DE3163",
            "#FFBF00",
            "#FF7F50",
            "#6495ED"
        ]

        let randomCol = Math.floor (Math.random()* colors.length);
        setRandomColor(colors[randomCol]);
        let randomIndex = Math.floor(Math.random() * quotes.length)
        setRandomQuote(quotes[randomIndex]);   
    }

    return(
        <div style= {{backgroundColor: col, minHeight : "100vh"}}>
            <div className="container pt-5">
                <div className="jumbotron">
                    <wrapper id="quote-box" className="card">
                        <div className="card-header text-primary text-center"> Random Quote Generator 
                            <div className="card-body">
                            {randomQuote ? (
                                <>
                                <h4 className="card-text" id="text" style={{color:"#111"}}>&quot;{randomQuote.text}&quot;</h4>
                                <h6 className="card-title" id="author" style={{color:"red"}}>-{randomQuote.author || "Anonymous"}</h6>
                                </>
                            ): (<h2>Loading</h2>)}
                            </div>
                            <div class="row">
                                <div class ="col-xs-8">
                                    <button onClick={changeQuote} id="new-quote" className="btn btn-primary">Change Quote</button>
                                <div class="col-xs-4">
                                <a href={
                                        "https://twitter.com/intent/tweet?text="  +
                                        encodeURIComponent(
                                            '"' + randomQuote.text + '" ' + randomQuote.author
                                        )
                                    } target ="_blank" className="btn btn-info" id="tweet-quote">
                                        <i className="fab fa-twitter"></i>
                                    </a>

                                    <a href={
                                        "https://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,anililaga&caption=" + 
                                        encodeURIComponent(randomQuote.author) + "&content=" + encodeURIComponent(randomQuote.text) + 
                                        "&cannonicalURL=https%3A%2Fwww.tumblr.com%2Fbutton&shareSource=tumblr_share_button"
                                    }
                                    target = "_blank" className="btn btn-danger">
                                        <i class="fa-brands fa-tumblr"></i>
                                    </a>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </wrapper>
                    <div>
                        <a href="https://www.linkedin.com/in/anil-ilaga/" className="btn" style={{backgroundColor:"#2B65EC"}}> by Anıl</a>
                    </div>    
                </div> 
            </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'))