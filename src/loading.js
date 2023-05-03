import './App.css';

const Load = () => {
    return (
        <div className="container">
            <div className="loading-text">
                <h1>Karlo and Gogh are Drawing...</h1>
            </div>
            <div className="loading">
                <div className="line-box">
                    <div className="line"></div>
                </div>
            </div>
        </div>
    );
}

export default Load;